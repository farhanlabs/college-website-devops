import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { addItem, updateItem, deleteItem, subscribeToData, setValue, subscribeToValue } from '@/lib/firebase';
import { toast } from 'sonner';
import { LogOut, Plus, Pencil, Trash2, Eye } from 'lucide-react';

interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'url' | 'password';
  options?: string[];
}

interface EntityConfig {
  title: string;
  path: string;
  fields: FieldDef[];
}

const entities: Record<string, EntityConfig> = {
  notifications: { title: 'Notifications', path: 'notifications', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'active', label: 'Active', type: 'select', options: ['true', 'false'] },
  ]},
  events: { title: 'Events', path: 'events', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'venue', label: 'Venue', type: 'text' },
    { name: 'imageUrl', label: 'Image URL', type: 'url' },
  ]},
  news: { title: 'News', path: 'news', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'pdfLink', label: 'PDF Link (News PDF)', type: 'url' },
  ]},
  gallery: { title: 'Gallery', path: 'gallery', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'imageUrl', label: 'Image URL (Cloudinary)', type: 'url' },
    { name: 'category', label: 'Category', type: 'text' },
  ]},
  achievers: { title: 'Achievers', path: 'achievers', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'achievement', label: 'Achievement', type: 'textarea' },
    { name: 'description', label: 'Full Description', type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL', type: 'url' },
    { name: 'year', label: 'Year', type: 'text' },
  ]},
  notices: { title: 'Notices', path: 'notices', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'content', label: 'Content', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'pdfLink', label: 'PDF Link (Notice PDF)', type: 'url' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['All', 'CSE', 'ECE', 'EEE', 'ME', 'CE', 'ASH'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['All', '1', '2', '3', '4', '5', '6', '7', '8'] },
  ]},
  marqueeTexts: { title: 'Marquee Texts', path: 'marqueeTexts', fields: [
    { name: 'text', label: 'Marquee Text', type: 'text' },
    { name: 'active', label: 'Active', type: 'select', options: ['true', 'false'] },
  ]},
  downloads: { title: 'Downloads', path: 'downloads', fields: [
    { name: 'title', label: 'Title (e.g. Semester Exam Form)', type: 'text' },
    { name: 'category', label: 'Category', type: 'select', options: ['Results', 'Exam Date Sheet', 'Fee Dues', 'Hostel', 'Forms', 'Notifications', 'Circulars', 'Others'] },
    { name: 'pdfLink', label: 'PDF Link', type: 'url' },
    { name: 'date', label: 'Date', type: 'text' },
  ]},
  feeStructure: { title: 'Fee Structure PDFs', path: 'feeStructure', fields: [
    { name: 'title', label: 'Title (e.g. Boys Fee 2025-26)', type: 'text' },
    { name: 'category', label: 'Category', type: 'select', options: ['Boys Fee', 'Girls Fee', 'Hostel Fee', 'Other'] },
    { name: 'pdfLink', label: 'PDF Link', type: 'url' },
  ]},
  footerLinks: { title: 'Footer Links', path: 'footerLinks', fields: [
    { name: 'label', label: 'Link Label', type: 'text' },
    { name: 'path', label: 'URL or Path', type: 'text' },
    { name: 'pdfLink', label: 'PDF Link (if applicable)', type: 'url' },
    { name: 'section', label: 'Section', type: 'select', options: ['Quick Links', 'Important', 'Resources'] },
  ]},
  timetable: { title: 'Timetable', path: 'timetable', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'division', label: 'Division', type: 'select', options: ['All', 'A', 'B', 'C'] },
    { name: 'pdfLink', label: 'Timetable PDF Link', type: 'url' },
    { name: 'effectiveFrom', label: 'Effective From', type: 'text' },
  ]},
  studyMaterials: { title: 'Study Materials', path: 'studyMaterials', fields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['All', 'CSE', 'ECE', 'EEE', 'ME', 'CE'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['All', '1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'link', label: 'Download Link', type: 'url' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ]},
  examChair: { title: 'Exam Chair', path: 'examChair', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'imageUrl', label: 'Image URL', type: 'url' },
  ]},
  oldPapers: { title: 'Old Question Papers', path: 'oldPapers', fields: [
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'year', label: 'Year', type: 'text' },
    { name: 'link', label: 'Download Link', type: 'url' },
  ]},
  faculty: { title: 'Faculty', path: 'faculty', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ASH'] },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'phone', label: 'Contact Number', type: 'text' },
    { name: 'description', label: 'Description / Bio', type: 'textarea' },
    { name: 'imageUrl', label: 'Photo URL', type: 'url' },
  ]},
  students: { title: 'Students', path: 'students', fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'rollNo', label: 'Roll No', type: 'text' },
    { name: 'phone', label: 'Contact Number', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'branch', label: 'Branch', type: 'select', options: ['CSE', 'ECE', 'EEE', 'ME', 'CE'] },
    { name: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'division', label: 'Division', type: 'select', options: ['A', 'B', 'C'] },
  ]},
};

const sidebarSections = [
  'notifications', 'marqueeTexts', 'events', 'news', 'gallery', 'achievers', 'notices', 'downloads',
  'feeStructure', 'footerLinks',
  'timetable', 'studyMaterials', 'examChair', 'oldPapers', 'faculty', 'students',
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('notifications');
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [popupActive, setPopupActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupImage, setPopupImage] = useState('');
  // For viewing submissions, grievances, leave requests, enquiries
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [grievances, setGrievances] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/admin/login'); return; }
  }, [user, navigate]);

  useEffect(() => {
    if (activeSection === 'admissionPopup') {
      const unsub = subscribeToValue('admissionPopup', (val) => {
        if (val) { setPopupActive(val.active || false); setPopupTitle(val.title || ''); setPopupContent(val.content || ''); setPopupImage(val.imageUrl || ''); }
      });
      return () => unsub();
    }
    if (activeSection === 'submissions') {
      const unsub = subscribeToData('assignmentSubmissions', setSubmissions);
      return () => unsub();
    }
    if (activeSection === 'grievances') {
      const unsub = subscribeToData('grievances', setGrievances);
      return () => unsub();
    }
    if (activeSection === 'leaveRequests') {
      const unsub = subscribeToData('leaveRequests', setLeaveRequests);
      return () => unsub();
    }
    if (activeSection === 'enquiries') {
      const unsub = subscribeToData('enquiries', setEnquiries);
      return () => unsub();
    }
    const config = entities[activeSection];
    if (!config) return;
    const unsub = subscribeToData(config.path, setItems);
    return () => unsub();
  }, [activeSection]);

  const config = entities[activeSection];

  const openAdd = () => { setEditing(null); setFormData({}); setShowForm(true); };
  const openEdit = (item: any) => {
    setEditing(item);
    const data: Record<string, string> = {};
    config.fields.forEach(f => { data[f.name] = item[f.name] || ''; });
    setFormData(data);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateItem(config.path, editing.id, formData);
        toast.success('Updated successfully');
      } else {
        await addItem(config.path, formData);
        toast.success('Added successfully');
      }
      setShowForm(false);
    } catch { toast.error('Operation failed'); }
  };

  const handleDelete = async (path: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try { await deleteItem(path, id); toast.success('Deleted successfully'); } catch { toast.error('Delete failed'); }
  };

  const handleStatusUpdate = async (path: string, id: string, status: string) => {
    try {
      await updateItem(path, id, { status, reviewedAt: new Date().toISOString().split('T')[0] });
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Update failed'); }
  };

  const savePopup = async () => {
    try {
      await setValue('admissionPopup', { active: popupActive, title: popupTitle, content: popupContent, imageUrl: popupImage });
      toast.success('Admission popup updated');
    } catch { toast.error('Failed to update popup'); }
  };

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!user || user.role !== 'admin') return null;

  const specialSections = ['admissionPopup', 'submissions', 'grievances', 'leaveRequests', 'enquiries'];

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className="w-56 bg-primary text-primary-foreground flex-shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-primary-foreground/20">
          <h2 className="font-heading text-lg" style={{ color: 'hsl(var(--gold))' }}>Admin Panel</h2>
          <p className="text-xs opacity-60 mt-1">MECW Dashboard</p>
        </div>
        <nav className="py-2">
          <p className="px-4 py-1 text-[10px] uppercase tracking-wider opacity-40">Content</p>
          {sidebarSections.slice(0, 6).map(s => (
            <button key={s} onClick={() => { setActiveSection(s); setShowForm(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSection === s ? 'bg-primary-foreground/20' : 'opacity-70 hover:opacity-100 hover:bg-primary-foreground/10'}`}
              style={activeSection === s ? { color: 'hsl(var(--gold))' } : {}}>
              {entities[s]?.title}
            </button>
          ))}
          <p className="px-4 py-1 mt-2 text-[10px] uppercase tracking-wider opacity-40">Academic</p>
          {sidebarSections.slice(6, 10).map(s => (
            <button key={s} onClick={() => { setActiveSection(s); setShowForm(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSection === s ? 'bg-primary-foreground/20' : 'opacity-70 hover:opacity-100 hover:bg-primary-foreground/10'}`}
              style={activeSection === s ? { color: 'hsl(var(--gold))' } : {}}>
              {entities[s]?.title}
            </button>
          ))}
          <p className="px-4 py-1 mt-2 text-[10px] uppercase tracking-wider opacity-40">Users</p>
          {sidebarSections.slice(10).map(s => (
            <button key={s} onClick={() => { setActiveSection(s); setShowForm(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSection === s ? 'bg-primary-foreground/20' : 'opacity-70 hover:opacity-100 hover:bg-primary-foreground/10'}`}
              style={activeSection === s ? { color: 'hsl(var(--gold))' } : {}}>
              {entities[s]?.title}
            </button>
          ))}
          <p className="px-4 py-1 mt-2 text-[10px] uppercase tracking-wider opacity-40">Monitoring</p>
          {[
            { key: 'submissions', label: 'Assignment Submissions' },
            { key: 'grievances', label: 'Student Grievances' },
            { key: 'leaveRequests', label: 'Leave Requests' },
            { key: 'enquiries', label: 'Contact Enquiries' },
          ].map(s => (
            <button key={s.key} onClick={() => { setActiveSection(s.key); setShowForm(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSection === s.key ? 'bg-primary-foreground/20' : 'opacity-70 hover:opacity-100 hover:bg-primary-foreground/10'}`}
              style={activeSection === s.key ? { color: 'hsl(var(--gold))' } : {}}>
              {s.label}
            </button>
          ))}
          <button onClick={() => { setActiveSection('admissionPopup'); setShowForm(false); }}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSection === 'admissionPopup' ? 'bg-primary-foreground/20' : 'opacity-70 hover:opacity-100 hover:bg-primary-foreground/10'}`}
            style={activeSection === 'admissionPopup' ? { color: 'hsl(var(--gold))' } : {}}>
            Admission Popup
          </button>
        </nav>
        <div className="p-4 mt-auto border-t border-primary-foreground/20">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Admission Popup */}
        {activeSection === 'admissionPopup' && (
          <div className="max-w-lg">
            <h2 className="font-heading text-2xl text-primary mb-6">Admission Popup Settings</h2>
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={popupActive} onChange={e => setPopupActive(e.target.checked)} className="w-4 h-4" />
                <span className="font-medium">Show Admission Popup</span>
              </label>
              <div><label className="block text-sm font-medium mb-1">Title</label><input value={popupTitle} onChange={e => setPopupTitle(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Content</label><textarea value={popupContent} onChange={e => setPopupContent(e.target.value)} rows={3} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input value={popupImage} onChange={e => setPopupImage(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" /></div>
              <button onClick={savePopup} className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90">Save Settings</button>
            </div>
          </div>
        )}

        {/* Assignment Submissions Monitoring */}
        {activeSection === 'submissions' && (
          <div>
            <h2 className="font-heading text-2xl text-primary mb-6">Assignment Submissions</h2>
            <div className="bg-card rounded-lg border border-border overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b bg-muted">
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Student</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Assignment</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Branch</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Date</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
                  <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody>
                  {submissions.map(s => (
                    <tr key={s.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 text-sm">{s.studentName} ({s.rollNo})</td>
                      <td className="p-3 text-sm">{s.assignmentTitle}</td>
                      <td className="p-3 text-sm">{s.branch} Sem {s.semester}</td>
                      <td className="p-3 text-sm">{s.submittedAt}</td>
                      <td className="p-3 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.status === 'reviewed' ? 'bg-green-100 text-green-700' : s.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {s.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {s.submissionLink && <a href={s.submissionLink} target="_blank" rel="noreferrer" className="p-1.5 text-primary hover:underline text-xs mr-2">View</a>}
                        <button onClick={() => handleDelete('assignmentSubmissions', s.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                  {submissions.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No submissions yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grievances Monitoring */}
        {activeSection === 'grievances' && (
          <div>
            <h2 className="font-heading text-2xl text-primary mb-6">Student Grievances</h2>
            <div className="space-y-3">
              {grievances.map(g => (
                <div key={g.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-primary text-sm">{g.subject}</h3>
                      <p className="text-xs text-muted-foreground">{g.studentName} — {g.branch} Sem {g.semester} • {g.date}</p>
                      <p className="text-sm mt-2">{g.description}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${g.status === 'resolved' ? 'bg-green-100 text-green-700' : g.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {g.status || 'pending'}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <select value={g.status || 'pending'} onChange={e => handleStatusUpdate('grievances', g.id, e.target.value)}
                        className="text-xs border border-input rounded px-2 py-1 bg-background">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button onClick={() => handleDelete('grievances', g.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {grievances.length === 0 && <p className="text-center text-muted-foreground py-8">No grievances submitted.</p>}
            </div>
          </div>
        )}

        {/* Leave Requests Monitoring */}
        {activeSection === 'leaveRequests' && (
          <div>
            <h2 className="font-heading text-2xl text-primary mb-6">Leave Requests</h2>
            <div className="bg-card rounded-lg border border-border overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b bg-muted">
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Student</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Reason</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">From - To</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
                  <th className="p-3 text-right text-xs font-semibold uppercase text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody>
                  {leaveRequests.map(l => (
                    <tr key={l.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 text-sm">{l.studentName} ({l.rollNo})<br/><span className="text-xs text-muted-foreground">{l.branch} Sem {l.semester}</span></td>
                      <td className="p-3 text-sm max-w-[250px]">{l.reason}</td>
                      <td className="p-3 text-sm whitespace-nowrap">{l.fromDate} — {l.toDate}</td>
                      <td className="p-3 text-sm">
                        <select value={l.status || 'pending'} onChange={e => handleStatusUpdate('leaveRequests', l.id, e.target.value)}
                          className="text-xs border border-input rounded px-2 py-1 bg-background">
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDelete('leaveRequests', l.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                  {leaveRequests.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No leave requests yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contact Enquiries Monitoring */}
        {activeSection === 'enquiries' && (
          <div>
            <h2 className="font-heading text-2xl text-primary mb-6">Contact Enquiries</h2>
            <div className="space-y-3">
              {enquiries.map(e => (
                <div key={e.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-primary text-sm">{e.name}</h3>
                      <p className="text-xs text-muted-foreground">{e.phone} • {e.email} • {e.date}</p>
                      {e.course && <p className="text-xs text-gold-dark font-medium mt-1">Course: {e.course}</p>}
                      <p className="text-sm mt-2">{e.message}</p>
                    </div>
                    <button onClick={() => handleDelete('enquiries', e.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
              {enquiries.length === 0 && <p className="text-center text-muted-foreground py-8">No enquiries yet.</p>}
            </div>
          </div>
        )}

        {/* Generic CRUD entity view */}
        {config && !specialSections.includes(activeSection) && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-primary">Manage {config.title}</h2>
              <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:opacity-90">
                <Plus size={16} /> Add New
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
                <div className="bg-card rounded-lg shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
                  <h3 className="font-heading text-xl text-primary mb-4">{editing ? 'Edit' : 'Add'} {config.title}</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {config.fields.map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium mb-1">{f.label}</label>
                        {f.type === 'textarea' ? (
                          <textarea value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} rows={3} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" />
                        ) : f.type === 'select' ? (
                          <select value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                            <option value="">Select...</option>
                            {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input type={f.type === 'password' ? 'password' : f.type === 'url' ? 'url' : 'text'} value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm" />
                        )}
                      </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90">{editing ? 'Update' : 'Add'}</button>
                      <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-border rounded-md text-sm hover:bg-muted">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-card rounded-lg border border-border overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted">
                  {config.fields.slice(0, 4).map(f => <th key={f.name} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase">{f.label}</th>)}
                  <th className="p-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                </tr></thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                      {config.fields.slice(0, 4).map(f => (
                        <td key={f.name} className="p-3 text-sm max-w-[200px] truncate">
                          {f.type === 'password' ? '••••••' : (item[f.name] || '—')}
                        </td>
                      ))}
                      <td className="p-3 text-right">
                        <button onClick={() => openEdit(item)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(config.path, item.id)} className="p-1.5 text-muted-foreground hover:text-destructive ml-1"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No items yet. Click "Add New" to get started.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

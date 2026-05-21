import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToData, addItem, deleteItem } from '@/lib/firebase';
import { toast } from 'sonner';
import { LogOut, Bell, FileText, Megaphone, BookOpen, UserCheck, ExternalLink, Calendar, Clock, Upload, MessageSquare, Send, AlertTriangle } from 'lucide-react';

type TabKey = 'notices' | 'marks' | 'assignments' | 'attendance' | 'general' | 'timetable' | 'materials' | 'submissions' | 'grievances' | 'leave';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('notices');
  const [notices, setNotices] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [generalNotices, setGeneralNotices] = useState<any[]>([]);
  const [timetables, setTimetables] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [mySubmissions, setMySubmissions] = useState<any[]>([]);
  const [myGrievances, setMyGrievances] = useState<any[]>([]);
  const [myLeaves, setMyLeaves] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || user.role !== 'student') { navigate('/login'); return; }

    const matchBranch = (item: any) =>
      item.branch === user.branch &&
      (item.targetType === 'all' || item.targetSemester === user.semester || item.semester === user.semester);

    const unsubs = [
      subscribeToData('facultyNotices', (items) => setNotices(items.filter(matchBranch))),
      subscribeToData('facultyMarks', (items) => setMarks(items.filter(matchBranch))),
      subscribeToData('facultyAssignments', (items) => setAssignments(items.filter(matchBranch))),
      subscribeToData('facultyAttendance', (items) => setAttendance(items.filter(matchBranch))),
      subscribeToData('notices', (items) => {
        setGeneralNotices(items.filter(n =>
          (n.branch === 'All' || n.branch === user.branch) &&
          (n.semester === 'All' || n.semester === user.semester)
        ));
      }),
      subscribeToData('timetable', (items) => {
        setTimetables(items.filter(t =>
          t.branch === user.branch &&
          t.semester === user.semester &&
          (t.division === 'All' || t.division === user.division)
        ));
      }),
      subscribeToData('studyMaterials', (items) => {
        setMaterials(items.filter(m =>
          (m.branch === 'All' || m.branch === user.branch) &&
          (m.semester === 'All' || m.semester === user.semester)
        ));
      }),
      subscribeToData('assignmentSubmissions', (items) => setMySubmissions(items.filter(s => s.studentId === user.uid))),
      subscribeToData('grievances', (items) => setMyGrievances(items.filter(g => g.studentId === user.uid))),
      subscribeToData('leaveRequests', (items) => setMyLeaves(items.filter(l => l.studentId === user.uid))),
    ];
    return () => unsubs.forEach(u => u());
  }, [user, navigate]);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const submitAssignment = async (e: FormEvent, assignment: any) => {
    e.preventDefault();
    try {
      await addItem('assignmentSubmissions', {
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        studentId: user!.uid,
        studentName: user!.name,
        rollNo: user!.data?.rollNo || '',
        branch: user!.branch,
        semester: user!.semester,
        submissionLink: formData.submissionLink || '',
        submissionText: formData.submissionText || '',
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'pending',
      });
      toast.success('Assignment submitted successfully');
      setShowForm(false); setFormData({});
    } catch { toast.error('Submission failed'); }
  };

  const submitGrievance = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('grievances', {
        studentId: user!.uid,
        studentName: user!.name,
        rollNo: user!.data?.rollNo || '',
        branch: user!.branch,
        semester: user!.semester,
        subject: formData.subject || '',
        description: formData.description || '',
        category: formData.category || 'general',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      });
      toast.success('Grievance submitted');
      setShowForm(false); setFormData({});
    } catch { toast.error('Submission failed'); }
  };

  const submitLeave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('leaveRequests', {
        studentId: user!.uid,
        studentName: user!.name,
        rollNo: user!.data?.rollNo || '',
        branch: user!.branch,
        semester: user!.semester,
        reason: formData.reason || '',
        fromDate: formData.fromDate || '',
        toDate: formData.toDate || '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      });
      toast.success('Leave request submitted');
      setShowForm(false); setFormData({});
    } catch { toast.error('Submission failed'); }
  };

  if (!user || user.role !== 'student') return null;

  const tabs: { key: TabKey; icon: any; label: string; count: number }[] = [
    { key: 'notices', icon: Bell, label: 'Faculty Notices', count: notices.length },
    { key: 'marks', icon: FileText, label: 'Results', count: marks.length },
    { key: 'assignments', icon: BookOpen, label: 'Assignments', count: assignments.length },
    { key: 'attendance', icon: UserCheck, label: 'Attendance', count: attendance.length },
    { key: 'general', icon: Megaphone, label: 'College Notices', count: generalNotices.length },
    { key: 'timetable', icon: Calendar, label: 'Timetable', count: timetables.length },
    { key: 'materials', icon: FileText, label: 'Study Materials', count: materials.length },
    { key: 'submissions', icon: Upload, label: 'My Submissions', count: mySubmissions.length },
    { key: 'grievances', icon: AlertTriangle, label: 'Grievances', count: myGrievances.length },
    { key: 'leave', icon: Clock, label: 'Leave', count: myLeaves.length },
  ];

  const inputCls = "w-full px-3 py-2 border border-input rounded-md bg-background text-sm";
  const btnPrimary = "px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90";
  const btnCancel = "px-4 py-2 border border-border rounded-md text-sm hover:bg-muted";

  const PostCard = ({ item, showAbsentees }: { item: any; showAbsentees?: boolean }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-primary text-sm">{item.title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{item.date}</span>
      </div>
      {item.subject && <p className="text-xs text-muted-foreground mt-0.5">{item.subject}{item.examType ? ` • ${item.examType}` : ''}{item.semester ? ` • Sem ${item.semester}` : ''}</p>}
      {item.content && <p className="text-sm text-foreground mt-2">{item.content}</p>}
      {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
      {showAbsentees && item.absentees && <p className="text-sm text-destructive mt-2 font-medium">Absent: {item.absentees}</p>}
      {item.dueDate && <p className="inline-flex items-center gap-1 text-xs font-medium bg-accent/20 text-accent-foreground rounded px-2 py-0.5 mt-2"><Calendar size={12} /> Due: {item.dueDate}</p>}
      {item.pdfLink && <a href={item.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline ml-2"><ExternalLink size={12} /> View PDF</a>}
      {item.facultyName && <p className="text-xs text-muted-foreground mt-2">By: {item.facultyName}</p>}
    </div>
  );

  const [submittingFor, setSubmittingFor] = useState<any>(null);

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl" style={{ color: 'hsl(var(--gold))' }}>Student Dashboard</h1>
          <p className="text-xs opacity-60">{user.name} — {user.branch} | Sem {user.semester} | Div {user.division}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"><LogOut size={16} /> Logout</button>
      </header>

      <div className="container py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); setSubmittingFor(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border hover:bg-muted'}`}>
              <t.icon size={14} /> {t.label}
              {t.count > 0 && <span className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? 'bg-primary-foreground/20' : 'bg-muted'}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {tab === 'notices' && (
          <div className="space-y-3">
            {notices.length > 0 ? notices.map(n => <PostCard key={n.id} item={n} />) : <p className="text-center text-muted-foreground py-12">No notices from faculty yet.</p>}
          </div>
        )}

        {tab === 'marks' && (
          <div className="space-y-3">
            {marks.length > 0 ? marks.map(m => <PostCard key={m.id} item={m} />) : <p className="text-center text-muted-foreground py-12">No results uploaded yet.</p>}
          </div>
        )}

        {tab === 'assignments' && (
          <div className="space-y-3">
            {assignments.map(a => (
              <div key={a.id}>
                <PostCard item={a} />
                {a.submissionRequired === 'true' && (
                  <div className="ml-4 mt-2">
                    {mySubmissions.find(s => s.assignmentId === a.id) ? (
                      <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                        <p className="text-green-700 font-medium">✓ Submitted on {mySubmissions.find(s => s.assignmentId === a.id)?.submittedAt}</p>
                        {mySubmissions.find(s => s.assignmentId === a.id)?.status === 'reviewed' && <p className="text-green-600 text-xs mt-1">Status: Reviewed ✓</p>}
                        {mySubmissions.find(s => s.assignmentId === a.id)?.status === 'rejected' && <p className="text-red-600 text-xs mt-1">Status: Needs revision</p>}
                        {mySubmissions.find(s => s.assignmentId === a.id)?.feedback && <p className="text-xs text-muted-foreground mt-1">Feedback: {mySubmissions.find(s => s.assignmentId === a.id)?.feedback}</p>}
                      </div>
                    ) : submittingFor?.id === a.id ? (
                      <form onSubmit={e => submitAssignment(e, a)} className="bg-card border border-border rounded-lg p-3 space-y-2">
                        <input placeholder="Submission Link (Google Drive, etc.)" value={formData.submissionLink || ''} onChange={e => setFormData({ ...formData, submissionLink: e.target.value })} className={inputCls} type="url" />
                        <textarea placeholder="Notes / Answer text (optional)" value={formData.submissionText || ''} onChange={e => setFormData({ ...formData, submissionText: e.target.value })} rows={2} className={inputCls} />
                        <div className="flex gap-2">
                          <button type="submit" className={btnPrimary}><Send size={14} className="inline mr-1" />Submit</button>
                          <button type="button" onClick={() => { setSubmittingFor(null); setFormData({}); }} className={btnCancel}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <button onClick={() => { setSubmittingFor(a); setFormData({}); }} className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded hover:opacity-90">
                        <Upload size={12} className="inline mr-1" /> Submit Assignment
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
            {assignments.length === 0 && <p className="text-center text-muted-foreground py-12">No assignments posted yet.</p>}
          </div>
        )}

        {tab === 'attendance' && (
          <div className="space-y-3">
            {attendance.length > 0 ? attendance.map(a => <PostCard key={a.id} item={a} showAbsentees />) : <p className="text-center text-muted-foreground py-12">No attendance records yet.</p>}
          </div>
        )}

        {tab === 'general' && (
          <div className="space-y-3">
            {generalNotices.length > 0 ? generalNotices.map(n => <PostCard key={n.id} item={n} />) : <p className="text-center text-muted-foreground py-12">No college notices yet.</p>}
          </div>
        )}

        {tab === 'timetable' && (
          <div className="space-y-3">
            {timetables.map(t => (
              <div key={t.id} className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-primary text-sm">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.branch} • Sem {t.semester} • Div {t.division} • Effective: {t.effectiveFrom}</p>
                {t.pdfLink && <a href={t.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"><ExternalLink size={12} /> View Timetable</a>}
              </div>
            ))}
            {timetables.length === 0 && <p className="text-center text-muted-foreground py-12">No timetable available yet.</p>}
          </div>
        )}

        {tab === 'materials' && (
          <div className="space-y-3">
            {materials.map(m => (
              <div key={m.id} className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-primary text-sm">{m.title}</h3>
                <p className="text-xs text-muted-foreground">{m.subject} • Sem {m.semester}</p>
                {m.description && <p className="text-sm text-muted-foreground mt-1">{m.description}</p>}
                {m.link && <a href={m.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"><ExternalLink size={12} /> Download</a>}
              </div>
            ))}
            {materials.length === 0 && <p className="text-center text-muted-foreground py-12">No study materials available.</p>}
          </div>
        )}

        {tab === 'submissions' && (
          <div className="space-y-3">
            {mySubmissions.map(s => (
              <div key={s.id} className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-sm">{s.assignmentTitle}</h3>
                <p className="text-xs text-muted-foreground">Submitted: {s.submittedAt}</p>
                {s.submissionLink && <a href={s.submissionLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"><ExternalLink size={12} /> View</a>}
                {s.submissionText && <p className="text-sm mt-1">{s.submissionText}</p>}
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${s.status === 'reviewed' ? 'bg-green-100 text-green-700' : s.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {s.status || 'pending'}
                </span>
                {s.feedback && <p className="text-xs text-muted-foreground mt-1 italic">Feedback: {s.feedback}</p>}
              </div>
            ))}
            {mySubmissions.length === 0 && <p className="text-center text-muted-foreground py-12">No submissions yet.</p>}
          </div>
        )}

        {tab === 'grievances' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium mb-4 hover:opacity-90">
              <MessageSquare size={16} /> Submit Grievance
            </button>
            {showForm && (
              <form onSubmit={submitGrievance} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
                <select value={formData.category || 'general'} onChange={e => setFormData({ ...formData, category: e.target.value })} className={inputCls}>
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="faculty">Faculty Related</option>
                  <option value="hostel">Hostel</option>
                  <option value="other">Other</option>
                </select>
                <textarea placeholder="Describe your issue in detail..." value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4} className={inputCls} required />
                <div className="flex gap-2"><button type="submit" className={btnPrimary}>Submit</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {myGrievances.map(g => (
                <div key={g.id} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-sm">{g.subject}</h3>
                  <p className="text-xs text-muted-foreground">{g.category} • {g.date}</p>
                  <p className="text-sm mt-1">{g.description}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${g.status === 'resolved' ? 'bg-green-100 text-green-700' : g.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {g.status || 'pending'}
                  </span>
                </div>
              ))}
              {myGrievances.length === 0 && <p className="text-center text-muted-foreground py-8">No grievances submitted.</p>}
            </div>
          </div>
        )}

        {tab === 'leave' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium mb-4 hover:opacity-90">
              <Clock size={16} /> Apply for Leave
            </button>
            {showForm && (
              <form onSubmit={submitLeave} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium mb-1">From Date</label><input type="date" value={formData.fromDate || ''} onChange={e => setFormData({ ...formData, fromDate: e.target.value })} className={inputCls} required /></div>
                  <div><label className="block text-xs font-medium mb-1">To Date</label><input type="date" value={formData.toDate || ''} onChange={e => setFormData({ ...formData, toDate: e.target.value })} className={inputCls} required /></div>
                </div>
                <textarea placeholder="Reason for leave..." value={formData.reason || ''} onChange={e => setFormData({ ...formData, reason: e.target.value })} rows={3} className={inputCls} required />
                <div className="flex gap-2"><button type="submit" className={btnPrimary}>Submit</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
              </form>
            )}
            <div className="space-y-3">
              {myLeaves.map(l => (
                <div key={l.id} className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-sm">{l.fromDate} — {l.toDate}</p>
                  <p className="text-sm text-muted-foreground mt-1">{l.reason}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${l.status === 'approved' ? 'bg-green-100 text-green-700' : l.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {l.status || 'pending'}
                  </span>
                  {l.reviewedBy && <p className="text-xs text-muted-foreground mt-1">Reviewed by: {l.reviewedBy}</p>}
                </div>
              ))}
              {myLeaves.length === 0 && <p className="text-center text-muted-foreground py-8">No leave requests.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

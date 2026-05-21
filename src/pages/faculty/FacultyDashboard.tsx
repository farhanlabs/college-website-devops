import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToData, addItem, deleteItem, updateItem } from '@/lib/firebase';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Users, Bell, FileText, BookOpen, UserCheck, Phone, ExternalLink, Calendar, Clock, MessageSquare, CheckCircle } from 'lucide-react';

type TabKey = 'students' | 'notices' | 'marks' | 'assignments' | 'attendance' | 'submissions' | 'timetable' | 'materials' | 'leaveRequests';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('students');
  const [students, setStudents] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [timetables, setTimetables] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || user.role !== 'faculty') { navigate('/login'); return; }
    const unsubs = [
      subscribeToData('students', (items) => setStudents(items.filter(s => s.branch === user.branch))),
      subscribeToData('facultyNotices', (items) => setNotices(items.filter(n => n.facultyId === user.uid))),
      subscribeToData('facultyMarks', (items) => setMarks(items.filter(m => m.facultyId === user.uid))),
      subscribeToData('facultyAssignments', (items) => setAssignments(items.filter(a => a.facultyId === user.uid))),
      subscribeToData('facultyAttendance', (items) => setAttendance(items.filter(a => a.facultyId === user.uid))),
      subscribeToData('assignmentSubmissions', (items) => setSubmissions(items.filter(s => s.branch === user.branch))),
      subscribeToData('timetable', (items) => setTimetables(items.filter(t => t.branch === user.branch))),
      subscribeToData('studyMaterials', (items) => setMaterials(items.filter(m => m.facultyId === user.uid || m.branch === user.branch))),
      subscribeToData('leaveRequests', (items) => setLeaveRequests(items.filter(l => l.branch === user.branch))),
    ];
    return () => unsubs.forEach(u => u());
  }, [user, navigate]);

  const handleLogout = async () => { await logout(); navigate('/'); };

  const baseData = () => ({
    facultyId: user!.uid,
    facultyName: user!.name,
    branch: user!.branch,
    date: new Date().toISOString().split('T')[0],
  });

  const submitForm = async (e: FormEvent, path: string, extraData: Record<string, any> = {}) => {
    e.preventDefault();
    try {
      await addItem(path, { ...formData, ...baseData(), ...extraData });
      toast.success('Posted successfully');
      setShowForm(false); setFormData({});
    } catch { toast.error('Failed to post'); }
  };

  const handleDelete = async (path: string, id: string) => {
    if (!confirm('Delete this item?')) return;
    try { await deleteItem(path, id); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  const handleSubmissionReview = async (id: string, status: string, feedback: string) => {
    try {
      await updateItem('assignmentSubmissions', id, { status, feedback, reviewedBy: user!.name, reviewedAt: new Date().toISOString().split('T')[0] });
      toast.success(`Marked as ${status}`);
    } catch { toast.error('Update failed'); }
  };

  const handleLeaveAction = async (id: string, status: string) => {
    try {
      await updateItem('leaveRequests', id, { status, reviewedBy: user!.name, reviewedAt: new Date().toISOString().split('T')[0] });
      toast.success(`Leave ${status}`);
    } catch { toast.error('Update failed'); }
  };

  if (!user || user.role !== 'faculty') return null;

  const tabs: { key: TabKey; icon: any; label: string; count?: number }[] = [
    { key: 'students', icon: Users, label: 'Students' },
    { key: 'notices', icon: Bell, label: 'Notices', count: notices.length },
    { key: 'marks', icon: FileText, label: 'Results', count: marks.length },
    { key: 'assignments', icon: BookOpen, label: 'Assignments', count: assignments.length },
    { key: 'attendance', icon: UserCheck, label: 'Attendance', count: attendance.length },
    { key: 'submissions', icon: CheckCircle, label: 'Submissions', count: submissions.filter(s => s.status !== 'reviewed').length },
    { key: 'timetable', icon: Calendar, label: 'Timetable' },
    { key: 'materials', icon: FileText, label: 'Materials', count: materials.length },
    { key: 'leaveRequests', icon: Clock, label: 'Leave Requests', count: leaveRequests.filter(l => l.status === 'pending').length },
  ];

  const inputCls = "w-full px-3 py-2 border border-input rounded-md bg-background text-sm";
  const btnPrimary = "px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90";
  const btnCancel = "px-4 py-2 border border-border rounded-md text-sm hover:bg-muted";
  const btnAdd = "flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium mb-4 hover:opacity-90";

  const FormWrapper = ({ onSubmit, children }: { onSubmit: (e: FormEvent) => void; children: React.ReactNode }) => (
    showForm ? (
      <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg p-4 mb-4 space-y-3 max-w-lg">
        {children}
        <div className="flex gap-2"><button type="submit" className={btnPrimary}>Post</button><button type="button" onClick={() => setShowForm(false)} className={btnCancel}>Cancel</button></div>
      </form>
    ) : null
  );

  const PostCard = ({ item, path, extra }: { item: any; path: string; extra?: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
      <div className="flex-1">
        <h3 className="font-semibold text-primary text-sm">{item.title}</h3>
        {item.subject && <p className="text-xs text-muted-foreground">{item.subject} • Sem {item.semester}{item.examType ? ` • ${item.examType}` : ''}</p>}
        {item.content && <p className="text-sm text-muted-foreground mt-1">{item.content}</p>}
        {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
        {item.absentees && <p className="text-sm text-destructive mt-1 font-medium">Absent: {item.absentees}</p>}
        {item.dueDate && <p className="inline-flex items-center gap-1 text-xs font-medium bg-accent/20 text-accent-foreground rounded px-2 py-0.5 mt-2"><Calendar size={12} /> Due: {item.dueDate}</p>}
        {item.pdfLink && <a href={item.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline ml-2"><ExternalLink size={12} /> PDF</a>}
        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
        {extra}
      </div>
      <button onClick={() => handleDelete(path, item.id)} className="text-muted-foreground hover:text-destructive ml-2"><Trash2 size={15} /></button>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl" style={{ color: 'hsl(var(--gold))' }}>Faculty Dashboard</h1>
          <p className="text-xs opacity-60">{user.name} — {user.branch} Department</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"><LogOut size={16} /> Logout</button>
      </header>

      <div className="container py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border hover:bg-muted'}`}>
              <t.icon size={14} /> {t.label}
              {(t.count ?? 0) > 0 && <span className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? 'bg-primary-foreground/20' : 'bg-muted'}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {/* Students */}
        {tab === 'students' && (
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b bg-muted">
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Name</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Roll No</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Sem</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Div</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground"><Phone size={14} className="inline mr-1" />Contact</th>
                <th className="p-3 text-left text-xs font-semibold uppercase text-muted-foreground">Email</th>
              </tr></thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 text-sm">{s.name}</td>
                    <td className="p-3 text-sm">{s.rollNo}</td>
                    <td className="p-3 text-sm">{s.semester}</td>
                    <td className="p-3 text-sm">{s.division}</td>
                    <td className="p-3 text-sm">{s.phone ? <a href={`tel:${s.phone}`} className="text-primary hover:underline">{s.phone}</a> : '—'}</td>
                    <td className="p-3 text-sm">{s.email || '—'}</td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No students.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* Notices */}
        {tab === 'notices' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Post Notice</button>
            <FormWrapper onSubmit={e => submitForm(e, 'facultyNotices', { type: 'notice' })}>
              <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
              <textarea placeholder="Content" value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={3} className={inputCls} required />
              <input placeholder="PDF Link (optional)" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" />
              <select value={formData.targetType || 'all'} onChange={e => setFormData({ ...formData, targetType: e.target.value })} className={inputCls}>
                <option value="all">All Students (Branch)</option><option value="semester">Specific Semester</option>
              </select>
              {formData.targetType === 'semester' && (
                <select value={formData.targetSemester || ''} onChange={e => setFormData({ ...formData, targetSemester: e.target.value })} className={inputCls}>
                  <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              )}
            </FormWrapper>
            <div className="space-y-3">
              {notices.map(n => <PostCard key={n.id} item={n} path="facultyNotices" />)}
              {notices.length === 0 && <p className="text-center text-muted-foreground py-8">No notices posted yet.</p>}
            </div>
          </div>
        )}

        {/* Marks */}
        {tab === 'marks' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Upload Marks Sheet</button>
            <FormWrapper onSubmit={e => submitForm(e, 'facultyMarks', { type: 'marks' })}>
              <input placeholder="Title (e.g. Mid-Term Results)" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
              <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
              <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
              <input placeholder="Exam Type" value={formData.examType || ''} onChange={e => setFormData({ ...formData, examType: e.target.value })} className={inputCls} />
              <input placeholder="PDF Link" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" required />
              <textarea placeholder="Description (optional)" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className={inputCls} />
            </FormWrapper>
            <div className="space-y-3">
              {marks.map(m => <PostCard key={m.id} item={m} path="facultyMarks" />)}
              {marks.length === 0 && <p className="text-center text-muted-foreground py-8">No marks uploaded yet.</p>}
            </div>
          </div>
        )}

        {/* Assignments */}
        {tab === 'assignments' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Post Assignment</button>
            <FormWrapper onSubmit={e => submitForm(e, 'facultyAssignments', { type: 'assignment' })}>
              <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
              <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
              <textarea placeholder="Instructions" value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={3} className={inputCls} required />
              <input placeholder="Due Date (YYYY-MM-DD)" value={formData.dueDate || ''} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className={inputCls} type="date" />
              <input placeholder="PDF / Reference Link" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" />
              <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
              <select value={formData.targetType || 'all'} onChange={e => setFormData({ ...formData, targetType: e.target.value })} className={inputCls}>
                <option value="all">All Students (Branch)</option><option value="semester">Specific Semester</option>
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={formData.submissionRequired === 'true'} onChange={e => setFormData({ ...formData, submissionRequired: e.target.checked ? 'true' : 'false' })} />
                Require online submission from students
              </label>
            </FormWrapper>
            <div className="space-y-3">
              {assignments.map(a => <PostCard key={a.id} item={a} path="facultyAssignments" extra={
                a.submissionRequired === 'true' && <p className="text-xs text-accent-foreground mt-1 font-medium">📤 Online submission required</p>
              } />)}
              {assignments.length === 0 && <p className="text-center text-muted-foreground py-8">No assignments yet.</p>}
            </div>
          </div>
        )}

        {/* Attendance */}
        {tab === 'attendance' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Upload Attendance</button>
            <FormWrapper onSubmit={e => submitForm(e, 'facultyAttendance', { type: 'attendance' })}>
              <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
              <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
              <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
              <textarea placeholder="Absent Students (names or roll numbers)" value={formData.absentees || ''} onChange={e => setFormData({ ...formData, absentees: e.target.value })} rows={3} className={inputCls} />
              <input placeholder="PDF Link (optional)" value={formData.pdfLink || ''} onChange={e => setFormData({ ...formData, pdfLink: e.target.value })} className={inputCls} type="url" />
            </FormWrapper>
            <div className="space-y-3">
              {attendance.map(a => <PostCard key={a.id} item={a} path="facultyAttendance" />)}
              {attendance.length === 0 && <p className="text-center text-muted-foreground py-8">No attendance records yet.</p>}
            </div>
          </div>
        )}

        {/* Submissions Review */}
        {tab === 'submissions' && (
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Student Assignment Submissions</h3>
            <div className="space-y-3">
              {submissions.map(s => (
                <div key={s.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-primary">{s.assignmentTitle}</h4>
                      <p className="text-xs text-muted-foreground">{s.studentName} ({s.rollNo}) • Sem {s.semester} • {s.submittedAt}</p>
                      {s.submissionText && <p className="text-sm mt-2">{s.submissionText}</p>}
                      {s.submissionLink && <a href={s.submissionLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"><ExternalLink size={12} /> View Submission</a>}
                      {s.feedback && <p className="text-xs text-muted-foreground mt-2 italic">Feedback: {s.feedback}</p>}
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${s.status === 'reviewed' ? 'bg-green-100 text-green-700' : s.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {s.status || 'pending'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      <button onClick={() => handleSubmissionReview(s.id, 'reviewed', 'Approved')} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100">✓ Approve</button>
                      <button onClick={() => handleSubmissionReview(s.id, 'rejected', 'Needs revision')} className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100">✗ Reject</button>
                    </div>
                  </div>
                </div>
              ))}
              {submissions.length === 0 && <p className="text-center text-muted-foreground py-8">No submissions yet.</p>}
            </div>
          </div>
        )}

        {/* Timetable */}
        {tab === 'timetable' && (
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Branch Timetables</h3>
            <div className="space-y-3">
              {timetables.map(t => (
                <div key={t.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm">{t.title}</h4>
                    <p className="text-xs text-muted-foreground">{t.branch} • Sem {t.semester} • Div {t.division} • Effective: {t.effectiveFrom}</p>
                    {t.pdfLink && <a href={t.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"><ExternalLink size={12} /> View Timetable</a>}
                  </div>
                </div>
              ))}
              {timetables.length === 0 && <p className="text-center text-muted-foreground py-8">No timetables uploaded yet. Admin uploads timetables.</p>}
            </div>
          </div>
        )}

        {/* Study Materials */}
        {tab === 'materials' && (
          <div>
            <button onClick={() => { setShowForm(true); setFormData({}); }} className={btnAdd}><Plus size={16} /> Upload Material</button>
            <FormWrapper onSubmit={e => submitForm(e, 'studyMaterials')}>
              <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputCls} required />
              <input placeholder="Subject" value={formData.subject || ''} onChange={e => setFormData({ ...formData, subject: e.target.value })} className={inputCls} required />
              <select value={formData.semester || ''} onChange={e => setFormData({ ...formData, semester: e.target.value })} className={inputCls} required>
                <option value="">Select Semester</option>{['1','2','3','4','5','6','7','8'].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
              <input placeholder="Download Link (Google Drive, etc.)" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} className={inputCls} type="url" required />
              <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className={inputCls} />
            </FormWrapper>
            <div className="space-y-3">
              {materials.map(m => (
                <div key={m.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-primary">{m.title}</h4>
                    <p className="text-xs text-muted-foreground">{m.subject} • Sem {m.semester}</p>
                    {m.description && <p className="text-sm text-muted-foreground mt-1">{m.description}</p>}
                    {m.link && <a href={m.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"><ExternalLink size={12} /> Download</a>}
                  </div>
                  <button onClick={() => handleDelete('studyMaterials', m.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
                </div>
              ))}
              {materials.length === 0 && <p className="text-center text-muted-foreground py-8">No materials uploaded yet.</p>}
            </div>
          </div>
        )}

        {/* Leave Requests */}
        {tab === 'leaveRequests' && (
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Student Leave Requests</h3>
            <div className="space-y-3">
              {leaveRequests.map(l => (
                <div key={l.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm">{l.studentName} ({l.rollNo})</h4>
                      <p className="text-xs text-muted-foreground">Sem {l.semester} • {l.fromDate} to {l.toDate}</p>
                      <p className="text-sm mt-1">{l.reason}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${l.status === 'approved' ? 'bg-green-100 text-green-700' : l.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {l.status || 'pending'}
                      </span>
                    </div>
                    {(!l.status || l.status === 'pending') && (
                      <div className="flex flex-col gap-1 ml-2">
                        <button onClick={() => handleLeaveAction(l.id, 'approved')} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100">Approve</button>
                        <button onClick={() => handleLeaveAction(l.id, 'rejected')} className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100">Reject</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {leaveRequests.length === 0 && <p className="text-center text-muted-foreground py-8">No leave requests.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;

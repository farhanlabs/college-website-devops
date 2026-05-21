import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [tab, setTab] = useState<'faculty' | 'student'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { facultyLogin, studentLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      if (tab === 'faculty') {
        await facultyLogin(username, password);
        toast.success('Welcome, Faculty!');
        navigate('/faculty/dashboard');
      } else {
        await studentLogin(username, password);
        toast.success('Welcome, Student!');
        navigate('/student/dashboard');
      }
    } catch {
      toast.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageBanner title="Login" subtitle="Access your portal" />
      <div className="container py-12 max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex mb-6 border-b border-border">
            {(['student', 'faculty'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${tab === t ? 'text-primary border-b-2 border-gold' : 'text-muted-foreground'}`}>{t} Login</button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm" placeholder="Enter username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm" placeholder="Enter password" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/admin/login" className="text-xs text-muted-foreground hover:text-gold transition-colors">Admin Login →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

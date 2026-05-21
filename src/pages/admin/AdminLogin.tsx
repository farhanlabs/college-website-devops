import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await adminLogin(email, password);
      toast.success('Welcome, Administrator!');
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageBanner title="Admin Login" subtitle="Authorized Personnel Only" />
      <div className="container py-12 max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm" placeholder="admin@mecw.ac.in" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm" placeholder="Enter password" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? 'Logging in...' : 'Admin Login'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;

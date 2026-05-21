import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, getData } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

type UserRole = 'admin' | 'faculty' | 'student';

interface AuthUser {
  uid: string;
  role: UserRole;
  name: string;
  email?: string;
  branch?: string;
  semester?: string;
  division?: string;
  data?: any;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  facultyLogin: (username: string, password: string) => Promise<void>;
  studentLogin: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('mecw_user');
    if (saved) setUser(JSON.parse(saved));

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const adminUser: AuthUser = { uid: firebaseUser.uid, role: 'admin', name: 'Administrator', email: firebaseUser.email || '' };
        setUser(adminUser);
        sessionStorage.setItem('mecw_user', JSON.stringify(adminUser));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const adminLogin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const facultyLogin = async (username: string, password: string) => {
    const data = await getData('faculty');
    if (!data) throw new Error('No faculty found');
    const entry = Object.entries(data).find(
      ([, v]: [string, any]) => v.username === username && v.password === password
    );
    if (!entry) throw new Error('Invalid credentials');
    const [id, fData] = entry as [string, any];
    const u: AuthUser = { uid: id, role: 'faculty', name: fData.name, branch: fData.branch, data: fData };
    setUser(u);
    sessionStorage.setItem('mecw_user', JSON.stringify(u));
  };

  const studentLogin = async (username: string, password: string) => {
    const data = await getData('students');
    if (!data) throw new Error('No students found');
    const entry = Object.entries(data).find(
      ([, v]: [string, any]) => v.username === username && v.password === password
    );
    if (!entry) throw new Error('Invalid credentials');
    const [id, sData] = entry as [string, any];
    const u: AuthUser = { uid: id, role: 'student', name: sData.name, branch: sData.branch, semester: sData.semester, division: sData.division, data: sData };
    setUser(u);
    sessionStorage.setItem('mecw_user', JSON.stringify(u));
  };

  const logout = async () => {
    try { await signOut(auth); } catch {}
    sessionStorage.removeItem('mecw_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, adminLogin, facultyLogin, studentLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

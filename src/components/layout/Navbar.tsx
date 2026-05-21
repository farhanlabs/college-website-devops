import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, LogIn, Clock } from 'lucide-react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import mecLogo from '@/assets/mec-logo.png';

interface NavChild { label: string; path: string; }
interface NavItem { label: string; path?: string; children?: NavChild[]; }

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', children: [
    { label: 'About MEC', path: '/about/about-mec' },
    { label: 'Our Vision', path: '/about/vision' },
    { label: 'Our Mission', path: '/about/mission' },
    { label: 'Core Values', path: '/about/core-values' },
    { label: "Administrator's Message", path: '/about/administrator-message' },
    { label: "CEO's Message", path: '/about/ceo-message' },
    { label: "Director's Message", path: '/about/director-message' },
    { label: 'Achievements', path: '/about/achievements' },
  ]},
  { label: 'Admission', children: [
    { label: 'Admission Procedure', path: '/admission/procedure' },
    { label: 'Programmes Offered', path: '/admission/programmes' },
    { label: 'Fee Structure', path: '/admission/fee-structure' },
    { label: 'Scholarships', path: '/admission/scholarships' },
    { label: 'Our Achievers', path: '/admission/achievers' },
    { label: 'Apply Online', path: '/admission/apply' },
    { label: 'Admission Enquiry', path: '/admission/enquiry' },
    { label: 'Downloads', path: '/admission/downloads' },
  ]},
  { label: 'Departments', children: [
    { label: 'Computer Science & Engineering', path: '/department/cse' },
    { label: 'Electronics & Communication Engg.', path: '/department/ece' },
    { label: 'Electrical & Electronics Engg.', path: '/department/eee' },
    { label: 'Mechanical Engineering', path: '/department/me' },
    { label: 'Civil Engineering', path: '/department/ce' },
    { label: 'Applied Sciences & Humanities', path: '/department/ash' },
    { label: 'Faculty', path: '/faculty' },
  ]},
  { label: 'Examination', children: [
    { label: 'Exam Chair', path: '/examination/chair' },
    { label: 'Old Question Papers', path: '/examination/papers' },
  ]},
  { label: 'Placements', children: [
    { label: 'Training & Activities', path: '/placements/training' },
    { label: 'Job Fair', path: '/placements/job-fair' },
    { label: 'Placement Calendar', path: '/placements/calendar' },
    { label: 'Placement Policies', path: '/placements/policies' },
    { label: 'Our Prominent Recruiters', path: '/placements/recruiters' },
    { label: 'Conferences & Seminars', path: '/placements/conferences' },
    { label: 'Alumni Testimonials', path: '/placements/alumni' },
  ]},
  { label: 'Fee Payment', path: '/fee-payment' },
  { label: 'Campus', children: [
    { label: 'Hostel', path: '/campus/hostel' },
    { label: 'Life Skill & Communication', path: '/campus/life-skill' },
    { label: 'Gymnasium', path: '/campus/gymnasium' },
    { label: 'Library', path: '/campus/library' },
    { label: 'Transport', path: '/campus/transport' },
    { label: 'Gallery', path: '/campus/gallery' },
  ]},
  { label: 'Resources', children: [
    { label: 'Anti Ragging Committee', path: '/resources/anti-ragging' },
    { label: 'Flying Squad', path: '/resources/flying-squad' },
    { label: 'Clubs', path: '/resources/clubs' },
    { label: 'Sports', path: '/resources/sports' },
    { label: 'Women Cell', path: '/resources/women-cell' },
    { label: 'Events', path: '/resources/events' },
    { label: 'News', path: '/resources/news' },
  ]},
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { hidden, scrolled } = useScrollDirection();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 transition-transform duration-300"
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      {/* AMU-style top bar — dark maroon/red */}
      <div className="bg-maroon py-1 px-4 text-[11px] text-white/80 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a href="tel:+919588356609" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={10} /> +91-9588356609
            </a>
            <a href="mailto:director@mecw.ac.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={10} /> director@mecw.ac.in
            </a>
            <span className="flex items-center gap-1.5">
              <Clock size={10} /> Mon-Sat: 9AM - 5PM
            </span>
          </div>
          <Link to="/login" className="flex items-center gap-1.5 hover:text-gold transition-colors font-medium">
            <LogIn size={10} /> Student / Faculty Login
          </Link>
        </div>
      </div>

      {/* White logo bar */}
      <div className={`bg-white py-2.5 px-4 border-b border-border transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={mecLogo} alt="MEC Logo" className="h-14 md:h-16 w-auto object-contain" />
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Affiliated to</p>
              <p className="text-xs font-semibold text-foreground">Gurugram University</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Approved by</p>
              <p className="text-xs font-semibold text-foreground">AICTE, New Delhi</p>
            </div>
          </div>
          <button className="lg:hidden text-foreground p-2 rounded-md hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* AMU-style green navigation strip */}
      <nav className="bg-primary hidden lg:block shadow-lg">
        <div className="container">
          <div className="flex items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className="px-3 xl:px-3.5 py-3 text-[12px] font-medium text-white/90 flex items-center gap-1 hover:text-gold hover:bg-white/10 transition-all whitespace-nowrap uppercase tracking-wider">
                      {item.label}
                      <ChevronDown size={11} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 bg-white shadow-2xl border border-border rounded-b-lg py-1.5 min-w-[260px] z-50 animate-slide-down">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-5 py-2.5 text-[13px] text-foreground/75 hover:bg-primary/5 hover:text-primary hover:pl-6 transition-all duration-200 border-l-2 border-transparent hover:border-primary"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path!} className="px-3 xl:px-3.5 py-3 text-[12px] font-medium text-white/90 hover:text-gold hover:bg-white/10 transition-all whitespace-nowrap block uppercase tracking-wider">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/login" className="ml-auto px-5 py-1.5 text-[11px] font-bold bg-gold text-white rounded hover:brightness-110 transition-all uppercase tracking-widest shadow-md">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border max-h-[75vh] overflow-y-auto animate-slide-down shadow-xl">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-5 py-3 text-sm text-foreground border-b border-border/50 font-medium"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="bg-muted/50">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-8 py-2.5 text-sm text-muted-foreground hover:text-primary border-b border-border/30 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path!}
                  className="block px-5 py-3 text-sm text-foreground border-b border-border/50 font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="p-4">
            <Link to="/login" className="block py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded text-center uppercase tracking-wider" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

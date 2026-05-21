import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdmissionPopup from '@/components/AdmissionPopup';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedSection from '@/components/AnimatedSection';
import { subscribeToData } from '@/lib/firebase';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Megaphone,
  ImageIcon,
  Trophy,
  Building2,
  Cpu,
  Zap,
  Cog,
  HardHat,
  FlaskConical,
  ChevronRight,
  Clock,
  CheckCircle2,
  Star,
  Shield,
  Target,
  FileText,
  Bell,
  Newspaper,
  ExternalLink,
  BookMarked,
  Briefcase,
  Download,
  X,
  ChevronLeft,
  MessageCircle,
  Quote,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ShieldCheck,
  HelpCircle,
  BarChart3
} from "lucide-react";
import heroCampus from '@/assets/hero-campus.jpg';
import heroCampus2 from '@/assets/hero-campus-2.jpg';
import heroCampus3 from '@/assets/hero-campus-3.jpg';
import aboutCampus from '@/assets/about-campus.jpg';
import campusLife from '@/assets/campus-life.jpg';
import mecLogo from '@/assets/mec-logo.png';
import ceoImg from '@/assets/ceo.jpg';
import deptCse from '@/assets/dept-cse.jpg';
import deptEce from '@/assets/dept-ece.jpg';
import deptEee from '@/assets/dept-eee.jpg';
import deptMe from '@/assets/dept-me.jpg';
import deptCe from '@/assets/dept-ce.jpg';


const heroSlides = [
  { img: heroCampus, title: 'Mewat Engineering College', subtitle: 'Shaping Tomorrow\'s Engineers Today' },
  { img: heroCampus2, title: 'World-Class Infrastructure', subtitle: 'Modern Labs · Smart Classrooms · Digital Library' },
  { img: heroCampus3, title: 'Industry-Ready Education', subtitle: 'Practical Learning · Research · Innovation' },
];

const Index = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [achievers, setAchievers] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [marqueeTexts, setMarqueeTexts] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showAllNotices, setShowAllNotices] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);
  const [selectedAchiever, setSelectedAchiever] = useState<any>(null);

  useEffect(() => {
    const unsubs = [
      subscribeToData('notifications', (items) => setNotifications(items.filter((n: any) => n.active !== 'false'))),
      subscribeToData('events', setEvents),
      subscribeToData('gallery', setGallery),
      subscribeToData('achievers', setAchievers),
      subscribeToData('notices', setNotices),
      subscribeToData('news', setNews),
      subscribeToData('marqueeTexts', setMarqueeTexts),
      subscribeToData('downloads', setDownloads),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = useCallback(() => setHeroIndex(p => (p - 1 + heroSlides.length) % heroSlides.length), []);
  const nextSlide = useCallback(() => setHeroIndex(p => (p + 1) % heroSlides.length), []);

  const marqueeItems = marqueeTexts.length > 0
    ? marqueeTexts.filter((m: any) => m.active !== 'false')
    : notifications;

  const departments = [
    { img: deptCse, name: 'Computer Science & Engineering', code: 'cse', seats: '60' },
    { img: deptEce, name: 'Electronics & Communication Engg.', code: 'ece', seats: '60' },
    { img: deptEee, name: 'Electrical & Electronics Engg.', code: 'eee', seats: '60' },
    { img: deptMe, name: 'Mechanical Engineering', code: 'me', seats: '60' },
    { img: deptCe, name: 'Civil Engineering', code: 'ce', seats: '60' },
  ];

  const quickLinks = [
    { label: 'Admission Procedure', path: '/admission/procedure', icon: FileText },
    { label: 'Fee Structure', path: '/admission/fee-structure', icon: BookMarked },
    { label: 'Scholarships', path: '/admission/scholarships', icon: Award },
    { label: 'Placement Cell', path: '/placements/training', icon: Briefcase },
    { label: 'Anti Ragging', path: '/resources/anti-ragging', icon: Shield },
    { label: 'Downloads', path: '/admission/downloads', icon: ExternalLink },
  ];

  const testimonials = [
    { name: 'Mohd. Aslam', branch: 'B.Tech CSE, 2024', text: 'MEC transformed my career. The faculty support and practical learning gave me the confidence to crack GATE and secure a top rank. Forever grateful!', img: null },
    { name: 'Priya Sharma', branch: 'B.Tech ECE, 2023', text: 'The campus environment is incredible. From labs to library, everything is world-class. I got placed in TCS through the placement cell.', img: null },
    { name: 'Vikas Kumar', branch: 'B.Tech ME, 2024', text: 'Best engineering college in Mewat region. The workshops and industry visits helped me understand real-world applications of engineering.', img: null },
    { name: 'Sana Fatima', branch: 'B.Tech CE, 2023', text: 'MEC gave me opportunities I never imagined. The faculty mentored me throughout and I secured a government job after graduation.', img: null },
  ];

const industryPartners = [
  { name: 'Tata Consultancy Services', logo: 'https://cdn.brandfetch.io/tcs.com/w/400/h/400/logo' },
  { name: 'Infosys', logo: 'https://cdn.brandfetch.io/infosys.com/w/400/h/400/logo' },
  { name: 'Wipro', logo: 'https://cdn.brandfetch.io/wipro.com/w/400/h/400/logo' },
  { name: 'HCL Technologies', logo: 'https://cdn.brandfetch.io/hcltech.com/w/400/h/400/logo' },
  { name: 'Tech Mahindra', logo: 'https://cdn.brandfetch.io/techmahindra.com/w/400/h/400/logo' },
  { name: 'Larsen & Toubro', logo: 'https://cdn.brandfetch.io/larsentoubro.com/w/400/h/400/logo' },
  { name: 'Cognizant', logo: 'https://cdn.brandfetch.io/cognizant.com/w/400/h/400/logo' },
  { name: 'Accenture', logo: 'https://cdn.brandfetch.io/accenture.com/w/400/h/400/logo' },
];

  return (
    <Layout>
      <AdmissionPopup />
      <ScrollToTop />

      {/* ===== STICKY SOCIAL ICONS ===== */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
        <a href="https://wa.me/919588356609" target="_blank" rel="noreferrer"
          className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="WhatsApp">
          <MessageCircle size={20} />
        </a>
        <a href="tel:+919588356609"
          className="w-11 h-11 rounded-full bg-[#2196F3] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Call Us">
          <Phone size={20} />
        </a>
        <a href="mailto:director@mecw.ac.in"
          className="w-11 h-11 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Email">
          <Mail size={20} />
        </a>
        <a href="https://gurugramuniversity.ac.in/" target="_blank" rel="noreferrer"
          className="w-11 h-11 rounded-full bg-gold text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Gurugram University">
          <GraduationCap size={20} />
        </a>
      </div>

      {/* ===== MARQUEE — fast, numbered, NEW badge, maroon bg ===== */}
      {marqueeItems.length > 0 && (
        <div className="bg-maroon py-2.5 overflow-hidden relative flex items-center">
          {/* Fixed notification icon */}
          <div className="flex-shrink-0 bg-gold px-4 py-1.5 flex items-center gap-2 z-20 shadow-md">
            <Bell size={16} className="text-white animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-wider hidden sm:inline">Notifications</span>
          </div>
          <div className="overflow-hidden flex-1 relative">
            <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[hsl(var(--maroon))] to-transparent z-10" />
            <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-[hsl(var(--maroon))] to-transparent z-10" />
            <div className="flex animate-marquee-fast whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems].map((n, i) => (
                <span key={i} className="mx-8 text-sm font-medium flex items-center gap-2 text-gold">
                  <span className="bg-gold text-maroon text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">NEW</span>
                  <span className="text-white/60 font-bold">{(i % marqueeItems.length) + 1}.</span>
                  <span className="text-white">{n.title || n.text}{n.content ? ` — ${n.content}` : ''}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO SLIDER ===== */}
      <section className="relative h-[80vh] min-h-[520px] flex items-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <img key={i} src={slide.img} alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors flex items-center justify-center">
          <ChevronLeft size={22} />
        </button>
        <button onClick={nextSlide} className="absolute right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors flex items-center justify-center">
          <ChevronRight size={22} />
        </button>

        <div className="relative container z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-semibold mb-6 animate-fade-in backdrop-blur-sm">
              <Star size={12} /> NAAC Accredited · AICTE Approved · NBA Accredited
            </div>
            <h2 className="font-heading text-[2.5rem] md:text-5xl lg:text-[3.5rem] leading-[1.1] text-white mb-4 animate-fade-in-up" key={`title-${heroIndex}`}>
              {heroSlides[heroIndex].title} {heroIndex === 0 && <span className="text-gold">(Waqf)</span>}
            </h2>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium mb-4 animate-fade-in-up" style={{ animationDelay: '.05s' }}>
              Haryana Waqf Board · Government of Haryana
            </p>
            <p className="text-white/70 text-[15px] leading-relaxed mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '.1s' }}>
              {heroSlides[heroIndex].subtitle}
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '.18s' }}>
              <a href="https://mecw-admission.vercel.app/#admission" target="_blank" rel="noreferrer" className="px-7 py-3 bg-gold text-white font-bold rounded hover:brightness-110 transition-all text-sm tracking-wide shadow-lg shadow-gold-dark/30">
                Apply Now →
              </a>
              <Link to="/about/about-mec" className="px-7 py-3 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-all font-semibold text-sm tracking-wide border border-white/15">
                Explore College
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '.25s' }}>
              {['Industry Focused', 'Modern Labs', 'Expert Faculty'].map(f => (
                <span key={f} className="flex items-center gap-1.5 text-white/70 text-sm">
                  <CheckCircle2 size={14} className="text-gold" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === heroIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* ===== QUICK LINKS BAR ===== */}
      <AnimatedSection>
        <section className="bg-primary py-3">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {quickLinks.map(ql => (
                <Link key={ql.label} to={ql.path} className="flex items-center gap-2 px-3 py-2.5 text-white/80 hover:text-gold hover:bg-white/10 rounded transition-all text-[11px] md:text-xs font-medium">
                  <ql.icon size={14} className="shrink-0 text-gold" />
                  <span className="leading-tight">{ql.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

{/* ===== OUR IMPACT IN NUMBERS ===== */}
<AnimatedSection>
  <section className="relative z-20 py-16">

    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/10 via-white to-[#D4AF37]/10 blur-3xl opacity-50" />

    <div className="container relative max-w-6xl">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#800000]/10 text-[#800000] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <Award size={14} />
          Our Achievements
        </span>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-3">
          Impact in Numbers
        </h2>
        <div className="w-20 h-1 bg-[#800000] rounded-full mx-auto" />
        <p className="text-muted-foreground text-sm mt-4 max-w-lg mx-auto">
          A legacy of excellence built through dedicated education, research, and student success.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {[
          { icon: GraduationCap, label: 'Programmes', value: '6+', desc: 'UG & PG Courses' },
          { icon: Users, label: 'Students', value: '2000+', desc: 'Enrolled & Active' },
          { icon: BookOpen, label: 'Faculty', value: '100+', desc: 'Expert Educators' },
          { icon: Award, label: 'Years', value: '10+', desc: 'Of Excellence' },
        ].map((s, i) => (
          <div
            key={s.label}
            className="group relative text-center p-6 md:p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-[#800000]/20 overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Subtle Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#800000]/5 to-transparent rounded-bl-full" />

            {/* Icon */}
            <div className="relative w-14 h-14 rounded-xl bg-[#800000]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#800000] transition-all duration-500 shadow-sm">
              <s.icon className="text-[#800000] group-hover:text-white transition-colors duration-500" size={26} />
            </div>

            {/* Value */}
            <div className="relative font-heading text-3xl md:text-4xl text-[#800000] font-bold tracking-tight mb-1">
              {s.value}
            </div>

            {/* Label */}
            <div className="relative text-sm text-foreground font-semibold uppercase tracking-wider mb-1">
              {s.label}
            </div>

            {/* Description */}
            <div className="relative text-xs text-muted-foreground">
              {s.desc}
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#D4AF37] rounded-full group-hover:w-16 transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  </section>
</AnimatedSection>

      {/* ===== NEWS & NOTIFICATIONS — AMU STYLE ===== */}
      <AnimatedSection>
        <section className="py-14 bg-cream">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground font-bold uppercase tracking-wide">News & Notifications</h2>
              <div className="section-divider mx-auto mt-3" />
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* University News — left 2 cols */}
              <div className="lg:col-span-2 bg-white border border-border shadow-sm rounded overflow-hidden">
                <div className="flex items-center gap-0 border-b-[3px] border-maroon">
                  <div className="w-1.5 h-10 bg-maroon" />
                  <h3 className="font-bold text-foreground text-sm px-4 py-2.5 uppercase tracking-wide">University Updates</h3>
                </div>
                <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                  {news.length > 0 ? news.slice(0, 5).map((n, i) => (
                    <div key={n.id || i} className="px-4 py-3 hover:bg-cream/60 transition-colors group flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-maroon text-maroon text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        {n.pdfLink ? (
                          <a href={n.pdfLink} target="_blank" rel="noreferrer"
                            className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-maroon transition-colors cursor-pointer hover:underline">
                            {n.title}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-maroon transition-colors">{n.title}</p>
                        )}
                        {n.date && (
                          <p className="text-[10px] text-maroon mt-1 flex items-center gap-1 font-medium">
                            <Calendar size={9} /> Published on {n.date}
                          </p>
                        )}
                      </div>
                      {n.pdfLink && (
                        <a href={n.pdfLink} target="_blank" rel="noreferrer"
                          className="flex-shrink-0 w-7 h-8 flex items-center justify-center text-maroon hover:text-maroon-light" title="Download PDF">
                          <Download size={16} />
                        </a>
                      )}
                    </div>
                  )) : (
                    <div className="px-4 py-10 text-center text-muted-foreground text-sm">No news available.</div>
                  )}
                </div>
                <div className="border-t border-border px-4 py-2.5 text-center">
                  <button onClick={() => setShowAllNews(true)} className="bg-maroon text-white text-xs font-bold px-5 py-1.5 rounded hover:bg-maroon-light transition-colors uppercase tracking-wider">
                    View All
                  </button>
                </div>
              </div>

              {/* Important Notifications — middle 2 cols */}
              <div className="lg:col-span-2 bg-white border border-border shadow-sm rounded overflow-hidden">
                <div className="flex items-center gap-0 border-b-[3px] border-maroon">
                  <div className="w-1.5 h-10 bg-maroon" />
                  <h3 className="font-bold text-foreground text-sm px-4 py-2.5 uppercase tracking-wide">Important Notifications</h3>
                </div>
                <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                  {notices.length > 0 ? notices.slice(0, 5).map((n, i) => (
                    <div key={n.id || i} className="px-4 py-3 hover:bg-cream/60 transition-colors group flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-maroon text-maroon text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        {n.pdfLink ? (
                          <a href={n.pdfLink} target="_blank" rel="noreferrer"
                            className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-maroon transition-colors cursor-pointer hover:underline">
                            {n.title || n.content}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground font-medium line-clamp-2 group-hover:text-maroon transition-colors">{n.title || n.content}</p>
                        )}
                        {n.date && (
                          <p className="text-[10px] text-maroon mt-1 flex items-center gap-1 font-medium">
                            <Calendar size={9} /> Published on {n.date}
                          </p>
                        )}
                      </div>
                      {n.pdfLink && (
                        <a href={n.pdfLink} target="_blank" rel="noreferrer"
                          className="flex-shrink-0 w-7 h-8 flex items-center justify-center text-maroon hover:text-maroon-light" title="Download PDF">
                          <Download size={16} />
                        </a>
                      )}
                    </div>
                  )) : (
                    <div className="px-4 py-10 text-center text-muted-foreground text-sm">No notifications available.</div>
                  )}
                </div>
                <div className="border-t border-border px-4 py-2.5 text-center">
                  <button onClick={() => setShowAllNotices(true)} className="bg-maroon text-white text-xs font-bold px-5 py-1.5 rounded hover:bg-maroon-light transition-colors uppercase tracking-wider">
                    View All
                  </button>
                </div>
                <div className="border-t border-border px-3 py-2 text-center">
                  <button onClick={() => setShowAllNotices(true)} className="text-maroon text-xs font-bold hover:underline uppercase tracking-wider">
                    View All Notices &gt;&gt;&gt;
                  </button>
                </div>
              </div>

              {/* Upcoming Events — right 1 col */}
              <div className="lg:col-span-1 bg-white border border-border shadow-sm rounded overflow-hidden">
                <div className="flex items-center gap-0 border-b-[3px] border-primary">
                  <div className="w-1.5 h-10 bg-primary" />
                  <h3 className="font-bold text-foreground text-sm px-3 py-2.5 uppercase tracking-wide">Upcoming Events</h3>
                </div>
                <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                  {events.length > 0 ? events.slice(0, 4).map((e, i) => {
                    const dateParts = e.date?.split(' ') || ['', ''];
                    return (
                      <div key={e.id || i} className="px-3 py-3 hover:bg-cream/60 transition-colors">
                        <div className="flex items-start gap-2.5">
                          <div className="flex-shrink-0 text-center">
                            <div className="text-2xl font-heading text-primary font-bold leading-none">{dateParts[0] || '—'}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{dateParts[1] || ''}</div>
                          </div>
                          <div className="border-l-2 border-primary/20 pl-2.5 flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{e.title}</p>
                            {e.date && <p className="text-[10px] text-maroon mt-1 flex items-center gap-1"><Calendar size={9} /> Dated {e.date}</p>}
                            {e.venue && <p className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin size={9} /> {e.venue}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="px-3 py-10 text-center text-muted-foreground text-sm">No events.</div>
                  )}
                </div>
                <div className="border-t border-border px-3 py-2 text-center">
                  <Link to="/resources/events" className="text-primary text-xs font-bold hover:underline uppercase tracking-wider">
                    View Past Events &gt;&gt;&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== NOTICE MODAL ===== */}
      {showAllNotices && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setShowAllNotices(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-maroon px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-heading text-lg flex items-center gap-2"><Bell size={18} className="text-gold" /> All Notices</h3>
              <button onClick={() => setShowAllNotices(false)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="divide-y divide-border overflow-y-auto max-h-[60vh]">
              {notices.length > 0 ? notices.map((n, i) => (
                <div key={n.id || i} className="px-6 py-4 hover:bg-cream/50 transition-colors flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-maroon/10 text-maroon text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    {n.pdfLink ? (
                      <a href={n.pdfLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground hover:text-maroon hover:underline">{n.title || n.content}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{n.title || n.content}</p>
                    )}
                    {n.date && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Calendar size={9} /> {n.date}</p>}
                  </div>
                  {n.pdfLink && (
                    <a href={n.pdfLink} target="_blank" rel="noreferrer" className="flex-shrink-0 px-3 py-1.5 rounded bg-maroon text-white text-xs font-medium hover:bg-maroon-light transition-colors flex items-center gap-1.5">
                      <Download size={12} /> PDF
                    </a>
                  )}
                </div>
              )) : <div className="px-6 py-12 text-center text-muted-foreground">No notices available.</div>}
            </div>
          </div>
        </div>
      )}

      {/* ===== NEWS MODAL ===== */}
      {showAllNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setShowAllNews(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-heading text-lg flex items-center gap-2"><Newspaper size={18} className="text-gold" /> All News</h3>
              <button onClick={() => setShowAllNews(false)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="divide-y divide-border overflow-y-auto max-h-[60vh]">
              {news.length > 0 ? news.map((n, i) => (
                <div key={n.id || i} className="px-6 py-4 hover:bg-cream/50 transition-colors flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy/10 text-navy text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    {n.pdfLink ? (
                      <a href={n.pdfLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground hover:text-navy hover:underline">{n.title}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                    )}
                    {n.date && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Calendar size={9} /> {n.date}</p>}
                  </div>
                  {n.pdfLink && (
                    <a href={n.pdfLink} target="_blank" rel="noreferrer" className="flex-shrink-0 px-3 py-1.5 rounded bg-navy text-white text-xs font-medium hover:bg-navy-light transition-colors flex items-center gap-1.5">
                      <Download size={12} /> PDF
                    </a>
                  )}
                </div>
              )) : <div className="px-6 py-12 text-center text-muted-foreground">No news available.</div>}
            </div>
          </div>
        </div>
      )}

     {/* ===== WELCOME ===== */}
<AnimatedSection>
  <section className="py-20 bg-white relative overflow-hidden">

    {/* Soft Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-maroon/5 via-white to-maroon/10 blur-2xl opacity-60"></div>

    <div className="container relative">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">
            Welcome to MEC
          </span>

          <h2 className="font-heading text-3xl md:text-[2.5rem] text-foreground leading-tight mb-4">
            Shaping the Future of Engineering Education
          </h2>

          <div className="w-16 h-[3px] bg-maroon mb-6 rounded-full"></div>

          <p className="text-muted-foreground leading-[1.9] mb-4 text-[15px]">
            Mewat Engineering College (Waqf), established under the aegis of Haryana Waqf Board, Government of Haryana, stands as a beacon of technical education in the Mewat region. Affiliated to Gurugram University and approved by AICTE, we provide world-class engineering education accessible to all.
          </p>

          <p className="text-muted-foreground leading-[1.9] mb-8 text-[15px]">
            With state-of-the-art infrastructure, experienced faculty, and industry-oriented curriculum, MEC is nurturing the next generation of engineers and leaders.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              'AICTE Approved',
              'Modern Labs',
              'NBA Accredited',
              'Scholarship Support',
              'Industry Partnerships',
              'Placement Cell'
            ].map(item => (
              <div
                key={item}
                className="flex items-center gap-2 text-[13px] text-foreground bg-white px-3 py-2 rounded-lg shadow-sm border hover:shadow-md transition"
              >
                <CheckCircle2 size={14} className="text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <Link
            to="/about/about-mec"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-maroon text-white rounded-lg hover:bg-maroon-light transition-all font-semibold text-sm shadow-md hover:shadow-lg"
          >
            Learn More <ArrowRight size={14} />
          </Link>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative">

          {/* MAIN IMAGE */}
          <div className="overflow-hidden rounded-2xl shadow-2xl group">
            <img
              src={aboutCampus}
              alt="MEC Lab"
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
          </div>

          {/* SMALL FLOATING IMAGE */}
          <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden lg:block group">
            <img
              src={campusLife}
              alt="MEC Library"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              loading="lazy"
            />
          </div>

          {/* YEARS BADGE */}
          <div className="absolute -top-5 -right-5 px-6 py-5 bg-white/80 backdrop-blur-lg text-maroon rounded-xl shadow-xl border hidden md:block">
            <div className="font-heading text-3xl font-bold">10+</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">
              Years
            </div>
          </div>

          {/* DECORATIVE GLOW */}
          <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-maroon/10 rounded-full blur-2xl"></div>

        </div>

      </div>
    </div>

  </section>
</AnimatedSection>

      {/* ===== DEPARTMENTS WITH IMAGES ===== */}
<AnimatedSection>
  <section className="py-20 bg-cream">
    <div className="container">

      {/* HEADER */}
      <div className="text-center mb-12">
        <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">
          Academic Excellence
        </span>
        <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">
          Our Departments
        </h2>
        <div className="section-divider mx-auto mb-4" />
        <p className="text-muted-foreground max-w-xl mx-auto text-[15px]">
          B.Tech programmes with industry-aligned curriculum and hands-on learning.
        </p>
      </div>

      {/* B.TECH DEPARTMENTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {departments.map((dept, i) => (
          <AnimatedSection key={dept.code} delay={i * 0.08}>
            <Link
              to={`/department/${dept.code}`}
              className="group block rounded-xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-lg transition"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={dept.img}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white font-bold text-sm">{dept.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">
                    B.Tech · {dept.seats} Seats
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-maroon font-bold uppercase tracking-wider">
                  Explore
                </span>
                <ChevronRight
                  size={16}
                  className="text-maroon group-hover:translate-x-1 transition"
                />
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {/* ===== VOCATIONAL COURSES ===== */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-heading text-maroon mb-2">
          Vocational Courses
        </h3>
        <p className="text-sm text-muted-foreground">
          Skill-based programs designed for real-world industry exposure
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[
          {
            title: "D.Voc - Software Development",
            desc: "Hands-on training in programming, web & app development.",
          },
          {
            title: "D.Voc - Automobile Engineering",
            desc: "Practical knowledge of vehicle systems & maintenance.",
          },
          {
            title: "B.Voc - Data Science",
            desc: "Industry-ready skills in data analysis & machine learning.",
          },
          {
            title: "B.Voc - Renewable Energy",
            desc: "Focus on solar, wind & sustainable energy systems.",
          },
          {
            title: "D.Voc - Electrical Systems",
            desc: "Skill training in wiring, control systems & maintenance.",
          },
          {
            title: "B.Voc - Healthcare Technology",
            desc: "Modern healthcare equipment & technical training.",
          },
        ].map((course, i) => (
          <AnimatedSection key={i} delay={i * 0.07}>
            <div className="group p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl transition hover:-translate-y-1">

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon transition">
                <BookOpen className="text-maroon group-hover:text-white" size={22} />
              </div>

              {/* Title */}
              <h4 className="text-[15px] font-semibold text-foreground group-hover:text-maroon transition">
                {course.title}
              </h4>

              {/* Desc */}
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {course.desc}
              </p>

              {/* CTA */}
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-maroon">
                <span>View Details</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition" />
              </div>

            </div>
          </AnimatedSection>
        ))}

      </div>

      {/* ASH */}
      <div className="mt-10">
        <AnimatedSection>
          <Link
            to="/department/ash"
            className="group flex items-center gap-4 bg-white rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/10 group-hover:bg-primary flex items-center justify-center transition">
              <FlaskConical size={24} className="text-primary group-hover:text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm group-hover:text-primary">
                Applied Sciences & Humanities
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Foundation Courses
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition" />
          </Link>
        </AnimatedSection>
      </div>

    </div>
  </section>
</AnimatedSection>

 
{/* ===== FACULTIES SERVICES ===== */}
<AnimatedSection>
  <section className="relative py-24 bg-gradient-to-br from-[#FFF8F0] via-white to-[#800000]/5 overflow-hidden">

    {/* Background Glow */}
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#800000]/10 rounded-full blur-3xl opacity-40"></div>
    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl opacity-40"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#800000]/[0.02] rounded-full blur-3xl"></div>

    <div className="relative max-w-7xl mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 bg-[#800000]/10 text-[#800000] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <Award size={14} />
          Our Infrastructure
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Campus Services & Facilities
        </h2>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed text-sm">
          We provide a complete ecosystem for students — from academic excellence and
          skill development to research opportunities and transparent support systems —
          helping you grow into a confident professional.
        </p>
        <div className="mt-6 w-20 h-1 bg-[#800000] mx-auto rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {[
          {
            title: "Academic & Student Support",
            icon: GraduationCap,
            desc: "Structured mentorship, remedial classes, and personalized academic guidance to boost performance and confidence."
          },
          {
            title: "Training & Placement",
            icon: Briefcase,
            desc: "Career-focused training, industry exposure, internships, and dedicated placement assistance for job readiness."
          },
          {
            title: "IQAC (Quality Cell)",
            icon: ShieldCheck,
            desc: "Continuous monitoring and enhancement of teaching, learning, and institutional processes for quality assurance."
          },
          {
            title: "Central Library",
            icon: BookOpen,
            desc: "Well-equipped library with e-resources, journals, previous papers, and a calm study environment."
          },
          {
            title: "Research & Innovation",
            icon: FlaskConical,
            desc: "Encouraging research culture through projects, funding opportunities, and national/international publications."
          },
          {
            title: "e-Samadhan Portal",
            icon: HelpCircle,
            desc: "A transparent digital grievance system ensuring quick resolution and student satisfaction."
          },
          {
            title: "NAAC Accreditation",
            icon: Trophy,
            desc: "Recognized standards for excellence in academics, infrastructure, and institutional performance."
          },
          {
            title: "NIRF Ranking",
            icon: BarChart3,
            desc: "Performance-driven national ranking reflecting teaching quality, research output, and placements."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="group relative bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Subtle Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#800000]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Icon */}
            <div className="relative w-14 h-14 rounded-xl bg-[#800000]/10 flex items-center justify-center mb-4 group-hover:bg-[#800000] transition-all duration-500 shadow-sm">
              <item.icon size={26} className="text-[#800000] group-hover:text-white transition-colors duration-500" />
            </div>

            {/* Title */}
            <h3 className="relative text-base font-semibold text-foreground mb-2 group-hover:text-[#800000] transition-colors duration-300">
              {item.title}
            </h3>

            {/* Description */}
            <p className="relative text-sm text-muted-foreground leading-relaxed">
              {item.desc}
            </p>

            {/* Animated Bottom Line */}
            <div className="mt-5 h-1 w-0 bg-[#D4AF37] group-hover:w-16 transition-all duration-500 rounded-full"></div>

            {/* Hover Arrow */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
              <ChevronRight size={18} className="text-[#800000]" />
            </div>
          </div>
        ))}

      </div>
    </div>
  </section>
</AnimatedSection>


{/* ===== ADMINISTRATOR MESSAGE ===== */}
<AnimatedSection>
  <section className="py-24 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white relative overflow-hidden">

    {/* soft background glow blobs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full"></div>
    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-400/20 blur-3xl rounded-full"></div>

    <div className="container relative z-10">
      <div className="grid md:grid-cols-5 gap-14 items-center">

        {/* IMAGE */}
        <div className="md:col-span-2 flex justify-center">
          <div className="group relative w-60 h-76 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm transition duration-500 hover:scale-105">
            
            {/* glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <img
              src="https://res.cloudinary.com/dadqwaqis/image/upload/t_Flip/IMG-20260408-WA0015_pq1kyq.jpg"
              alt="Ch. Zakir Hussain Ex-MLA"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            {/* bottom info */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
              <p className="text-sm font-semibold text-white">
                Ch. Zakir Hussain
              </p>
              <p className="text-[11px] text-white/70">
                Ex-MLA
              </p>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="md:col-span-3">
          <span className="text-gold font-bold text-[11px] uppercase tracking-[.3em] mb-4 block">
            From the Administrator's Desk
          </span>

          <h2 className="font-heading text-3xl md:text-4xl mb-6 leading-tight">
            Driving Growth Through <span className="text-gold">Vision & Governance</span>
          </h2>

          <blockquote className="text-white/80 leading-[1.9] text-[15px] border-l-4 border-gold/60 pl-6 mb-8 italic relative">
            <span className="absolute -left-3 top-0 text-gold text-3xl">“</span>
            Our mission at Haryana Waqf Board is to ensure that institutions like 
            Mewat Engineering College continue to grow as centers of excellence. 
            We are focused on strengthening infrastructure, ensuring transparency, 
            and providing inclusive opportunities that empower every student to succeed.
          </blockquote>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-gold font-semibold text-sm">
                Ch. Zakir Hussain, Ex-MLA
              </p>
              <p className="text-white/60 text-xs">
                Administrator, Haryana Waqf Board
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</AnimatedSection>

      {/* ===== CEO MESSAGE ===== */}
<AnimatedSection>
  <section className="py-20 bg-navy text-white relative overflow-hidden">

    {/* Subtle Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40"></div>

    <div className="container relative">
      <div className="grid md:grid-cols-5 gap-14 items-center">

        {/* LEFT IMAGE */}
        <div className="md:col-span-2 flex justify-center">
          <div className="relative group">

            {/* Image */}
            <div className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={ceoImg}
                alt="CEO, MEC (Waqf)"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-gold/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition"></div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-3">

          <span className="text-gold font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">
            From the CEO's Desk
          </span>

          <h2 className="font-heading text-3xl mb-6">
            A Message from Our CEO
          </h2>

          {/* Quote */}
          <blockquote className="text-white/80 leading-[1.9] text-[15px] border-l-4 border-gold pl-5 mb-6 italic">
            "Our vision is to create an institution that not only imparts technical knowledge but also builds character, fosters innovation, and prepares students to be responsible global citizens. Mewat Engineering College is committed to excellence in education, inclusivity, and community development."
          </blockquote>

          {/* Extra Content */}
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            Under the leadership of the Haryana Waqf Board, MEC has emerged as a
            center of technical excellence in the Mewat region. With modern
            infrastructure, industry-focused programs, and strong emphasis on
            skill development, the college is shaping future-ready engineers.
          </p>

          <p className="text-white/70 text-sm leading-relaxed mb-6">
            The institution remains dedicated to empowering students from diverse
            backgrounds by providing quality education, scholarships, and
            opportunities that bridge the gap between rural talent and global
            industry standards.
          </p>

          {/* CEO DETAILS */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-gold font-semibold text-lg">
              Shri Mohammad Shayin, IAS
            </p>
            <p className="text-white/60 text-sm">
              CEO, Haryana Waqf Board
            </p>
          </div>

        </div>

      </div>
    </div>

  </section>
</AnimatedSection>

      {/* ===== DIRECTOR MESSAGE ===== */}
<AnimatedSection>
  <section className="py-20 bg-maroon text-white relative overflow-hidden">

    {/* Subtle Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40"></div>

    <div className="container relative">
      <div className="grid md:grid-cols-5 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div className="md:col-span-3">

          <span className="text-gold font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">
            From the Director's Desk
          </span>

          <h2 className="font-heading text-3xl mb-6">
            A Message of Inspiration
          </h2>

          {/* Quote */}
          <blockquote className="text-white/80 leading-[1.9] text-[15px] border-l-4 border-gold pl-5 mb-6 italic">
            "At Mewat Engineering College, we believe that education is the most powerful tool for transforming lives and communities. Our commitment is to provide not just technical knowledge, but a holistic educational experience that shapes future leaders."
          </blockquote>

          {/* Extra Unique Content */}
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            MEC stands as a bridge between rural talent and modern technological advancement. 
            With a strong focus on practical learning, innovation, and research, we ensure that 
            students are not only academically strong but also industry-ready.
          </p>

          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Our campus fosters an environment of discipline, creativity, and inclusivity, 
            where students from diverse backgrounds are nurtured into confident professionals 
            capable of contributing to national and global development.
          </p>

          {/* CTA */}
          <Link
            to="/about/director-message"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white rounded-lg hover:brightness-110 transition-all font-semibold text-sm shadow-lg"
          >
            Read Full Message <ArrowRight size={14} />
          </Link>

          {/* DIRECTOR DETAILS */}
          <div className="border-t border-white/10 pt-4 mt-6">
            <p className="text-gold font-semibold text-lg">
              Prof. (Dr.) Khwaja M. Rafi
            </p>
            <p className="text-white/60 text-sm">
              Director, MEC
            </p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="md:col-span-2 flex justify-center">
          <div className="relative group">

            {/* Image */}
            <div className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://res.cloudinary.com/dadqwaqis/image/upload/t_Flip/IMG-20260408-WA0015_pq1kyq.jpg"
                alt="Director, MEC (Waqf)"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-gold/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition"></div>

          </div>
        </div>

      </div>
    </div>

  </section>
</AnimatedSection>

      {/* ===== VISION & MISSION ===== */}
     <AnimatedSection>
  <section className="relative py-28 overflow-hidden">

    {/* BACKGROUND */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
        alt="bg"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>

    {/* CONTENT */}
    <div className="relative max-w-7xl mx-auto px-4 text-white">

      {/* Heading */}
      <div className="text-center mb-20">
        <span className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold">
          Our Purpose
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold mt-3">
          Vision & Mission
        </h2>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Vision */}
        <div className="flex gap-6 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 transition">

          {/* BIG IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="vision"
            className="w-24 h-24 rounded-xl object-cover border border-white/30 flex-shrink-0"
          />

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-white/80 leading-relaxed text-[15.5px]">
              To be a premier institution of engineering education and research,
              fostering innovation, ethical values, and leadership to serve society
              and the nation with distinction.
            </p>
          </div>

        </div>

        {/* Mission */}
        <div className="flex gap-6 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 transition">

          {/* BIG IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="mission"
            className="w-24 h-24 rounded-xl object-cover border border-white/30 flex-shrink-0"
          />

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-white/80 leading-relaxed text-[15.5px]">
              To provide quality technical education accessible to all sections of
              society, develop competent engineers with strong ethical foundation,
              and contribute to socio-economic development.
            </p>
          </div>

        </div>

      </div>
    </div>
  </section>
</AnimatedSection>

      {/* ===== WHY CHOOSE MEC ===== */}
     <AnimatedSection>
  <section className="relative py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-maroon/20 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400/20 blur-[120px] rounded-full"></div>

    <div className="max-w-7xl mx-auto px-4 relative">

      {/* Heading */}
      <div className="text-center mb-16">
        <span className="text-maroon font-semibold text-xs uppercase tracking-[0.3em] mb-4 block">
          Why MEC
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Why Choose Us?
        </h2>
        <div className="w-20 h-[2px] bg-gradient-to-r from-maroon to-yellow-500 mx-auto rounded-full"></div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {[
          {
            icon: Building2,
            title: 'Modern Infrastructure',
            desc: 'State-of-the-art labs, smart classrooms, and well-stocked library.',
          },
          {
            icon: Users,
            title: 'Expert Faculty',
            desc: 'Highly qualified faculty committed to mentoring and excellence.',
          },
          {
            icon: Award,
            title: 'Placement Support',
            desc: 'Dedicated T&P cell with strong industry connections.',
          },
          {
            icon: GraduationCap,
            title: 'Holistic Growth',
            desc: 'Technical skills, soft skills, sports, and cultural activities.',
          },
        ].map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.08}>

            <div className="group relative p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

              {/* Glow Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-maroon/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-maroon/10 to-yellow-400/20 flex items-center justify-center mb-5 shadow-inner">
                <item.icon size={24} className="text-maroon" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>

            </div>

          </AnimatedSection>
        ))}

      </div>
    </div>
  </section>
</AnimatedSection>

{/* ===== skill dev program ===== */}
<AnimatedSection>
  <section className="relative py-28 bg-gradient-to-br from-white via-red-50 to-red-100 overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 opacity-30 blur-3xl rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300 opacity-30 blur-3xl rounded-full"></div>

    <div className="relative max-w-7xl mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-20">
        <span className="text-red-600 text-xs uppercase tracking-[0.3em] font-semibold">
          Skill Development
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3">
          Empowering Students with Future Skills
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Our curriculum focuses on building real-world skills that prepare students
          for industry challenges and professional excellence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">

          {[
            {
              title: "Programming & Coding",
              icon: "💻",
              percent: "90%",
              desc: "Hands-on coding practice with modern technologies and real-world projects."
            },
            {
              title: "Communication Skills",
              icon: "🗣️",
              percent: "85%",
              desc: "Enhancing verbal, written, and presentation skills for professional success."
            },
            {
              title: "Leadership & Teamwork",
              icon: "🤝",
              percent: "80%",
              desc: "Developing leadership mindset and collaborative abilities."
            },
            {
              title: "Problem Solving",
              icon: "🧠",
              percent: "88%",
              desc: "Critical thinking and analytical skills through practical challenges."
            }
          ].map((skill, i) => (
            <div key={i} className="group">

              {/* Title */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">{skill.icon}</span>
                  {skill.title}
                </h3>
                <span className="text-red-600 font-semibold">
                  {skill.percent}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-all duration-1000 group-hover:brightness-110"
                  style={{ width: skill.percent }}
                ></div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">
                {skill.desc}
              </p>

            </div>
          ))}

        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="grid grid-cols-2 gap-6">

          {[
            { icon: "🚀", title: "Career Ready", desc: "Industry-focused training" },
            { icon: "📈", title: "Growth Mindset", desc: "Continuous improvement" },
            { icon: "🌐", title: "Global Exposure", desc: "Modern technologies" },
            { icon: "🏆", title: "Excellence", desc: "High performance culture" }
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white p-6 rounded-2xl shadow-md border border-red-100 
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
            >

              <div className="text-4xl mb-3 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h4 className="font-semibold text-gray-800">
                {item.title}
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </div>
  </section>
</AnimatedSection>

      {/* ===== TESTIMONIALS ===== */}
  <AnimatedSection>
  <section className="py-20 bg-gray-100">
    <div className="max-w-6xl mx-auto px-4 text-center">

      {/* Heading */}
       <div className="text-center mb-16">
        <span className="text-maroon font-semibold text-xs uppercase tracking-[0.3em] mb-4 block">
          What our students say about us
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
         Testimonials
        </h2>
        <div className="w-20 h-[2px] bg-gradient-to-r from-maroon to-yellow-500 mx-auto rounded-full"></div>
      </div>


      {/* BUTTONS */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() =>
            document.getElementById("slider")?.scrollBy({ left: -320, behavior: "smooth" })
          }
          className="px-3 py-1 bg-white shadow rounded"
        >
          ←
        </button>
        <button
          onClick={() =>
            document.getElementById("slider")?.scrollBy({ left: 320, behavior: "smooth" })
          }
          className="px-3 py-1 bg-white shadow rounded"
        >
          →
        </button>
      </div>

      {/* SLIDER */}
      <div
        id="slider"
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pt-12"
      >

        {testimonials.map((t, i) => (
          <div
            key={i}
            className="min-w-[280px] max-w-[300px] bg-white rounded-xl shadow-md p-5 flex-shrink-0 text-center hover:shadow-xl transition duration-300"
          >

            {/* IMAGE */}
            <img
              src={
                t.img ||
                `https://randomuser.me/api/portraits/${
                  i % 2 === 0 ? "men" : "women"
                }/${i + 10}.jpg`
              }
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mx-auto -mt-12 mb-3 border-4 border-white shadow"
            />

            {/* CONTENT */}
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-4">
              “{t.text}”
            </p>

            <h4 className="font-semibold text-yellow-600 text-sm">
              {t.name}
            </h4>
            <p className="text-xs text-gray-500">
              {t.branch}
            </p>

          </div>
        ))}

      </div>
    </div>
  </section>
</AnimatedSection>
      {/* ===== INDUSTRY PARTNERS ===== */}
      <AnimatedSection>
  <section className="py-16 bg-cream">
    <div className="container">
      <div className="text-center mb-10">
        <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">
          Collaborations
        </span>
        <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">
          Industry Partners
        </h2>
        <div className="section-divider mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {industryPartners.map((partner, i) => (
          <AnimatedSection key={partner.name} delay={i * 0.06}>
            <div className="bg-white rounded-lg p-6 border border-border shadow-sm text-center premium-card flex items-center justify-center min-h-[120px]">
              
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 w-auto object-contain opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                loading="lazy"
              />

            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
</AnimatedSection>

      {/* ===== OUR ACHIEVERS — Banner Style ===== */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Pride of MEC</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">
                OUR <span className="text-primary">ACHIEVERS</span>
              </h2>
              <div className="section-divider mx-auto" />
            </div>
            {achievers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {achievers.slice(0, 3).map((a, i) => (
                  <AnimatedSection key={a.id} delay={i * 0.1}>
                    <div className="rounded-lg overflow-hidden bg-navy shadow-lg premium-card relative cursor-pointer" onClick={() => setSelectedAchiever(a)}>
                      {a.imageUrl ? (
                        <img src={a.imageUrl} alt={a.name} className="w-full h-56 object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                          <Trophy size={48} className="text-gold/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <h3 className="font-heading text-lg text-gold">{a.name}</h3>
                        <p className="text-white/70 text-sm mt-1 line-clamp-2">{a.achievement}</p>
                        <div className="flex items-center justify-between mt-2">
                          {a.year && <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded font-bold">{a.year}</span>}
                          <span className="text-gold text-xs font-semibold flex items-center gap-1">See More <ChevronRight size={12} /></span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-lg bg-cream border border-border">
                <Trophy className="mx-auto mb-3 text-muted-foreground/30" size={36} />
                <p className="text-muted-foreground text-sm">Achievers will appear here once added by the administrator.</p>
              </div>
            )}
            {achievers.length > 3 && (
              <div className="text-center mt-8">
                <button onClick={() => setSelectedAchiever(achievers[0])} className="inline-flex items-center gap-2 px-6 py-2.5 bg-maroon text-white rounded hover:bg-maroon-light transition-all font-semibold text-sm">
                  See More Achievers <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ===== GALLERY ===== */}
      <AnimatedSection>
        <section className="py-20 bg-cream">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-2 block">Campus Life</span>
                <h2 className="font-heading text-3xl text-foreground">Photo Gallery</h2>
              </div>
              <Link to="/campus/gallery" className="inline-flex items-center gap-1.5 text-maroon font-semibold text-sm hover:gap-2.5 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gallery.slice(0, 8).map(g => (
                  <div key={g.id} className="aspect-square rounded-lg overflow-hidden group cursor-pointer relative">
                    <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors duration-300 flex items-end p-3">
                      {g.title && <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{g.title}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-lg bg-white border border-border">
                <ImageIcon className="mx-auto mb-3 text-muted-foreground/30" size={36} />
                <p className="text-muted-foreground text-sm">Gallery images will appear here once added by the administrator.</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ===== CONNECT ON SOCIAL MEDIA ===== */}
      <AnimatedSection>
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Stay Connected</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">Connect With Us</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Facebook Embed Style Card */}
              <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="bg-[#1877F2] px-5 py-3 flex items-center gap-3">
                  <Facebook size={20} className="text-white" />
                  <div>
                    <h3 className="text-white font-bold text-sm">Mewat Engineering College, Waqf</h3>
                    <p className="text-white/70 text-[11px]">Follow our page for latest updates</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={mecLogo} alt="MEC" className="w-12 h-12 rounded-full border-2 border-[#1877F2]/20 object-contain bg-white" />
                    <div>
                      <p className="font-bold text-foreground text-sm">Mewat Engineering College, ...</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-[#1877F2] font-semibold">f Follow Page</span> · 5.7K followers
                      </p>
                    </div>
                  </div>
                  <a href="https://www.facebook.com/profile.php?id=100063802499686" target="_blank" rel="noreferrer"
                    className="block w-full text-center py-2.5 bg-[#1877F2] text-white rounded font-bold text-sm hover:bg-[#166FE5] transition-colors">
                    Follow on Facebook
                  </a>
                </div>
              </div>

              {/* Other Social Media */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Instagram, name: 'Instagram', color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]', url: '#', followers: 'Follow Us' },
                  { icon: Twitter, name: 'Twitter / X', color: 'bg-[#1DA1F2]', url: '#', followers: 'Follow Us' },
                  { icon: Youtube, name: 'YouTube', color: 'bg-[#FF0000]', url: '#', followers: 'Subscribe' },
                  { icon: Linkedin, name: 'LinkedIn', color: 'bg-[#0A66C2]', url: '#', followers: 'Connect' },
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer"
                    className={`${social.color} rounded-lg p-5 text-white text-center premium-card flex flex-col items-center justify-center gap-2 min-h-[120px] shadow-sm`}>
                    <social.icon size={28} />
                    <h4 className="font-bold text-sm">{social.name}</h4>
                    <span className="text-white/80 text-xs">{social.followers}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FIND US ===== */}
      <AnimatedSection>
        <section className="py-20 bg-cream">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-maroon font-bold text-[10px] uppercase tracking-[.25em] mb-3 block">Contact</span>
              <h2 className="font-heading text-3xl md:text-[2.4rem] text-foreground mb-3">Find Us</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-white rounded-lg p-7 space-y-5 border border-border shadow-sm">
                {[
                  { icon: MapPin, title: 'Campus Address', text: 'Palla, District Nuh, Mewat, Haryana-122107 India' },
                  { icon: Phone, title: 'Phone', text: '+91-9588356609, +91-9897342786, +91-9812437896' },
                  { icon: Mail, title: 'Email', text: 'director@mecw.ac.in, info@mecw.ac.in' },
                  { icon: Clock, title: 'Office Hours', text: 'Monday – Saturday: 9:00 AM – 5:00 PM' },
                ].map(c => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                      <c.icon className="text-maroon" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">{c.title}</h3>
                      <p className="text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg overflow-hidden border border-border h-64 md:h-auto min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.5!2d77.0!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  title="MEC Location"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      

      {/* ===== ACHIEVER POPUP ===== */}
      {selectedAchiever && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelectedAchiever(null)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <h3 className="text-gold font-heading text-lg flex items-center gap-2"><Trophy size={18} className="text-gold" /> Achiever Details</h3>
              <button onClick={() => setSelectedAchiever(null)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6">
              {selectedAchiever.imageUrl && (
                <img src={selectedAchiever.imageUrl} alt={selectedAchiever.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              <h4 className="font-heading text-xl text-foreground mb-1">{selectedAchiever.name}</h4>
              {selectedAchiever.year && <span className="text-xs bg-gold/20 text-gold-dark px-2 py-0.5 rounded font-bold">{selectedAchiever.year}</span>}
              <p className="text-sm text-maroon font-medium mt-3 mb-2">{selectedAchiever.achievement}</p>
              {selectedAchiever.description && (
                <div className="bg-cream rounded-lg p-4 mt-3">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{selectedAchiever.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;

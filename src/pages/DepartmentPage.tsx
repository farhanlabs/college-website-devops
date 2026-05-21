import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import AnimatedSection from '@/components/AnimatedSection';
import { subscribeToData } from '@/lib/firebase';
import { 
  Mail, 
  Phone, 
  BookOpen, 
  FileText, 
  Download, 
  Users, 
  ChevronRight,
  MapPin,
  GraduationCap,
  Award,
  Building2,
  Microscope,
  ExternalLink,
  Calendar
} from 'lucide-react';

// ─── Department Data with Photos, PDF Links & Static HOD Info ───
const deptData: Record<string, {
  name: string;
  desc: string;
  syllabus: string[];
  highlights: string[];
  photos: { url: string; caption: string }[];
  syllabusPdf: string; // ← Replace with your uploaded PDF link
  hod: {
    name: string;
    message: string;
    photo: string; // ← Replace with HOD photo URL
    email: string;
    phone: string;
    qualification: string;
    experience: string;
  };
}> = {
  cse: {
    name: 'Computer Science & Engineering',
    desc: 'The CSE department focuses on programming, algorithms, data structures, databases, networking, AI/ML, and software engineering. Students gain hands-on experience with modern technologies and industry-standard tools through state-of-the-art laboratories and industry collaborations.',
    syllabus: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Artificial Intelligence & Machine Learning',
      'Web Technologies',
      'Software Engineering',
      'Cloud Computing'
    ],
    highlights: [
      'NBA Accredited Program',
      'Industry Partnerships with TCS, Infosys, Wipro',
      'Active Coding Club & Developer Community',
      'Regular Hackathons & Technical Workshops',
      '100% Placement Assistance',
      'Research Center for AI/ML'
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', caption: 'Computer Laboratory' },
      { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', caption: 'Programming Lab' },
      { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', caption: 'Collaborative Workspace' },
      { url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=800&q=80', caption: 'Research Center' }
    ],
    syllabusPdf: '#', // ← Upload your PDF and replace this link
    hod: {
      name: 'Dr. Rajesh Kumar Sharma',
      message: 'Welcome to the Department of Computer Science & Engineering. Our department is committed to nurturing technical excellence and innovation. We emphasize practical learning, research-oriented thinking, and industry readiness. Our graduates are equipped with cutting-edge skills in AI, cloud computing, and software engineering, making them valuable assets to the global tech industry.',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      email: 'hod.cse@college.edu',
      phone: '+91-98765-43210',
      qualification: 'Ph.D. in Computer Science (IIT Delhi)',
      experience: '22+ Years'
    }
  },
  ece: {
    name: 'Electronics & Communication Engineering',
    desc: 'ECE department covers electronic circuits, communication systems, signal processing, VLSI, and embedded systems. The department has well-equipped labs for practical learning and research in emerging communication technologies.',
    syllabus: [
      'Electronic Circuits',
      'Digital Signal Processing',
      'Communication Systems',
      'VLSI Design',
      'Embedded Systems',
      'Microprocessors',
      'Antenna & Wave Propagation',
      'IoT & Wireless Networks'
    ],
    highlights: [
      'Advanced Electronics Laboratory',
      'VLSI Design Center of Excellence',
      'IoT Innovation Lab',
      'Industry Visits & Internships',
      'IEEE Student Chapter',
      '5G Research Initiative'
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', caption: 'Electronics Lab' },
      { url: 'https://images.unsplash.com/photo-1531297461136-82lw9z1c19l?w=800&q=80', caption: 'Circuit Design Lab' },
      { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', caption: 'Microprocessor Lab' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', caption: 'Communication Systems Lab' }
    ],
    syllabusPdf: '#', // ← Upload your PDF and replace this link
    hod: {
      name: 'Dr. Priya Venkatesh',
      message: 'The Department of Electronics & Communication Engineering is dedicated to producing engineers who can design, develop, and maintain electronic systems and communication networks. Our curriculum bridges theoretical knowledge with hands-on experience in VLSI, embedded systems, and wireless communications.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      email: 'hod.ece@college.edu',
      phone: '+91-98765-43211',
      qualification: 'Ph.D. in ECE (IIT Madras)',
      experience: '18+ Years'
    }
  },
  eee: {
    name: 'Electrical & Electronics Engineering',
    desc: 'EEE department specializes in power systems, electrical machines, control systems, and power electronics. Students learn about renewable energy, smart grid technologies, and industrial automation with emphasis on sustainable engineering.',
    syllabus: [
      'Power Systems',
      'Electrical Machines',
      'Control Systems',
      'Power Electronics',
      'Renewable Energy Systems',
      'Instrumentation',
      'High Voltage Engineering',
      'Smart Grid Technology'
    ],
    highlights: [
      'Power Systems Simulation Lab',
      'Electrical Machines Workshop',
      'Renewable Energy Research Center',
      'Industrial Training Programs',
      'Smart Grid Research Lab',
      'Energy Audit Cell'
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', caption: 'Power Systems Lab' },
      { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80', caption: 'Solar Energy Lab' },
      { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', caption: 'Electrical Workshop' },
      { url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80', caption: 'Control Systems Lab' }
    ],
    syllabusPdf: '#', // ← Upload your PDF and replace this link
    hod: {
      name: 'Dr. Anand Krishnamurthy',
      message: 'Welcome to the Department of Electrical & Electronics Engineering. We are at the forefront of research in renewable energy, smart grids, and power electronics. Our mission is to develop engineers who can address the global energy challenges through innovative and sustainable solutions.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      email: 'hod.eee@college.edu',
      phone: '+91-98765-43212',
      qualification: 'Ph.D. in Power Systems (IIT Bombay)',
      experience: '20+ Years'
    }
  },
  me: {
    name: 'Mechanical Engineering',
    desc: 'ME department covers thermodynamics, manufacturing, CAD/CAM, robotics, and industrial engineering with emphasis on practical skills and industry-oriented training.',
    syllabus: [
      'Thermodynamics',
      'Manufacturing Processes',
      'CAD/CAM',
      'Robotics',
      'Fluid Mechanics',
      'Machine Design',
      'Industrial Engineering',
      'Automobile Engineering'
    ],
    highlights: [
      'CNC Machine Workshop',
      'CAD/CAM Center',
      'Robotics & Automation Lab',
      'Industry Collaboration Programs',
      'SAE Student Chapter',
      '3D Printing Facility'
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80', caption: 'Machine Workshop' },
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', caption: 'CAD/CAM Lab' },
      { url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80', caption: 'Robotics Lab' },
      { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', caption: 'Manufacturing Unit' }
    ],
    syllabusPdf: '#', // ← Upload your PDF and replace this link
    hod: {
      name: 'Dr. Suresh Patel',
      message: 'The Department of Mechanical Engineering is committed to excellence in education and research. We provide comprehensive training in design, manufacturing, and automation. Our students are prepared to become leaders in the automotive, aerospace, and manufacturing industries.',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      email: 'hod.me@college.edu',
      phone: '+91-98765-43213',
      qualification: 'Ph.D. in Mechanical Engg. (IIT Kanpur)',
      experience: '19+ Years'
    }
  },
  ce: {
    name: 'Civil Engineering',
    desc: 'CE department focuses on structural engineering, transportation, geotechnical engineering, and environmental engineering with field-based learning and modern surveying techniques.',
    syllabus: [
      'Structural Analysis',
      'Geotechnical Engineering',
      'Transportation Engineering',
      'Environmental Engineering',
      'Surveying',
      'Concrete Technology',
      'Water Resources',
      'Construction Management'
    ],
    highlights: [
      'Surveying & GIS Lab',
      'Material Testing Laboratory',
      'Field Site Visits',
      'Green Building Research Center',
      'Structural Analysis Software Lab',
      'Concrete Technology Lab'
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', caption: 'Surveying Lab' },
      { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', caption: 'Construction Site' },
      { url: 'https://images.unsplash.com/photo-1590644365607-1c5a38fc42d0?w=800&q=80', caption: 'Material Testing' },
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', caption: 'Structural Lab' }
    ],
    syllabusPdf: '#', // ← Upload your PDF and replace this link
    hod: {
      name: 'Dr. Meera Iyer',
      message: 'Welcome to the Department of Civil Engineering. We focus on creating engineers who can design and build sustainable infrastructure. Our curriculum emphasizes practical field experience, modern software tools, and research in green building technologies.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      email: 'hod.ce@college.edu',
      phone: '+91-98765-43214',
      qualification: 'Ph.D. in Structural Engg. (IIT Roorkee)',
      experience: '17+ Years'
    }
  },
  ash: {
    name: 'Applied Sciences & Humanities',
    desc: 'This department provides foundational education in mathematics, physics, chemistry, English, and humanities for all engineering students, building strong analytical and communication skills.',
    syllabus: [
      'Engineering Mathematics',
      'Engineering Physics',
      'Engineering Chemistry',
      'Communication Skills',
      'Environmental Studies',
      'Professional Ethics',
      'Economics & Management',
      'Technical Writing'
    ],
    highlights: [
      'Modern Physics Laboratory',
      'Chemistry Laboratory',
      'Language Lab with Digital Tools',
      'Personality Development Programs',
      'Research in Applied Sciences',
      'Bridge Courses for Students'
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', caption: 'Physics Lab' },
      { url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80', caption: 'Chemistry Lab' },
      { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', caption: 'Language Lab' },
      { url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', caption: 'Seminar Hall' }
    ],
    syllabusPdf: '#', // ← Upload your PDF and replace this link
    hod: {
      name: 'Dr. Lakshmi Narayan',
      message: 'The Department of Applied Sciences & Humanities lays the foundation for engineering education. We focus on developing analytical thinking, scientific temperament, and effective communication skills that are essential for successful engineering careers.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      email: 'hod.ash@college.edu',
      phone: '+91-98765-43215',
      qualification: 'Ph.D. in Mathematics (IIT Kharagpur)',
      experience: '21+ Years'
    }
  }
};

const DepartmentPage = () => {
  const { dept } = useParams();
  const [faculty, setFaculty] = useState<any[]>([]);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const unsub = subscribeToData('faculty', setFaculty);
    return () => unsub();
  }, []);

  const info = deptData[dept || 'cse'] || deptData.cse;
  const deptCode = (dept || 'cse').toUpperCase();
  const deptFaculty = faculty.filter(f => f.branch?.toUpperCase() === deptCode);

  // Reset active photo when department changes
  useEffect(() => {
    setActivePhoto(0);
  }, [dept]);

  return (
    <Layout>
      <PageBanner title={info.name} subtitle="Department" />

      <div className="container py-12 max-w-6xl">

        {/* ─── Department Photo Gallery with Perspective ─── */}
        <AnimatedSection>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Building2 size={22} className="text-[#800000]" />
              <h2 className="font-heading text-2xl text-foreground">Department Gallery</h2>
            </div>

            {/* Main Featured Photo */}
            <div className="relative rounded-xl overflow-hidden shadow-xl mb-4 group">
              <div className="aspect-[21/9] overflow-hidden">
                <img 
                  src={info.photos[activePhoto].url} 
                  alt={info.photos[activePhoto].caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-flex items-center gap-2 bg-[#800000] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  <Microscope size={14} />
                  {info.photos[activePhoto].caption}
                </span>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {info.photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative rounded-lg overflow-hidden aspect-video transition-all duration-300 ${
                    activePhoto === idx 
                      ? 'ring-2 ring-[#800000] ring-offset-2 scale-105 shadow-lg' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 transition-colors ${
                    activePhoto === idx ? 'bg-[#800000]/10' : 'bg-black/20'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Department Overview ─── */}
        <AnimatedSection>
          <div className="bg-white rounded-xl border border-border p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={22} className="text-[#800000]" />
              <h2 className="font-heading text-2xl text-foreground">About the Department</h2>
            </div>
            <div className="w-16 h-1 bg-[#800000] rounded-full mb-6" />
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">{info.desc}</p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {info.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground bg-[#FFF8F0] rounded-lg p-4 border border-[#800000]/10 hover:border-[#800000]/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#800000]/10 flex items-center justify-center shrink-0">
                    <Award size={14} className="text-[#800000]" />
                  </div>
                  <span className="font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── HOD Section (Static Frontend) ─── */}
        <AnimatedSection>
          <div className="bg-gradient-to-br from-[#800000] to-[#600000] text-white rounded-xl p-8 mb-8 shadow-xl relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#D4AF37] text-[#800000] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Head of Department
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* HOD Photo */}
                <div className="shrink-0 mx-auto md:mx-0">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-[#D4AF37]/30 shadow-2xl">
                    <img 
                      src={info.hod.photo} 
                      alt={info.hod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* HOD Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-heading text-2xl mb-1">{info.hod.name}</h3>
                  <p className="text-[#D4AF37] font-medium text-sm mb-4">{info.hod.qualification}</p>

                  <blockquote className="text-white/90 text-sm leading-relaxed italic mb-6 border-l-4 border-[#D4AF37] pl-4">
                    "{info.hod.message}"
                  </blockquote>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-xs bg-white/10 rounded-lg px-3 py-2">
                      <Mail size={12} className="text-[#D4AF37]" />
                      <span>{info.hod.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-white/10 rounded-lg px-3 py-2">
                      <Phone size={12} className="text-[#D4AF37]" />
                      <span>{info.hod.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-white/10 rounded-lg px-3 py-2">
                      <Calendar size={12} className="text-[#D4AF37]" />
                      <span>{info.hod.experience} Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Syllabus Section with PDF Download ─── */}
        <AnimatedSection>
          <div className="bg-[#FFF8F0] rounded-xl border border-[#800000]/10 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen size={22} className="text-[#800000]" />
                <h2 className="font-heading text-2xl text-foreground">Course Curriculum</h2>
              </div>
              <a 
                href={info.syllabusPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <FileText size={16} />
                Download Syllabus PDF
                <Download size={14} />
              </a>
            </div>

            <div className="w-16 h-1 bg-[#800000] rounded-full mb-6" />

            <div className="grid md:grid-cols-2 gap-3">
              {info.syllabus.map((s, i) => (
                <div key={s} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-border hover:border-[#800000]/30 hover:shadow-md transition-all group">
                  <span className="w-10 h-10 rounded-xl bg-[#800000]/10 text-[#800000] text-sm font-bold flex items-center justify-center shrink-0 group-hover:bg-[#800000] group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground font-medium">{s}</span>
                </div>
              ))}
            </div>

            {/* PDF Note */}
            <div className="mt-6 flex items-start gap-3 bg-white rounded-lg p-4 border border-[#800000]/10">
              <ExternalLink size={16} className="text-[#800000] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Detailed Syllabus Available</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click the "Download Syllabus PDF" button above to view the complete course structure, 
                  credit distribution, and examination pattern. Replace the link with your uploaded PDF URL.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Faculty Section ─── */}
        <AnimatedSection>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users size={22} className="text-[#800000]" />
                <h2 className="font-heading text-2xl text-foreground">Department Faculty</h2>
              </div>
              <Link 
                to="/faculty" 
                className="text-[#800000] text-sm font-semibold hover:underline flex items-center gap-1 transition-colors"
              >
                View All Faculty <ChevronRight size={14} />
              </Link>
            </div>
            <div className="w-16 h-1 bg-[#800000] rounded-full mb-6" />

            {deptFaculty.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {deptFaculty.map(f => (
                  <div 
                    key={f.id} 
                    className="bg-white rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-[#800000]/20 transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-[#800000]/10 flex items-center justify-center overflow-hidden border-2 border-[#800000]/20 group-hover:border-[#800000]/50 transition-colors">
                      {f.imageUrl ? (
                        <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-heading text-2xl text-[#800000]">{f.name?.[0]}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{f.name}</h3>
                    <p className="text-xs text-[#800000] font-medium mb-2">{f.designation || 'Faculty'}</p>
                    {f.email && (
                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Mail size={10} /> {f.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-border">
                <Users size={40} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Faculty members will be shown once added by admin.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* ─── Quick Stats Bar ─── */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: 'Faculty Members', value: deptFaculty.length || '15+' },
              { icon: BookOpen, label: 'Courses Offered', value: info.syllabus.length },
              { icon: Award, label: 'Accreditations', value: 'NBA' },
              { icon: MapPin, label: 'Labs & Centers', value: info.highlights.length }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-5 text-center hover:shadow-md transition-shadow">
                <stat.icon size={24} className="text-[#800000] mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </Layout>
  );
};

export default DepartmentPage;
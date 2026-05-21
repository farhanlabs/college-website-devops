import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import AnimatedSection from '@/components/AnimatedSection';
import { Mail, Phone, X, ChevronRight, User, BookOpen } from 'lucide-react';

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  branch: string;
  education?: string;
  experience?: string;
  research?: string;
  interests?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  onLeave?: boolean;
}

const facultyData: FacultyMember[] = [
  // CSE
  { id: 'cse-1', name: 'Dr. Mohd Shahid', designation: 'Assistant Professor & HoD', branch: 'CSE',
    education: 'Ph.D. (Jamia Millia Islamia, 2020), M.Tech (Computer Engineering, 2010), B.Tech (Jamia Millia Islamia, 2007)',
    experience: 'Joined MEC in 2012. Over 5 years of teaching experience at UG & PG levels. Previously worked at BHCET, Faridabad.',
    research: 'Published 15 research papers.',
    interests: 'Soft Computing, Data Structure & Algorithms Design, Theory of Automata, Computer Networking',
    phone: '9625855594', email: 'shahid27.jmi@gmail.com' },
  { id: 'cse-2', name: 'Dr. Pratul Sharma', designation: 'Professor (Adjunct)', branch: 'CSE',
    education: 'Ph.D. (IIT Delhi)',
    email: 'ceo@vedangsoftware.com' },
  { id: 'cse-3', name: 'Dr. Aakib Jawed Khan', designation: 'Assistant Professor (Coordinator)', branch: 'CSE',
    education: 'B.E. (MDU Rohtak), M.Tech (Jamia Hamdard University), Qualified UGC-JRF NET. Pursuing Ph.D. from Jamia Millia Islamia.',
    experience: 'Joined MEC in 2010. Over 7 years of teaching experience.',
    phone: '+91-9991946186', email: 'aakibjawed@gmail.com' },
  { id: 'cse-4', name: 'Dr. Sher Jung Khan', designation: 'Assistant Professor', branch: 'CSE',
    education: 'Ph.D. (M.D. University Rohtak, 2019), M.Tech (2010), B.Tech (2005)',
    experience: 'Joined MEC in 2019. 12 years of total teaching and administrative experience.',
    interests: 'Data Structure & Algorithms, Computer Networking, AI, Python',
    phone: '+91-9812437896', email: 'sherjung2005@gmail.com' },
  { id: 'cse-5', name: 'Ms. Neeti Malik', designation: 'Assistant Professor', branch: 'CSE',
    education: 'B.E. (IT), M.Tech (CSE), MBA (IT), DAC from CDAC Pune',
    experience: 'Joined MEC in 2019. 5+ years teaching and 1 year industrial experience at GE Bangalore.',
    email: 'neemalik@gmail.com', onLeave: true },
  { id: 'cse-6', name: 'Mr. Azaz Khan', designation: 'Assistant Professor', branch: 'CSE',
    education: 'B.Tech (2014), M.Tech (2018) from MDU Rohtak',
    experience: 'Joined MEC in 2019. 3 years industry experience. Microsoft Certified in HTML5/JavaScript.',
    phone: '+91-8053945480', email: 'azazkhancse@gmail.com' },
  { id: 'cse-7', name: 'Ms. Shariqua Razi', designation: 'Assistant Professor', branch: 'CSE',
    phone: '8572881384', email: 'shariqua.razi.sr@gmail.com' },
  { id: 'cse-8', name: 'Mr. Naseem Ahmed', designation: 'Assistant Professor', branch: 'CSE',
    phone: '8586954767', email: 'naseemahmed0592@gmail.com' },

  // ECE
  { id: 'ece-1', name: 'Dr. Anam Mobin', designation: 'Assistant Professor', branch: 'ECE',
    education: 'Ph.D. (JMI, 2023), M.Tech & B.Tech (AMU Aligarh). Qualified GATE and UGC-NET JRF.',
    interests: 'Wireless communication, 5G and beyond',
    phone: '9950716097', email: 'anammobin92@gmail.com' },
  { id: 'ece-2', name: 'Dr. Shaheen Khan', designation: 'Sr. Assistant Professor & HoD', branch: 'ECE',
    education: 'Ph.D. (JMI, 2020), M.Tech (2006), B.Tech (ITM Gurgaon, 2001)',
    experience: 'Joined MEC in 2010. Former industry experience at Hewitt Associates (US MNC). Life member of IETE.',
    phone: '8930340170', email: 'shaheen.khan.2@gmail.com' },
  { id: 'ece-3', name: 'Dr. Naseem Ahmed', designation: 'Assistant Professor', branch: 'ECE',
    education: 'B.E. (2007), M.Tech (2009). Pursuing Ph.D. from NIT Silchar.',
    phone: '+91-8569803605', email: 'naseem047@gmail.com' },
  { id: 'ece-4', name: 'Mr. Adil Zaidi', designation: 'Assistant Professor', branch: 'ECE',
    education: 'B.Tech (UPTU), M.Tech (VLSI Design, MDU)',
    interests: 'Analog and Digital VLSI, Low Power Circuits, Nanoelectronics',
    phone: '+91-8700023374', email: 'adil.zaidi@mecw.ac.in' },
  { id: 'ece-5', name: 'Mr. Sajid Hussain', designation: 'Assistant Professor', branch: 'ECE',
    phone: '9813392062', email: 'hsajid36@gmail.com' },

  // EEE
  { id: 'eee-1', name: 'Dr. Mohd Faraz Ahmer', designation: 'Assistant Professor & HoD', branch: 'EEE',
    education: 'B.E. (2007), M.Tech (2009) from AMU Aligarh',
    interests: 'AGC, Electrospinning, Renewable Energy',
    phone: '9837120981', email: 'farazahmer007@gmail.com' },
  { id: 'eee-2', name: 'Prof. (Dr.) Khwaja M. Rafi', designation: 'Director & Professor', branch: 'EEE',
    education: 'Ph.D. (JMI), M.Tech (AMU)',
    experience: '19+ years experience. Expert in control systems and hybrid renewable energy. Awarded "SITARE-E-JAMIA" in 2017.',
    phone: '09873717806', email: 'kmrafi1@gmail.com' },
  { id: 'eee-3', name: 'Dr. Shamshad Ali', designation: 'Assistant Professor', branch: 'EEE',
    education: 'Ph.D. (Solar Energy), M.Tech, B.E. (JMI)',
    experience: '16+ years experience. Expert in Solar Resource Assessment and Grid Integration.',
    phone: '9718184339', email: 'shamshad.jmi@gmail.com' },
  { id: 'eee-4', name: 'Mr. Kamaluddin Khan', designation: 'Assistant Professor', branch: 'EEE',
    education: 'B.Sc. & M.Sc. Engineering (AMU)',
    experience: '20 years at AMU, 15 years in Saudi Arabia. Expert in Microprocessors and Electric Drives.',
    email: 'kamaluddinkhan1@gmail.com' },

  // ME
  { id: 'me-1', name: 'Dr. Gaurav Aggarwal', designation: 'Assistant Professor & HoD', branch: 'ME',
    education: 'Ph.D. (JC Bose UST/YMCA), M.Tech (NIT Kurukshetra - Gold Medalist)',
    interests: 'Thermal Engineering, Refrigeration, Heat Exchangers',
    phone: '98930656646', email: 'gaurav.citm@gmail.com' },
  { id: 'me-2', name: 'Prof. Vineet Jain', designation: 'Professor', branch: 'ME',
    education: 'Ph.D. (YMCA), B.E. (NIT Kurukshetra)',
    experience: '20+ years experience. Author of three books.',
    phone: '8901510570', email: 'vjdj2004@gmail.com' },
  { id: 'me-3', name: 'Dr. Mohsin Khan', designation: 'Assistant Professor', branch: 'ME',
    education: 'Ph.D. (DTU, 2025), M.Tech (MVN University), B.Tech (MEC Nuh)',
    interests: 'CFD, 3D Printing, IC Engines',
    phone: '9050816883', email: 'mohsin.deen@gmail.com' },

  // CE
  { id: 'ce-1', name: 'Mr. Kaushar Hussain', designation: 'Assistant Professor & HoD', branch: 'CE',
    education: 'B.Tech (JMI), M.E. (Jadavpur University)',
    interests: 'Water Resources, Wastewater Treatment, Desalination',
    phone: '+91-9868047105', email: 'kaushar.hussain@gmail.com' },
  { id: 'ce-2', name: 'Dr. Nadeem A Khan', designation: 'Assistant Professor', branch: 'CE',
    education: 'Ph.D. (JMI, 2022). Currently Post Doc Fellow at KFUPM, Saudi Arabia.',
    research: 'Published 80+ SCI papers, 10 patents.',
    phone: '91-9813717319', email: 'nadeem.khan@mecw.ac.in', onLeave: true },

  // ASH
  { id: 'ash-1', name: 'Dr. Kaleem Ahmed Quraishi', designation: 'Associate Professor (Mathematics)', branch: 'ASH',
    education: 'Ph.D. (JMI, 2011)',
    experience: 'Controller of Examinations. Published 52 research papers.',
    phone: '+91-9718921060', email: 'kaleemspn@yahoo.co.in' },
  { id: 'ash-2', name: 'Dr. Afzal Fatima', designation: 'Assistant Professor (English)', branch: 'ASH',
    education: 'Ph.D. (Lingayas University), M.Phil (Madurai Kamraj University)',
    experience: '8+ years experience.' },
  { id: 'ash-3', name: 'Dr. Mohammad Chaman', designation: 'Associate Professor (Physics)', branch: 'ASH',
    education: 'Ph.D. (AMU, 2004)',
    interests: 'Nano-materials characterization',
    phone: '8059370882', email: 'chamanmce@rediffmail.com' },
];

const branches = [
  { code: 'CSE', name: 'Computer Science & Engineering' },
  { code: 'ECE', name: 'Electronics & Communication Engineering' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering' },
  { code: 'ME', name: 'Mechanical Engineering' },
  { code: 'CE', name: 'Civil Engineering' },
  { code: 'ASH', name: 'Applied Sciences & Humanities' },
];

const FacultyPage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = activeTab === 'ALL' ? facultyData : facultyData.filter(f => f.branch === activeTab);

  const getDescription = (f: FacultyMember) => {
    const parts: string[] = [];
    if (f.education) parts.push(`Education: ${f.education}`);
    if (f.experience) parts.push(`Experience: ${f.experience}`);
    if (f.research) parts.push(`Research: ${f.research}`);
    if (f.interests) parts.push(`Research Interests: ${f.interests}`);
    return parts.join('\n\n');
  };

  return (
    <Layout>
      <PageBanner title="Our Faculty" subtitle="Meet Our Distinguished Teaching Staff" />

      <section className="py-12 bg-cream">
        <div className="container">
          {/* Branch Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button onClick={() => setActiveTab('ALL')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'ALL' ? 'bg-maroon text-white shadow-md' : 'bg-white text-foreground border border-border hover:border-maroon/30'}`}>
              All Departments
            </button>
            {branches.map(b => (
              <button key={b.code} onClick={() => setActiveTab(b.code)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === b.code ? 'bg-maroon text-white shadow-md' : 'bg-white text-foreground border border-border hover:border-maroon/30'}`}>
                {b.code}
              </button>
            ))}
          </div>

          {/* Faculty by branch */}
          {(activeTab === 'ALL' ? branches : branches.filter(b => b.code === activeTab)).map(branch => {
            const branchFaculty = facultyData.filter(f => f.branch === branch.code);
            if (branchFaculty.length === 0) return null;
            return (
              <AnimatedSection key={branch.code}>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 bg-maroon rounded-full" />
                    <h2 className="font-heading text-xl md:text-2xl text-foreground">{branch.name}</h2>
                    <span className="ml-auto text-xs bg-maroon/10 text-maroon px-3 py-1 rounded-full font-bold">{branchFaculty.length} Members</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {branchFaculty.map((f, i) => (
                      <AnimatedSection key={f.id} delay={i * 0.05}>
                        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden premium-card group">
                          <div className="h-48 bg-gradient-to-br from-maroon/10 to-navy/10 flex items-center justify-center relative">
                            {f.imageUrl ? (
                              <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-maroon/10 flex items-center justify-center">
                                <span className="font-heading text-4xl text-maroon">{f.name?.[0]}</span>
                              </div>
                            )}
                            {f.onLeave && (
                              <span className="absolute top-2 right-2 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded">ON LEAVE</span>
                            )}
                            {f.designation.includes('HoD') && (
                              <span className="absolute top-2 left-2 bg-maroon text-white text-[9px] font-bold px-2 py-0.5 rounded">HOD</span>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground text-sm mb-0.5">{f.name}</h3>
                            <p className="text-xs text-maroon font-medium mb-2">{f.designation}</p>
                            {f.email && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                <Mail size={11} className="shrink-0" />
                                <span className="truncate">{f.email}</span>
                              </div>
                            )}
                            {f.phone && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                                <Phone size={11} className="shrink-0" />
                                <span>{f.phone}</span>
                              </div>
                            )}
                            {f.interests && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                                <BookOpen size={11} className="shrink-0" />
                                <span className="line-clamp-2">{f.interests}</span>
                              </div>
                            )}
                            <button onClick={() => setSelectedFaculty(f)}
                              className="text-xs text-maroon font-semibold flex items-center gap-1 hover:underline mt-1">
                              See More <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <User className="mx-auto mb-3 text-muted-foreground/30" size={48} />
              <p className="text-muted-foreground">No faculty members found for this department.</p>
            </div>
          )}
        </div>
      </section>

      {/* Faculty Detail Popup */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelectedFaculty(null)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-maroon px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-white font-heading text-lg">{selectedFaculty.name}</h3>
              <button onClick={() => setSelectedFaculty(null)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                  {selectedFaculty.imageUrl ? (
                    <img src={selectedFaculty.imageUrl} alt={selectedFaculty.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="font-heading text-3xl text-maroon">{selectedFaculty.name?.[0]}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{selectedFaculty.name}</h4>
                  <p className="text-sm text-maroon font-medium">{selectedFaculty.designation}</p>
                  <p className="text-xs text-gold font-semibold mt-1">{branches.find(b => b.code === selectedFaculty.branch)?.name}</p>
                  {selectedFaculty.onLeave && <span className="text-[10px] bg-gold/20 text-gold-dark px-2 py-0.5 rounded font-bold mt-1 inline-block">Currently on Leave</span>}
                </div>
              </div>
              {selectedFaculty.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Mail size={14} className="text-maroon" /> <a href={`mailto:${selectedFaculty.email}`} className="hover:text-maroon">{selectedFaculty.email}</a>
                </div>
              )}
              {selectedFaculty.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Phone size={14} className="text-maroon" /> <a href={`tel:${selectedFaculty.phone}`} className="hover:text-maroon">{selectedFaculty.phone}</a>
                </div>
              )}
              {selectedFaculty.education && (
                <div className="bg-cream rounded-lg p-4 mb-3">
                  <h5 className="font-semibold text-sm text-foreground mb-1">🎓 Education</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedFaculty.education}</p>
                </div>
              )}
              {selectedFaculty.experience && (
                <div className="bg-cream rounded-lg p-4 mb-3">
                  <h5 className="font-semibold text-sm text-foreground mb-1">💼 Experience</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedFaculty.experience}</p>
                </div>
              )}
              {selectedFaculty.research && (
                <div className="bg-cream rounded-lg p-4 mb-3">
                  <h5 className="font-semibold text-sm text-foreground mb-1">📚 Research</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedFaculty.research}</p>
                </div>
              )}
              {selectedFaculty.interests && (
                <div className="bg-cream rounded-lg p-4 mb-3">
                  <h5 className="font-semibold text-sm text-foreground mb-1">🔬 Research Interests</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedFaculty.interests}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FacultyPage;

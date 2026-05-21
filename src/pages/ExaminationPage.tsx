import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import AnimatedSection from '@/components/AnimatedSection';
import { subscribeToData } from '@/lib/firebase';
import {
  FileText,
  Download,
  Phone,
  Mail,
  Shield,
  Clock,
  Headphones,
  Award,
  Users,
  BookOpen,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ExaminationPage = () => {
  const { section } = useParams();
  const [examChair, setExamChair] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);

  // ✅ YOUR ORIGINAL DATA (UNCHANGED)
  const staticExamData = {
    controller: {
      name: "Mr. Nazim Ali Khan",
      designation: "Controller of Examination",
      college: "Mewat Engineering College",
      phone: "+91-9013461834",
      email: "nakhan@mecw.ac.in",
      imageUrl: "",
      about: "The Controller of Examination ensures smooth and fair conduct of exams while maintaining transparency and discipline.",
      message: "We are committed to maintaining integrity and excellence in the examination system for all students."
    },
    members: [
      {
        name: "Mr. Adil Zaidi",
        designation: "Deputy Controller",
        college: "Mewat Engineering College",
        phone: "+91-8826319440",
        email: "er.adilzaidi@gmail.com",
        imageUrl: ""
      },
      {
        name: "Mr. Mohammad Nafees",
        designation: "Examination Clerk",
        college: "Mewat Engineering College",
        phone: "+91-801012475",
        email: "mecwexam@gmail.com",
        imageUrl: ""
      }
    ]
  };

  useEffect(() => {
    const unsubs = [
      subscribeToData('examChair', setExamChair),
      subscribeToData('oldPapers', setPapers),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  const stats = [
    { icon: Shield, label: "100% Transparency", desc: "Fair evaluation process" },
    { icon: Clock, label: "On-Time Results", desc: "Punctual declaration" },
    { icon: Headphones, label: "24/7 Support", desc: "Always available" },
    { icon: Award, label: "Zero Error", desc: "Accurate evaluation" }
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: "Fair Evaluation",
      desc: "Strict adherence to evaluation guidelines ensuring unbiased assessment of every student's performance."
    },
    {
      icon: Clock,
      title: "Timely Results",
      desc: "Committed to publishing examination results within the stipulated timeframe without delays."
    },
    {
      icon: Headphones,
      title: "Student Support",
      desc: "Dedicated grievance redressal system and student helpline for examination-related queries."
    }
  ];

  return (
    <Layout>
      <PageBanner
        title={section === 'papers' ? 'Old Question Papers' : 'Examination Cell'}
        subtitle="Examination"
      />

      <div className="container py-12 max-w-6xl">

        {/* ================= PAPERS SECTION ================= */}
        {section === 'papers' ? (
          <AnimatedSection>
            {papers.length > 0 ? (
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <FileText size={22} className="text-[#800000]" />
                    <h2 className="font-heading text-xl text-foreground">Previous Year Question Papers</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Download previous year question papers to prepare effectively for your examinations.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#800000] text-white">
                        <th className="p-4 text-left text-sm font-semibold">Subject</th>
                        <th className="p-4 text-left text-sm font-semibold">Branch</th>
                        <th className="p-4 text-left text-sm font-semibold">Semester</th>
                        <th className="p-4 text-left text-sm font-semibold">Year</th>
                        <th className="p-4 text-center text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {papers.map((p, i) => (
                        <tr
                          key={p.id}
                          className={`border-b border-border transition-colors hover:bg-[#FFF8F0] ${
                            i % 2 === 0 ? 'bg-white' : 'bg-[#FFF8F0]/50'
                          }`}
                        >
                          <td className="p-4 text-sm font-medium text-foreground">{p.subject}</td>
                          <td className="p-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#800000]/10 text-[#800000]">
                              {p.branch}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{p.semester}</td>
                          <td className="p-4 text-sm text-muted-foreground">{p.year}</td>
                          <td className="p-4 text-center">
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[#800000] hover:text-[#600000] text-sm font-semibold hover:underline transition-colors"
                            >
                              <Download size={14} />
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-border">
                <FileText size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-medium">No Question Papers Available</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Old question papers will appear once added by admin.
                </p>
              </div>
            )}
          </AnimatedSection>
        ) : (
          <>
            {/* ─── HERO SECTION ─── */}
            <AnimatedSection>
              <div className="relative bg-gradient-to-br from-[#800000] to-[#600000] text-white rounded-2xl p-10 mb-12 shadow-xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full" />

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#800000] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    <Shield size={14} />
                    Examination Authority
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                    Examination Cell
                  </h1>
                  <p className="text-white/80 text-sm max-w-2xl mx-auto leading-relaxed">
                    Ensuring transparency, fairness, and efficiency in examinations with a strong commitment
                    to academic excellence and student welfare.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {stats.map((s, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors"
                      >
                        <s.icon size={24} className="text-[#D4AF37] mx-auto mb-2" />
                        <p className="text-sm font-semibold">{s.label}</p>
                        <p className="text-xs text-white/60 mt-1">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ─── CONTROLLER OF EXAMINATION ─── */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl border border-border p-8 mb-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Award size={22} className="text-[#800000]" />
                  <h2 className="font-heading text-2xl text-foreground">Controller of Examination</h2>
                </div>
                <div className="w-16 h-1 bg-[#800000] rounded-full mb-8" />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Photo */}
                  <div className="shrink-0">
                    <div className="w-32 h-32 rounded-2xl bg-[#800000]/10 border-2 border-[#800000]/20 flex items-center justify-center overflow-hidden">
                      {staticExamData.controller.imageUrl ? (
                        <img
                          src={staticExamData.controller.imageUrl}
                          alt={staticExamData.controller.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-heading text-4xl text-[#800000]">
                          {staticExamData.controller.name[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-[#800000] mb-1">
                      {staticExamData.controller.name}
                    </h3>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {staticExamData.controller.designation}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {staticExamData.controller.college}
                    </p>

                    <blockquote className="text-sm text-muted-foreground italic mb-4 border-l-4 border-[#800000] pl-4 bg-[#FFF8F0] p-3 rounded-r-lg">
                      "{staticExamData.controller.about}"
                    </blockquote>

                    <div className="bg-[#FFF8F0] rounded-lg p-4 mb-4 border border-[#800000]/10">
                      <p className="text-sm text-foreground font-medium mb-1">Message</p>
                      <p className="text-sm text-muted-foreground">
                        {staticExamData.controller.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <div className="inline-flex items-center gap-2 bg-[#800000]/5 text-[#800000] px-3 py-2 rounded-lg text-xs font-medium">
                        <Phone size={12} />
                        {staticExamData.controller.phone}
                      </div>
                      <div className="inline-flex items-center gap-2 bg-[#800000]/5 text-[#800000] px-3 py-2 rounded-lg text-xs font-medium">
                        <Mail size={12} />
                        {staticExamData.controller.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ─── EXAMINATION MEMBERS ─── */}
            <AnimatedSection>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <Users size={22} className="text-[#800000]" />
                  <h2 className="font-heading text-2xl text-foreground">Examination Committee</h2>
                </div>
                <div className="w-16 h-1 bg-[#800000] rounded-full mb-8" />

                <div className="grid md:grid-cols-2 gap-5">
                  {staticExamData.members.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-border p-6 flex items-start gap-5 hover:shadow-lg hover:border-[#800000]/20 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#800000]/10 border border-[#800000]/20 flex items-center justify-center shrink-0">
                        {m.imageUrl ? (
                          <img
                            src={m.imageUrl}
                            alt={m.name}
                            className="w-full h-full rounded-xl object-cover"
                          />
                        ) : (
                          <span className="font-heading text-xl text-[#800000]">
                            {m.name[0]}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{m.name}</h3>
                        <p className="text-xs text-[#800000] font-medium mb-1">{m.designation}</p>
                        <p className="text-xs text-muted-foreground mb-2">{m.college}</p>

                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-[#FFF8F0] px-2 py-1 rounded">
                            <Phone size={10} /> {m.phone}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-[#FFF8F0] px-2 py-1 rounded">
                            <Mail size={10} /> {m.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ─── FEATURES SECTION ─── */}
            <AnimatedSection>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen size={22} className="text-[#800000]" />
                  <h2 className="font-heading text-2xl text-foreground">Our Commitments</h2>
                </div>
                <div className="w-16 h-1 bg-[#800000] rounded-full mb-8" />

                <div className="grid md:grid-cols-3 gap-5">
                  {features.map((f, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-[#800000]/20 transition-all duration-300 group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-[#800000]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#800000] transition-colors">
                        <f.icon size={24} className="text-[#800000] group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{f.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ─── IMPORTANT NOTICE ─── */}
            <AnimatedSection>
              <div className="bg-[#FFF8F0] rounded-xl border border-[#800000]/10 p-6 mb-10 flex items-start gap-4">
                <AlertCircle size={24} className="text-[#800000] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Important Notice</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Students are advised to check the examination schedule regularly. Any discrepancies in
                    admit cards or results should be reported immediately to the Examination Cell.
                    For old question papers, visit the{" "}
                    <a href="/examination/papers" className="text-[#800000] font-semibold hover:underline">
                      Question Papers
                    </a>{" "}
                    section.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* ─── BACKEND EXAM CHAIR (UNCHANGED) ─── */}
            <AnimatedSection>
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap size={22} className="text-[#800000]" />
                    <h2 className="font-heading text-2xl text-foreground">Examination Chairpersons</h2>
                  </div>
                </div>
                <div className="w-16 h-1 bg-[#800000] rounded-full mb-8" />

                {examChair.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-5">
                    {examChair.map(e => (
                      <div
                        key={e.id}
                        className="bg-white rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-[#800000]/20 transition-all duration-300"
                      >
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-[#800000]/10 flex items-center justify-center overflow-hidden border-2 border-[#800000]/20">
                          {e.imageUrl ? (
                            <img
                              src={e.imageUrl}
                              alt={e.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-heading text-2xl text-[#800000]">
                              {e.name?.[0]}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground text-sm">{e.name}</h3>
                        <p className="text-xs text-[#800000] font-medium mt-1">{e.designation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-border">
                    <GraduationCap size={40} className="text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      Exam chair information will appear once added by admin.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ExaminationPage;
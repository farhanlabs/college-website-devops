import { useParams } from 'react-router-dom';
import { useEffect, useState, FormEvent } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData, addItem } from '@/lib/firebase';
import { Download, FileText, Send, CheckCircle2, Trophy, Award, Calendar, Users, Phone, Clock, Target, Star, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const AdmissionPage = () => {
  const { section } = useParams();
  const [achievers, setAchievers] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [feeStructure, setFeeStructure] = useState<any[]>([]);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryData, setEnquiryData] = useState({ name: '', phone: '', email: '', message: '', course: '' });

  useEffect(() => {
    if (section === 'achievers') {
      const unsub = subscribeToData('achievers', setAchievers);
      return () => unsub();
    }
    if (section === 'downloads') {
      const unsub = subscribeToData('downloads', setDownloads);
      return () => unsub();
    }
    if (section === 'fee-structure') {
      const unsub = subscribeToData('feeStructure', setFeeStructure);
      return () => unsub();
    }
  }, [section]);

  const handleEnquiry = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addItem('enquiries', { ...enquiryData, date: new Date().toISOString().split('T')[0], status: 'new' });
      toast.success('Enquiry submitted successfully!');
      setEnquirySubmitted(true);
      setEnquiryData({ name: '', phone: '', email: '', message: '', course: '' });
    } catch { toast.error('Failed to submit enquiry'); }
  };

  // Backend Sections (Logic Untouched - Only UI Enhanced)
  if (section === 'achievers') {
    return (
      <Layout>
        <PageBanner title="Our Achievers" subtitle="Hall of Fame" />
        <div className="container py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-red-50 text-red-700 px-6 py-2 rounded-full font-medium">
                <Trophy className="w-5 h-5" /> Celebrating Excellence
              </div>
              <h2 className="text-5xl font-bold mt-4">Our Proud Stars</h2>
            </div>

            {achievers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {achievers.map(a => (
                  <div key={a.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                    <div className="relative h-64">
                      {a.imageUrl ? (
                        <img src={a.imageUrl} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-8xl font-bold text-white/20">
                          {a.name?.[0]}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-2xl">{a.name}</h3>
                      <p className="text-red-600 font-medium mt-1">{a.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-3xl">
                <Trophy size={100} className="mx-auto text-red-200" />
                <p className="mt-6 text-xl text-gray-500">Achievers data will appear here once added by admin.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  if (section === 'downloads') {
    return (
      <Layout>
        <PageBanner title="Downloads" subtitle="Resources & Forms" />
        <div className="container py-16 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold">Official Downloads</h2>
            <p className="text-gray-600 mt-3 text-lg">All important documents at one place</p>
          </div>

          {downloads.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {downloads.map((d, i) => (
                <a key={d.id || i} href={d.pdfLink} target="_blank" rel="noreferrer"
                  className="group flex gap-6 bg-white border border-gray-100 hover:border-red-300 p-8 rounded-3xl transition-all hover:shadow-2xl items-center">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <FileText size={32} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-xl group-hover:text-red-700 transition-colors">{d.title}</h4>
                    {d.category && <span className="inline-block mt-2 text-xs bg-red-100 text-red-700 px-4 py-1.5 rounded-full">{d.category}</span>}
                  </div>
                  <Download size={28} className="text-red-500 group-hover:text-red-600 transition" />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-3xl">
              <FileText size={90} className="mx-auto text-gray-300" />
              <p className="mt-6 text-xl text-gray-500">Downloads will appear once added by administrator.</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (section === 'fee-structure') {
    return (
      <Layout>
        <PageBanner title="Fee Structure" subtitle="Academic Year 2026-27" />
        <div className="container py-16 max-w-6xl">
          {/* Hero */}
          <div className="bg-gradient-to-br from-red-700 to-red-800 text-white rounded-3xl p-12 text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Most Affordable Engineering Education</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Committed to excellence with minimal financial burden</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-12 bg-white rounded-3xl shadow-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-red-700 text-white text-left">
                  <th className="p-6 font-semibold">Particulars</th>
                  <th className="p-6 font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y text-lg">
                {[
                  ["Tuition Fee", "30,000"],
                  ["Exam Fee (Summer Semester)", "2,000"],
                  ["Exam Fee (Winter Semester)", "2,000"],
                  ["Development Fund", "5,000"],
                  ["Registration (Both Semesters)", "3,000"],
                  ["Magazines & Journals", "1,000"],
                  ["Internet Charges", "1,000"],
                  ["Sports & Cultural / Medical", "2,000"],
                  ["Training & Placement Activities", "3,000"],
                  ["Subject Association", "500"],
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-red-50 transition-colors">
                    <td className="p-6 font-medium">{item[0]}</td>
                    <td className="p-6 font-semibold">₹{item[1]}</td>
                  </tr>
                ))}
                <tr className="bg-red-50 font-bold text-2xl">
                  <td className="p-6">Total Annual Fees</td>
                  <td className="p-6 text-red-700">₹49,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl border hover:border-red-200 transition-all">
              <h4 className="text-red-700 font-semibold text-xl mb-5 flex items-center gap-2"><ShieldCheck className="w-6 h-6" /> One Time Charges</h4>
              <ul className="space-y-4 text-lg">
                <li className="flex justify-between"><span>Caution Money</span><span className="font-bold">₹2,000</span></li>
                <li className="flex justify-between"><span>Prospectus Fee</span><span className="font-bold">₹500</span></li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border hover:border-red-200 transition-all">
              <h4 className="text-red-700 font-semibold text-xl mb-5">Special Fee</h4>
              <ul className="space-y-4 text-lg">
                <li>Girls Students: <span className="font-bold text-green-600">₹19,750/year</span></li>
                <li>B.Voc: <span className="font-bold">₹15,000/year</span></li>
                <li>D.Voc: <span className="font-bold">₹12,000/year</span></li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border hover:border-red-200 transition-all">
              <h4 className="text-red-700 font-semibold text-xl mb-5">Hostel & Mess</h4>
              <ul className="space-y-4 text-lg">
                <li>Hostel Fee: ₹16,000</li>
                <li>Mess Charges: ₹28,000</li>
                <li className="pt-4 border-t text-xl font-bold text-red-700">Total: ₹44,000/year</li>
              </ul>
            </div>
          </div>

          {/* Backend PDFs */}
          {feeStructure.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold mb-8">Official Fee Documents</h3>
              <div className="space-y-4">
                {feeStructure.map((f, i) => (
                  <a key={f.id || i} href={f.pdfLink} target="_blank" rel="noreferrer" className="flex items-center gap-6 bg-white p-7 rounded-3xl border hover:border-red-300 group">
                    <FileText className="text-red-600" size={32} />
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold group-hover:text-red-700">{f.title}</h4>
                      {f.category && <span className="text-sm bg-red-100 text-red-700 px-4 py-1 rounded-full inline-block mt-2">{f.category}</span>}
                    </div>
                    <Download size={28} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (section === 'enquiry') {
    return (
      <Layout>
        <PageBanner title="Admission Enquiry" subtitle="We Are Here To Help" />
        <div className="container py-16 max-w-2xl">
          {enquirySubmitted ? (
            <div className="text-center py-20 bg-emerald-50 rounded-3xl">
              <CheckCircle2 size={100} className="mx-auto text-emerald-600" />
              <h3 className="text-4xl font-bold mt-6">Thank You!</h3>
              <p className="text-xl text-gray-600 mt-4">Our admission team will contact you within 24 hours.</p>
              <button onClick={() => setEnquirySubmitted(false)} className="mt-10 px-10 py-4 bg-red-600 text-white rounded-2xl font-semibold hover:bg-red-700">
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <h3 className="text-4xl font-bold text-center mb-10">Start Your Journey With Us</h3>
              <form onSubmit={handleEnquiry} className="space-y-8">
                {/* Form fields same as before but with better styling */}
                <div>
                  <label className="block font-medium mb-2">Full Name <span className="text-red-600">*</span></label>
                  <input required value={enquiryData.name} onChange={e => setEnquiryData({...enquiryData, name: e.target.value})} className="w-full px-6 py-4 border rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none" placeholder="Enter your full name" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-2">Phone Number <span className="text-red-600">*</span></label>
                    <input required type="tel" value={enquiryData.phone} onChange={e => setEnquiryData({...enquiryData, phone: e.target.value})} className="w-full px-6 py-4 border rounded-2xl focus:border-red-500" placeholder="+91 XXXXXXXXXX" />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Email Address</label>
                    <input type="email" value={enquiryData.email} onChange={e => setEnquiryData({...enquiryData, email: e.target.value})} className="w-full px-6 py-4 border rounded-2xl focus:border-red-500" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Interested Course</label>
                  <select value={enquiryData.course} onChange={e => setEnquiryData({...enquiryData, course: e.target.value})} className="w-full px-6 py-4 border rounded-2xl focus:border-red-500 bg-white">
                    <option value="">Select Programme</option>
                    <option>B.Tech - Computer Science & Engineering</option>
                    <option>B.Tech - Electronics & Communication Engg.</option>
                    <option>B.Tech - Electrical & Electronics Engg.</option>
                    <option>B.Tech - Mechanical Engineering</option>
                    <option>B.Tech - Civil Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-2">Your Message <span className="text-red-600">*</span></label>
                  <textarea required rows={5} value={enquiryData.message} onChange={e => setEnquiryData({...enquiryData, message: e.target.value})} className="w-full px-6 py-4 border rounded-3xl focus:border-red-500" placeholder="Tell us about your goals and queries..." />
                </div>

                <button type="submit" className="w-full py-5 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-2xl flex items-center justify-center gap-3 transition active:scale-95">
                  <Send /> Submit Enquiry
                </button>
              </form>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (section === 'apply') {
  return (
    <Layout>
      <PageBanner title="Apply Online" subtitle="Admissions 2026-27 Open" />

      <div className="container py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Hero Card - Smaller Heading + Better Mobile View */}
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-5 py-2 rounded-2xl text-xs md:text-sm font-medium border border-white/20">
              Limited Seats
            </div>

            <Users size={70} className="mx-auto mb-6 md:mb-8 opacity-90" />

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Engineering Journey <br className="hidden md:block" />
              Starts Here
            </h2>
            
            <p className="text-lg md:text-xl mt-5 text-red-100 max-w-2xl mx-auto px-4">
              Join Mewat Engineering College for quality education, modern infrastructure and excellent placements.
            </p>

            <div className="mt-10 md:mt-12">
              <a
                href="https://mecw-admission.vercel.app/#admission"
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-white text-red-700 hover:bg-gray-100 text-xl md:text-2xl font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Apply Online Now →
              </a>
            </div>

            <p className="text-red-100 mt-6 text-sm md:text-base">
              Takes less than 5 minutes • Completely Secure
            </p>
          </div>

          {/* Highlights - Improved Mobile Spacing */}
          <div className="grid md:grid-cols-3 gap-6 -mt-6 md:-mt-8 relative z-10 px-4">
            {[
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Last Date",
                desc: "30th June 2026",
                sub: "For All Programmes"
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Placement Support",
                desc: "100% Assistance",
                sub: "Strong Industry Network"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Multiple Quotas",
                desc: "Merit + Management",
                sub: "Scholarships Available"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl text-center hover:shadow-2xl transition-all">
                <div className="text-red-600 mx-auto w-fit mb-4">{item.icon}</div>
                <h4 className="font-semibold text-lg md:text-xl">{item.title}</h4>
                <p className="text-gray-600 mt-2 text-base">{item.desc}</p>
                <p className="text-sm text-red-600 mt-1 font-medium">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Why Choose MEC - Compact & Responsive */}
          <div className="mt-20 md:mt-24">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">Why Students Choose MEC</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Affordable fee structure with high quality education",
                "Excellent scholarship opportunities through Waqf Board & Govt schemes",
                "Experienced faculty with industry exposure",
                "State-of-the-art labs and infrastructure",
                "Focus on practical & industry-oriented learning",
                "Strong placement record",
                "Safe campus with hostel facilities",
                "Holistic development through clubs & activities"
              ].map((reason, i) => (
                <div key={i} className="flex gap-4 bg-white border border-gray-100 hover:border-red-200 p-6 rounded-2xl transition-all group">
                  <div className="text-red-600 text-2xl font-bold mt-0.5 group-hover:scale-110 transition">✓</div>
                  <p className="text-[17px] leading-relaxed text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="mt-20 md:mt-24 bg-gray-50 rounded-3xl p-8 md:p-16">
            <h3 className="text-3xl font-bold text-center mb-10">How To Apply</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { step: "01", title: "Register", desc: "Basic Details" },
                { step: "02", title: "Upload Docs", desc: "Marksheets & ID" },
                { step: "03", title: "Pay Fee", desc: "₹500 Only" },
                { step: "04", title: "Submit", desc: "Get Confirmation" }
              ].map((item) => (
                <div key={item.step} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                  <div className="w-11 h-11 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 mt-1 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 md:mt-20 text-center bg-white border border-red-100 rounded-3xl p-10 md:p-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Secure Your Seat Today</h3>
            <p className="text-gray-600 text-lg mb-8">Admissions are open and filling fast</p>

            <a
              href="https://mecw-admission.vercel.app/#admission"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-red-600 hover:bg-red-700 text-white text-xl md:text-2xl font-bold rounded-2xl transition-all hover:scale-105"
            >
              Apply Now →
            </a>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-base">
              <div className="flex items-center gap-3">
                <Phone className="text-red-600" size={22} /> 
                <span><strong>+91-9588356609</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-red-600" size={22} /> 
                <span>+91-9990112185</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

  // ==================== STATIC SECTIONS WITH RICH DATA ====================
  const staticSections: Record<string, { title: string; content: JSX.Element }> = {
   procedure: {
  title: 'Admission Procedure',
  content: (
    <div className="max-w-5xl mx-auto px-4 space-y-16">
      {/* Hero Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full font-medium mb-6 shadow-lg text-sm">
          <Clock className="w-5 h-5" /> 8 Simple Steps
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Your Journey to <span className="text-red-600">Excellence</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          Smooth, transparent and student-friendly admission process
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-red-200 to-red-300" />

        <div className="space-y-10 md:space-y-14">
          {[
            { 
              no: "01", 
              title: "Download Application Form", 
              desc: "From website or Admission Cell", 
              highlight: "Instant Download" 
            },
            { 
              no: "02", 
              title: "Fill Personal & Academic Details", 
              desc: "Accurate information required", 
              highlight: "Easy Online Form" 
            },
            { 
              no: "03", 
              title: "Attach Required Documents", 
              desc: "10th, 12th, JEE, ID & Photos", 
              highlight: "Self-Attested" 
            },
            { 
              no: "04", 
              title: "Pay Application Fee", 
              desc: "₹500 through Online / UPI / DD", 
              highlight: "Non-Refundable" 
            },
            { 
              no: "05", 
              title: "Submit Your Application", 
              desc: "Online or email at info@mecw.ac.in", 
              highlight: "Quick Processing" 
            },
            { 
              no: "06", 
              title: "Counseling & Merit List", 
              desc: "JEE Main or Institute Counseling", 
              highlight: "Merit Based" 
            },
            { 
              no: "07", 
              title: "Fee Payment & Seat Confirmation", 
              desc: "Pay within deadline to confirm seat", 
              highlight: "Secure Your Seat" 
            },
            { 
              no: "08", 
              title: "Document Verification & Enrollment", 
              desc: "Visit campus with original documents", 
              highlight: "Welcome to MEC" 
            },
          ].map((step, i) => (
            <div 
              key={i} 
              className={`group relative bg-white border border-gray-100 hover:border-red-300 rounded-3xl p-6 md:p-8 transition-all hover:shadow-xl ${i % 2 === 0 ? 'md:pr-20' : 'md:pl-20'}`}
            >
              {/* Step Number */}
              <div className="absolute -top-5 -left-5 md:left-auto md:-right-5 w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform z-10">
                {step.no}
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="flex-1 pt-1">
                  <h4 className="text-2xl font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 mt-2 text-[16px] leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="mt-4 text-sm font-medium inline-block bg-red-50 text-red-700 px-4 py-2 rounded-2xl">
                    {step.highlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
   
   

      {/* Eligibility + Important Notes */}
      <div className="grid lg:grid-cols-5 gap-10">
        {/* Main Eligibility */}
        <div className="lg:col-span-3 bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Target className="w-9 h-9" />
            </div>
            <h3 className="text-4xl font-bold">Eligibility Criteria</h3>
          </div>
          
          <div className="space-y-8 text-lg">
            <div className="flex gap-4">
              <div className="text-red-400 mt-1">★</div>
              <p>Passed 10+2 with Physics & Mathematics as compulsory subjects along with Chemistry / Biology / Biotechnology / Technical Vocational subject.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-red-400 mt-1">★</div>
              <p>Minimum 45% marks (40% for SC/ST/OBC candidates) in aggregate.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-red-400 mt-1">★</div>
              <p>Valid JEE Main 2026 score (preferred for B.Tech admission).</p>
            </div>
            <div className="flex gap-4">
              <div className="text-red-400 mt-1">★</div>
              <p>Age limit as per Gurugram University / HSTES guidelines.</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="lg:col-span-2 bg-white border border-red-100 rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Important Notes</h3>
          <ul className="space-y-6 text-[17px]">
            <li className="flex gap-4">
              <span className="text-red-600 font-bold text-xl">→</span>
              Incomplete applications will be rejected.
            </li>
            <li className="flex gap-4">
              <span className="text-red-600 font-bold text-xl">→</span>
              All admissions are provisional subject to document verification.
            </li>
            <li className="flex gap-4">
              <span className="text-red-600 font-bold text-xl">→</span>
              Fees once paid are non-refundable except caution money.
            </li>
            <li className="flex gap-4">
              <span className="text-red-600 font-bold text-xl">→</span>
              Original documents must be produced at the time of counseling.
            </li>
          </ul>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-16 text-center">
        <h3 className="text-4xl font-bold mb-4">Ready to Join MEC?</h3>
        <p className="text-xl opacity-90 mb-8">Take the first step towards a bright engineering career</p>
        <a href="/admission/apply" 
           className="inline-block px-12 py-5 bg-white text-red-700 font-semibold text-xl rounded-2xl hover:bg-gray-100 transition-all hover:scale-105">
          Apply Online Now →
        </a>
      </div>
    </div>
  ),
},

    programmes: {
  title: 'Programmes Offered',
  content: (
    <div className="max-w-6xl mx-auto px-4 space-y-16">
      {/* Hero Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-red-50 text-red-700 px-6 py-3 rounded-full font-medium mb-6">
          <Award className="w-6 h-6" /> AICTE Approved
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Future-Ready <span className="text-red-600">Engineering Programmes</span>
        </h2>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          Industry-aligned curriculum with excellent placements
        </p>
      </div>

      {/* B.Tech Programmes */}
      <div>
        <div className="flex items-end justify-between mb-10">
          <h3 className="text-4xl font-bold text-gray-900">B.Tech Programmes</h3>
          <div className="text-sm text-gray-500">4 Years • 8 Semesters</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Computer Science & Engineering",
              seats: "60",
              focus: "AI/ML, Data Science, Cloud, Cybersecurity",
              icon: "💻",
              color: "from-blue-500 to-cyan-500"
            },
            {
              name: "Electronics & Communication Engineering",
              seats: "30",
              focus: "IoT, VLSI, 5G, Embedded Systems",
              icon: "📡",
              color: "from-purple-500 to-violet-500"
            },
            {
              name: "Electrical & Electronics Engineering",
              seats: "60",
              focus: "Renewable Energy, EV, Smart Grid",
              icon: "⚡",
              color: "from-amber-500 to-orange-500"
            },
            {
              name: "Mechanical Engineering",
              seats: "60",
              focus: "Robotics, EV, CAD/CAM",
              icon: "🔧",
              color: "from-red-500 to-rose-500"
            },
            {
              name: "Civil Engineering",
              seats: "60",
              focus: "Smart Cities, Structural & Environmental",
              icon: "🏗️",
              color: "from-emerald-500 to-teal-500"
            }
          ].map((p, i) => (
            <div 
              key={i} 
              className="group bg-white border border-gray-100 hover:border-red-300 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${p.color}`} />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-4xl transition-transform group-hover:scale-110">{p.icon}</div>
                  <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-2xl text-sm font-semibold">
                    {p.seats} Seats
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                  {p.name}
                </h4>

                <p className="text-gray-600 mt-4 text-[15px] leading-relaxed">
                  {p.focus}
                </p>
              </div>

              <div className="border-t border-gray-100 px-8 py-4 bg-gray-50 text-sm flex justify-between items-center">
                <span className="text-gray-500">4 Years</span>
                <span className="text-red-600 font-medium group-hover:underline">Learn More →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vocational Programmes */}
      <div>
        <h3 className="text-4xl font-bold text-gray-900 mb-10">Vocational Programmes</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "B.Voc - Automobile Servicing", seats: "30", duration: "3 Years", desc: "EV & Modern Vehicle Technology" },
            { name: "B.Voc - Renewable Energy", seats: "30", duration: "3 Years", desc: "Solar, Wind & Green Technology" },
            { name: "D.Voc - Automobile Servicing", seats: "30", duration: "3 Years", desc: "Vehicle Repair & Maintenance" },
            { name: "D.Voc - Software Development", seats: "30", duration: "3 Years", desc: "Web, App & Software Engineering" },
          ].map((p, i) => (
            <div key={i} className="bg-white border hover:border-red-300 p-8 rounded-3xl hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase text-red-600">{p.name.startsWith('B.Voc') ? 'Undergraduate' : 'Diploma'}</span>
                  <h4 className="text-xl font-semibold mt-2 group-hover:text-red-700 transition-colors">{p.name}</h4>
                </div>
                <span className="text-3xl opacity-30">{p.name.includes('Automobile') ? '🚗' : '💻'}</span>
              </div>

              <p className="mt-5 text-gray-600 text-[15px]">{p.desc}</p>

              <div className="mt-6 flex justify-between text-sm">
                <div>
                  <span className="text-gray-500">Duration</span><br />
                  <span className="font-semibold">{p.duration}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500">Seats</span><br />
                  <span className="font-semibold text-red-600">{p.seats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose MEC */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-10 md:p-12">
        <h3 className="text-3xl font-bold text-center mb-10">Why Choose MEC Programmes?</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="text-red-500 text-4xl mb-3">01</div>
            <h4 className="font-semibold text-lg">Industry Oriented Curriculum</h4>
            <p className="text-gray-400 mt-2 text-sm">Practical & updated as per industry needs</p>
          </div>
          <div>
            <div className="text-red-500 text-4xl mb-3">02</div>
            <h4 className="font-semibold text-lg">Strong Placements</h4>
            <p className="text-gray-400 mt-2 text-sm">Dedicated placement cell with top recruiters</p>
          </div>
          <div>
            <div className="text-red-500 text-4xl mb-3">03</div>
            <h4 className="font-semibold text-lg">Experienced Faculty</h4>
            <p className="text-gray-400 mt-2 text-sm">Industry & research experienced teachers</p>
          </div>
        </div>
      </div>
    </div>
  ),
},

    scholarships: {
      title: 'Scholarships',
      content: (
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center">
            <h2 className="text-6xl font-bold">Scholarships & Financial Support</h2>
            <p className="text-2xl text-gray-600 mt-4">Making quality education accessible to all</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-red-700 text-white p-10">
              <h3 className="text-3xl font-bold">Haryana Waqf Board Scholarships</h3>
            </div>
            <div className="p-10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-lg">
                    <th className="pb-6">Scholarship</th>
                    <th className="pb-6">Eligibility</th>
                    <th className="pb-6">Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-lg">
                  {[
                    ["Dr. APJ Abdul Kalam", "Boys 80%+ | Girls 70%+", "100% Tuition Fee Waiver"],
                    ["Dr. A.R. Kidwai", "Boys 70%+ | Girls 60%+", "50% Fee Concession"],
                    ["Differently-Abled", "25% to 50% Disability", "50% – 100% Fee Waiver"],
                    ["Dr. Abdul Mubeen", "Orphan / Parent-less", "100% Fee Waiver"],
                    ["Single Girl Child", "Only Girl Child in Family", "100% Fee Waiver"],
                    ["Star of Mewat", "Top 3 PCM Students from Nuh", "100% Fee Waiver"]
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-red-50 transition-colors">
                      <td className="py-7 font-medium">{row[0]}</td>
                      <td className="py-7 text-gray-600">{row[1]}</td>
                      <td className="py-7 font-semibold text-green-600">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-3xl border">
              <h4 className="text-2xl font-bold mb-8 text-red-700">Government Scholarships</h4>
              <ul className="space-y-6 text-lg">
                <li>• Merit-cum-Means Scholarship (MOMA)</li>
                <li>• Pragati Scholarship (AICTE - Girls)</li>
                <li>• Saksham Scholarship (Differently-abled)</li>
                <li>• Post Matric Scholarship for SC/ST/OBC</li>
                <li>• National Scholarship Portal Schemes</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl border">
              <h4 className="text-2xl font-bold mb-8 text-red-700">Private & Institutional Support</h4>
              <ul className="space-y-6 text-lg">
                <li><strong>MET-SEED Scholarship</strong> – Merit Based</li>
                <li><strong>M3M Foundation</strong> – Up to ₹25,000 + Fee Rebate</li>
                <li><strong>Indian Oil Scholarship</strong></li>
                <li><strong>Islamic Development Bank Loan + Scholarship</strong></li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  };

  const current = staticSections[section || 'procedure'] || staticSections.procedure;

  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Admission" />
      <div className="container py-16">{current.content}</div>
    </Layout>
  );
};

export default AdmissionPage;
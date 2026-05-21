import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';
import { Calendar } from 'lucide-react';

const staticSections: Record<string, { title: string; content: JSX.Element }> = {
  

  'anti-ragging': {
  title: 'Anti Ragging Committee',
  content: (
    <div className="space-y-8">

      {/* TOP CARD */}
      <div className="relative p-8 bg-gradient-to-br from-red-50 via-white to-red-100 rounded-3xl shadow-xl border border-red-100 overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 blur-3xl opacity-30 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-300 blur-3xl opacity-30 rounded-full"></div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT IMAGE */}
          <div className="group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://res.cloudinary.com/dadqwaqis/image/upload/t_Flip/IMG-20260408-WA0015_pq1kyq.jpg"
              alt="Anti Ragging MEC"
              className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Zero Tolerance Towards Ragging
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Mewat Engineering College (MECW), under Haryana Waqf Board, strictly enforces
              a zero-tolerance policy against ragging. The institution ensures a safe,
              respectful, and inclusive campus environment for all students.
            </p>

            <p className="text-sm text-gray-600">
              As per UGC & AICTE norms, a dedicated Anti-Ragging Committee actively works
              to prevent any form of harassment and promotes a culture of dignity,
              equality, and mutual respect.
            </p>
          </div>

        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {[
          {
            title: "24/7 Monitoring",
            desc: "Continuous surveillance in hostels, classrooms, and campus areas to prevent any incidents."
          },
          {
            title: "Complaint System",
            desc: "Anonymous reporting mechanism ensuring student privacy and safety."
          },
          {
            title: "Immediate Action",
            desc: "Strict disciplinary action is taken against offenders without delay."
          },
          {
            title: "Awareness Programs",
            desc: "Regular orientation sessions and campaigns for freshers and seniors."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border border-red-100 shadow hover:shadow-xl transition group"
          >
            <h4 className="text-red-600 font-semibold text-lg group-hover:text-red-500">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

      {/* INFO + HELPLINE */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT INFO */}
        <div className="p-6 bg-white rounded-2xl border border-red-100 shadow space-y-4">

          <h4 className="text-lg font-semibold text-gray-800">
            Committee Responsibilities
          </h4>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Ensure ragging-free campus environment</li>
            <li>Monitor student behavior and interactions</li>
            <li>Handle complaints with confidentiality</li>
            <li>Coordinate with administration & hostel wardens</li>
            <li>Maintain discipline and student safety</li>
          </ul>

        </div>

        {/* RIGHT HELPLINE */}
        <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-lg flex flex-col justify-center">

          <h4 className="text-xl font-bold mb-2">
            Emergency Helpline
          </h4>

          <p className="text-sm opacity-90 mb-3">
            Students can report any ragging-related issue immediately through the helpline.
          </p>

          <p className="text-lg font-semibold">
            📞 +91-9588356609
          </p>

          <p className="text-xs mt-2 opacity-80">
            Available 24/7 for student safety & support
          </p>

        </div>

      </div>

      {/* BOTTOM NOTE */}
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-semibold">
          MECW is committed to providing a safe, respectful, and positive learning environment for every student.
        </p>
      </div>

    </div>
  )
},

  'flying-squad': {
  title: 'Flying Squad',
  content: (
    <div className="space-y-8">

      {/* TOP CARD */}
      <div className="relative p-8 bg-gradient-to-br from-red-50 via-white to-red-100 rounded-3xl shadow-xl border border-red-100 overflow-hidden">

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 blur-3xl opacity-30 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-300 blur-3xl opacity-30 rounded-full"></div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">

          <div className="group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://res.cloudinary.com/dadqwaqis/image/upload/t_Flip/IMG-20260408-WA0015_pq1kyq.jpg"
              alt="Flying Squad MEC"
              className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Ensuring Discipline & Safety
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              The Flying Squad at Mewat Engineering College (MECW) is a dedicated
              team responsible for maintaining discipline and ensuring a ragging-free,
              safe campus environment through continuous vigilance.
            </p>

            <p className="text-sm text-gray-600">
              Comprising experienced faculty members and administrative staff,
              the squad conducts surprise inspections and ensures that students
              feel secure in all areas of the campus.
            </p>
          </div>

        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Surprise Inspections", desc: "Regular and unannounced visits to hostels, classrooms, and campus zones." },
          { title: "Campus Monitoring", desc: "Active surveillance of sensitive areas including canteens and common spaces." },
          { title: "Immediate Response", desc: "Quick intervention and resolution of any reported or observed issues." },
          { title: "Coordination", desc: "Works closely with Anti-Ragging Committee and administration." }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-red-100 shadow hover:shadow-xl transition group">
            <h4 className="text-red-600 font-semibold text-lg group-hover:text-red-500">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* MEMBERS SECTION (NEW) */}
      <div className="p-6 bg-white rounded-2xl border border-red-100 shadow">

        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Flying Squad Members
        </h4>

        <div className="grid md:grid-cols-2 gap-4 text-sm">

          {[
            ["Mr. Shamshad Ali (AP, EEE)", "Proctor"],
            ["Mr. Nazim Ali (AP, ME)", "Assistant Proctor"],
            ["Mrs. Afzal Fatima (AP, Applied Sc.)", "Assistant Proctor"],
            ["Mr. Naseem Ahmad (AP, ECE)", "Assistant Proctor"],
            ["Mr. Mohd Iqbal (AP, ME)", "Assistant Proctor"],
            ["Mr. Mohd Shahid (AP, CSE)", "Assistant Proctor"],
            ["Mr. Nadeem A Khan (AP, CE)", "Assistant Proctor"],
            ["Ms. Shibli (AP, ECE)", "Assistant Proctor"],
            ["Mr. Mohd Zakir Hussain (JE, HWB)", "Assistant Proctor"],
            ["Ms. Naseema Ahmad (TA, ECE)", "Assistant Proctor"]
          ].map((member, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-red-100 bg-red-50 flex justify-between items-center hover:bg-red-100 transition"
            >
              <span className="text-gray-700">{member[0]}</span>
              <span className="text-red-600 font-semibold text-xs">
                {member[1]}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* INFO + ROLE */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="p-6 bg-white rounded-2xl border border-red-100 shadow space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Key Responsibilities
          </h4>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Conduct random checks across campus</li>
            <li>Maintain discipline and student safety</li>
            <li>Prevent ragging and misconduct</li>
            <li>Ensure hostel environment remains secure</li>
            <li>Assist students during emergencies</li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-lg flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-2">
            Active Surveillance System
          </h4>

          <p className="text-sm opacity-90">
            The Flying Squad operates round-the-clock vigilance to ensure that
            every student at MECW experiences a safe, disciplined, and stress-free campus life.
          </p>
        </div>

      </div>

      {/* BOTTOM NOTE */}
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-semibold">
          MECW Flying Squad ensures a secure, disciplined, and student-friendly campus environment at all times.
        </p>
      </div>

    </div>
  )
},

  clubs: {
  title: 'Student Clubs',
  content: (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          Explore Our Student Clubs
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          MECW offers a vibrant campus life through various student clubs that
          encourage creativity, innovation, teamwork, and leadership skills.
        </p>

        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
      </div>

      {/* CLUBS GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {[
          { name: 'Coding Club', icon: '💻' },
          { name: 'Robotics Club', icon: '🤖' },
          { name: 'Cultural Club', icon: '🎭' },
          { name: 'Literary Club', icon: '📖' },
          { name: 'Photography Club', icon: '📸' },
          { name: 'Debate Club', icon: '🎤' }
        ].map((club, i) => (
          <div
            key={club.name}
            className="group relative p-6 bg-white rounded-2xl border border-red-100 shadow-md 
            hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
            bg-gradient-to-br from-red-200/30 to-transparent transition duration-500"></div>

            {/* Icon */}
            <div className="relative text-4xl mb-3 group-hover:scale-110 transition duration-300">
              {club.icon}
            </div>

            {/* Title */}
            <h3 className="relative text-lg font-semibold text-red-600 group-hover:text-red-500 transition">
              {club.name}
            </h3>

            {/* Description */}
            <p className="relative text-sm text-gray-600 mt-2 leading-relaxed">
              A dynamic student-driven club focused on skill development, creativity,
              and innovation through regular workshops, competitions, and collaborative projects.
            </p>

            {/* Tags */}
            <div className="relative mt-4 flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full">Workshops</span>
              <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full">Events</span>
              <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full">Competitions</span>
            </div>

            {/* Bottom Line Animation */}
            <div className="mt-5 h-1 w-0 bg-gradient-to-r from-red-500 to-red-700 
            group-hover:w-20 transition-all duration-500 rounded-full"></div>

          </div>
        ))}

      </div>

      {/* BOTTOM NOTE */}
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-semibold">
          Join a club, explore your passion, and build skills beyond academics at MECW.
        </p>
      </div>

    </div>
  )
},

  sports: {
  title: 'Sports & Physical Activities',
  content: (
    <div className="space-y-8">

      {/* TOP SECTION */}
      <div className="relative p-8 bg-gradient-to-br from-red-50 via-white to-red-100 rounded-3xl shadow-xl border border-red-100 overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 blur-3xl opacity-30 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-300 blur-3xl opacity-30 rounded-full"></div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">

          {/* IMAGE */}
          <div className="group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://res.cloudinary.com/dadqwaqis/image/upload/t_Flip/IMG-20260408-WA0015_pq1kyq.jpg"
              alt="MEC Sports"
              className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Building Strength, Discipline & Team Spirit
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              Mewat Engineering College (MECW) strongly promotes physical fitness,
              teamwork, and sportsmanship. The institution provides a wide range of
              sports facilities to ensure the overall development of students.
            </p>

            <p className="text-sm text-gray-600">
              Students actively participate in intra-college and inter-college
              tournaments, fostering leadership, discipline, and competitive spirit.
            </p>
          </div>

        </div>
      </div>

      {/* SPORTS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {[
          { name: "Cricket", icon: "🏏" },
          { name: "Football", icon: "⚽" },
          { name: "Volleyball", icon: "🏐" },
          { name: "Basketball", icon: "🏀" },
          { name: "Badminton", icon: "🏸" },
          { name: "Athletics", icon: "🏃" },
          { name: "Table Tennis", icon: "🏓" },
          { name: "Gym Facilities", icon: "💪" }
        ].map((sport, i) => (
          <div
            key={i}
            className="group p-5 bg-white rounded-2xl border border-red-100 shadow-md 
            hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition">
              {sport.icon}
            </div>

            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-red-600">
              {sport.name}
            </h4>
          </div>
        ))}

      </div>

      {/* EXTRA INFO */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="p-6 bg-white rounded-2xl border border-red-100 shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Facilities Available
          </h4>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Outdoor sports grounds</li>
            <li>Indoor game facilities</li>
            <li>Modern gymnasium</li>
            <li>Sports equipment support</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-lg flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-2">
            Competitive Environment
          </h4>

          <p className="text-sm opacity-90">
            Regular tournaments, inter-college competitions, and annual sports
            events help students build confidence, teamwork, and leadership skills.
          </p>
        </div>

      </div>

      {/* BOTTOM NOTE */}
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-semibold">
          MECW promotes a balanced lifestyle by integrating academics with physical fitness and sports excellence.
        </p>
      </div>

    </div>
  )
},

  'women-cell': {
  title: 'Women Cell',
  content: (
    <div className="space-y-8">

      {/* TOP SECTION */}
      <div className="relative p-8 bg-gradient-to-br from-red-50 via-white to-red-100 rounded-3xl shadow-xl border border-red-100 overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 blur-3xl opacity-30 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-300 blur-3xl opacity-30 rounded-full"></div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">

          {/* IMAGE */}
          <div className="group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://res.cloudinary.com/dadqwaqis/image/upload/t_Flip/IMG-20260408-WA0015_pq1kyq.jpg"
              alt="Women Cell MEC"
              className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Empowering Women, Ensuring Safety
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              The Women Cell at Mewat Engineering College (MECW) is committed to
              fostering a safe, inclusive, and empowering environment for female
              students and staff. It ensures dignity, equality, and respect for all.
            </p>

            <p className="text-sm text-gray-600">
              The cell actively works on awareness, safety, and personal development,
              helping women grow confidently in both academic and professional spaces.
            </p>
          </div>

        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {[
          {
            title: "Gender Sensitization",
            desc: "Workshops and sessions promoting equality, respect, and awareness."
          },
          {
            title: "Self-Defense Training",
            desc: "Practical training sessions to build confidence and personal safety skills."
          },
          {
            title: "Confidential Support",
            desc: "Safe and private grievance redressal system for students."
          },
          {
            title: "Career Guidance",
            desc: "Mentorship and counseling for academic and professional growth."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border border-red-100 shadow hover:shadow-xl transition group"
          >
            <h4 className="text-red-600 font-semibold text-lg group-hover:text-red-500">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

      {/* INFO + SUPPORT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="p-6 bg-white rounded-2xl border border-red-100 shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Key Responsibilities
          </h4>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Ensure safety and security of female students</li>
            <li>Promote awareness on women’s rights</li>
            <li>Handle complaints confidentially</li>
            <li>Organize empowerment programs</li>
            <li>Provide emotional and career support</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-lg flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-2">
            Safe & Supportive Environment
          </h4>

          <p className="text-sm opacity-90">
            MECW ensures that every female student feels safe, respected, and
            empowered to achieve her goals without any fear or discrimination.
          </p>
        </div>

      </div>

      {/* BOTTOM NOTE */}
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-semibold">
          A safe campus is the foundation of success — MECW stands for dignity, equality, and empowerment.
        </p>
      </div>

    </div>
  )
},


};

const ResourcesPage = () => {
  const { section } = useParams();
  const [events, setEvents] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    if (section === 'events') {
      const unsub = subscribeToData('events', setEvents);
      return () => unsub();
    }
    if (section === 'news') {
      const unsub = subscribeToData('news', setNews);
      return () => unsub();
    }
  }, [section]);

  if (section === 'events') {
    return (
      <Layout>
        <PageBanner title="Events" subtitle="Resources" />
        <div className="container py-12">
          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {events.map(e => (
                <div key={e.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  {e.imageUrl && <img src={e.imageUrl} alt={e.title} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><Calendar size={12} />{e.date}</div>
                    <h3 className="font-heading text-lg text-primary">{e.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Events will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  if (section === 'news') {
    return (
      <Layout>
        <PageBanner title="News" subtitle="Resources" />
        <div className="container py-12 max-w-3xl">
          {news.length > 0 ? (
            <div className="space-y-6">
              {news.map(n => (
                <div key={n.id} className="bg-card border border-border rounded-lg p-5">
                  <div className="text-xs text-muted-foreground mb-1">{n.date}</div>
                  <h3 className="font-heading text-xl text-primary">{n.title}</h3>
                  <p className="text-muted-foreground mt-2">{n.content}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">News will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  const current = staticSections[section || 'anti-ragging'] || staticSections['anti-ragging'];
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Resources" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default ResourcesPage;

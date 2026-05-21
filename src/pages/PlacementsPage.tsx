import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const sections: Record<string, { title: string; content: JSX.Element }> = {

  // ================= TRAINING =================
  training: {
  title: 'Training & Activities',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Training & Activities
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          We build industry-ready professionals through hands-on learning,
          real-world exposure, and continuous skill development programs.
        </p>
      </div>

      {/* ===== HERO CARD ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white shadow-2xl overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <h3 className="text-2xl font-bold mb-3">Industry-Focused Training</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Our training programs are designed to bridge the gap between academics and industry.
          Students gain real-time experience, build confidence, and develop problem-solving skills 
          required in corporate environments.
        </p>
      </div>

      {/* ===== IMAGE GRID ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
          "https://images.unsplash.com/photo-1584697964192-4b1c9f3a8b8b",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
          "https://images.unsplash.com/photo-1552664730-d307ca884978"
        ].map((img, i) => (
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img 
              src={img} 
              className="h-52 w-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition duration-500"
            />
          </div>
        ))}
      </div>

      {/* ===== TRAINING MODULES ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Aptitude & Logical Reasoning", "Sharpen problem-solving and analytical thinking."],
          ["Soft Skills Development", "Improve communication, leadership & confidence."],
          ["Technical Bootcamps", "Hands-on coding, real-world projects & tools."],
          ["Mock Interviews", "Prepare with real interview simulations."],
          ["Resume Building", "Create professional resumes & LinkedIn profiles."],
          ["Industry Sessions", "Learn directly from experts & corporate leaders."]
        ].map((item, i) => (
          <div 
            key={i} 
            className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <h4 className="font-semibold text-red-600 text-lg mb-2">
              ✔ {item[0]}
            </h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["1500+", "Students Trained"],
          ["75+", "Workshops Conducted"],
          ["95%", "Placement Support"]
        ].map((x, i) => (
          <div 
            key={i} 
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-center shadow-xl relative overflow-hidden">

        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

        <h3 className="text-xl font-semibold">Training & Placement Cell</h3>
        <p className="text-sm mt-3 opacity-90">
          Get expert guidance, career support, and placement assistance.
        </p>

        <div className="mt-4 text-sm">
          <p><strong>Mr. Naseem Ahmed</strong></p>
          <p>📞 +91-8569803605</p>
          <p>📧 tpo@mecw.ac.in</p>
        </div>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Contact Now
        </button>
      </div>

    </div>
  )
},

  // ================= JOB FAIR =================
  "job-fair": {
  title: 'Job Fair',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Mega Job Fair
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          A gateway to career opportunities where top companies meet talented students.
        </p>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white shadow-2xl overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <h3 className="text-2xl font-bold mb-3">Direct Hiring Platform</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Our Job Fair connects students directly with recruiters from top companies.
          Participate in real-time hiring processes, interviews, and networking sessions
          that open doors to exciting career opportunities.
        </p>

      </div>

      {/* ===== IMAGE GRID ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1552664730-d307ca884978",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44",
          "https://images.unsplash.com/photo-1584697964192-4b1c9f3a8b8b",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6"
        ].map((img, i) => (
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img
              src={img}
              className="h-52 w-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition duration-500"
            />
          </div>
        ))}
      </div>

      {/* ===== FEATURES ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["Live Hiring Drives", "On-the-spot interviews & instant selection chances"],
          ["Corporate Networking", "Interact with HRs, mentors & industry leaders"],
          ["Career Acceleration", "Kickstart your professional journey with top firms"]
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <h4 className="text-red-600 font-semibold text-lg mb-2">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["100+", "Recruiting Companies"],
          ["3000+", "Students Participated"],
          ["1200+", "Offers Made"]
        ].map((x, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-center shadow-xl overflow-hidden">

        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Don’t Miss Your Opportunity</h3>
        <p className="text-sm mt-3 opacity-90">
          Register now and grab your chance to get hired by top recruiters.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Register Now
        </button>

      </div>

    </div>
  )
},

  // ================= CALENDAR =================
  calendar: {
  title: 'Placement Calendar',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Placement Calendar
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          A structured roadmap designed to prepare students step-by-step for successful placements.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white shadow-2xl overflow-hidden">

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <h3 className="text-2xl font-bold mb-3">Your Journey to Placement Success</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Our placement calendar ensures continuous preparation with a balanced approach 
          of training, internships, and real hiring opportunities across the year.
        </p>
      </div>

      {/* ===== TIMELINE ===== */}
      <div className="relative border-l-4 border-red-200 pl-6 space-y-10">

        {[
          ["Jan – Feb", "Foundation Training", "Aptitude, communication & technical basics strengthening"],
          ["Mar – Apr", "Mock Interviews & Resume", "Interview practice, resume building & GD sessions"],
          ["May – July", "Internship Drive", "Hands-on industry exposure through internships"],
          ["Aug – Sept", "Placement Preparation", "Company-specific training & advanced coding sessions"],
          ["Oct – Dec", "Final Placement Drive", "Mass hiring drives & final job offers"]
        ].map((item, i) => (
          <div key={i} className="relative group">

            {/* Dot */}
            <div className="absolute -left-4 top-2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-md group-hover:scale-125 transition"></div>

            {/* Card */}
            <div className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <h4 className="text-red-600 font-semibold text-lg">{item[0]}</h4>
              <h5 className="font-bold text-gray-800">{item[1]}</h5>
              <p className="text-sm text-gray-500 mt-1">{item[2]}</p>
            </div>

          </div>
        ))}

      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["12 Months", "Continuous Training"],
          ["500+", "Mock Interviews"],
          ["Top MNCs", "Hiring Partners"]
        ].map((x, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-center shadow-xl overflow-hidden">

        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Stay On Track for Your Dream Job</h3>
        <p className="text-sm mt-3 opacity-90">
          Follow our structured calendar and maximize your placement success rate.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          View Full Schedule
        </button>

      </div>

    </div>
  )
},

  // ================= POLICIES =================
  policies: {
  title: 'Placement Policies',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Placement Policies
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Clear, transparent, and fair guidelines to ensure equal opportunities for all students.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white shadow-2xl overflow-hidden">

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <h3 className="text-2xl font-bold mb-3">Fair & Transparent Placement Process</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Our placement policies are designed to maintain fairness, discipline, and professionalism.
          Every student gets an equal opportunity to secure the best possible job based on merit and performance.
        </p>
      </div>

      {/* ===== MAIN POLICY CARD ===== */}
      <div className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-xl transition">
        <h4 className="text-red-600 font-semibold text-lg mb-2">
          ✔ One Student One Job Policy
        </h4>
        <p className="text-sm text-gray-500">
          Once a student secures a job offer, they are not allowed to participate in further placement drives,
          ensuring equal opportunity distribution among all candidates.
        </p>
      </div>

      {/* ===== POLICY LIST ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Minimum Eligibility", "Students must maintain at least 60% academic performance throughout."],
          ["Training Requirement", "Participation in all training sessions is mandatory for placement eligibility."],
          ["Professional Conduct", "Students must maintain discipline, punctuality, and formal behavior."],
          ["Offer Acceptance", "Selected students must submit their offer letter to the placement cell."],
          ["Attendance Rule", "Absence during drives without valid reason may lead to disqualification."],
          ["Documentation", "All academic and ID documents must be verified before participation."]
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <h4 className="text-red-600 font-semibold text-lg mb-2">
              ✔ {item[0]}
            </h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== HIGHLIGHTS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["100%", "Fair Selection Process"],
          ["Zero Bias", "Equal Opportunity"],
          ["Strict Rules", "Professional Environment"]
        ].map((x, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-center shadow-xl overflow-hidden">

        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Follow Guidelines, Secure Your Future</h3>
        <p className="text-sm mt-3 opacity-90">
          Adhering to placement policies increases your chances of success in recruitment drives.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Read Full Policy
        </button>

      </div>

    </div>
  )
},

  // ================= RECRUITERS =================
  recruiters: {
  title: 'Our Recruiters',
  content: (
    <div className="space-y-16 text-center">

      {/* ===== HEADER ===== */}
      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Our Recruiters
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Top companies trust our students and hire them every year across multiple domains.
        </p>
      </div>

      {/* ===== LOGO GRID ===== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {[
          {name:"TCS", logo:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Tata_Consultancy_Services_Logo.svg"},
          {name:"Infosys", logo:"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"},
          {name:"Wipro", logo:"https://upload.wikimedia.org/wikipedia/commons/0/01/Wipro_Primary_Logo_Color_RGB.svg"},
          {name:"HCL", logo:"https://upload.wikimedia.org/wikipedia/commons/5/5e/HCL_Technologies_logo.svg"},
          {name:"IBM", logo:"https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"},
          {name:"Accenture", logo:"https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg"},
          {name:"Capgemini", logo:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg"},
          {name:"L&T", logo:"https://upload.wikimedia.org/wikipedia/commons/6/6e/Larsen_%26_Toubro_Logo.svg"},
          {name:"Reliance", logo:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Reliance_Industries_Logo.svg"},
          {name:"Tech Mahindra", logo:"https://upload.wikimedia.org/wikipedia/commons/5/5a/Tech_Mahindra_New_Logo.svg"}
        ].map((c, i) => (

          <div
            key={i}
            className="group p-6 bg-white rounded-2xl border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col items-center justify-center space-y-3"
          >

            {/* Logo */}
            <img
              src={c.logo}
              alt={c.name}
              className="h-10 object-contain grayscale group-hover:grayscale-0 transition duration-300"
            />

            {/* Name */}
            <p className="text-sm font-semibold text-gray-600 group-hover:text-red-600 transition">
              {c.name}
            </p>

          </div>

        ))}

      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["100+", "Recruiting Partners"],
          ["5000+", "Students Placed"],
          ["Top MNCs", "Global Opportunities"]
        ].map((x, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-xl overflow-hidden">

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Become a Hiring Partner</h3>
        <p className="text-sm mt-3 opacity-90">
          Join our network of recruiters and hire talented, industry-ready students.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Partner With Us
        </button>

      </div>

    </div>
  )
},

  // ================= CONFERENCES =================
  conferences: {
  title: 'Conferences & Seminars',
  content: (
    <div className="space-y-16 text-center">

      {/* ===== HEADER ===== */}
      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Conferences & Seminars
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Gain industry insights, connect with experts, and explore the latest trends through our
          interactive seminars and conferences.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white shadow-2xl overflow-hidden">

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <h3 className="text-2xl font-bold mb-3">Learn from Industry Leaders</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Our conferences and seminars bring together top professionals, innovators, and educators.
          Students get exposure to real-world knowledge, emerging technologies, and career guidance.
        </p>

      </div>

      {/* ===== IMAGE SHOWCASE ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44",
          "https://images.unsplash.com/photo-1584697964192-4b1c9f3a8b8b",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
          "https://images.unsplash.com/photo-1552664730-d307ca884978"
        ].map((img, i) => (
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img
              src={img}
              className="h-52 w-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition duration-500"
            />
          </div>
        ))}
      </div>

      {/* ===== EVENT FEATURES ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["Expert Talks", "Learn directly from industry professionals & leaders"],
          ["Tech Conferences", "Explore innovations, AI, development & future trends"],
          ["Interactive Sessions", "Q&A, networking & live discussions with experts"]
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <h4 className="text-red-600 font-semibold text-lg mb-2">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["50+", "Events Organized"],
          ["100+", "Guest Speakers"],
          ["5000+", "Student Participation"]
        ].map((x, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-xl overflow-hidden">

        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Join Our Upcoming Events</h3>
        <p className="text-sm mt-3 opacity-90">
          Stay updated with the latest seminars, workshops, and conferences.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Explore Events
        </button>

      </div>

    </div>
  )
},
  // ================= ALUMNI =================
 alumni: {
  title: 'Alumni Testimonials',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Alumni Testimonials
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Hear from our successful alumni who have built their careers with top organizations.
        </p>
      </div>

      {/* ===== TESTIMONIAL GRID ===== */}
      <div className="grid md:grid-cols-2 gap-8">

        {[
          {
            name: "Rahul Sharma",
            role: "Software Engineer",
            company: "TCS",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "The training and placement support helped me crack my first job. The mock interviews were extremely useful."
          },
          {
            name: "Neha Verma",
            role: "Frontend Developer",
            company: "Infosys",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "The environment here pushed me to improve my communication and technical skills."
          },
          {
            name: "Amit Singh",
            role: "Project Engineer",
            company: "L&T",
            img: "https://randomuser.me/api/portraits/men/65.jpg",
            text: "Hands-on workshops and internships gave me real industry exposure."
          },
          {
            name: "Priya Khan",
            role: "Software Developer",
            company: "Wipro",
            img: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "The placement team guided me throughout the process and boosted my confidence."
          },
          {
            name: "Arjun Mehta",
            role: "Business Analyst",
            company: "Reliance",
            img: "https://randomuser.me/api/portraits/men/76.jpg",
            text: "Networking sessions and seminars helped me understand industry expectations."
          },
          {
            name: "Sana Ali",
            role: "Consultant",
            company: "Accenture",
            img: "https://randomuser.me/api/portraits/women/12.jpg",
            text: "Resume building sessions and interview practice made a huge difference."
          }
        ].map((a, i) => (

          <div
            key={i}
            className="group p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* Top Section */}
            <div className="flex items-center space-x-4 mb-4">

              <img
                src={a.img}
                className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
              />

              <div className="text-left">
                <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition">
                  {a.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {a.role} @ <span className="font-medium text-red-500">{a.company}</span>
                </p>
              </div>

            </div>

            {/* Quote */}
            <p className="text-sm text-gray-600 italic leading-relaxed">
              “{a.text}”
            </p>

            {/* Rating */}
            <div className="mt-4 text-yellow-400 text-lg">
              ⭐⭐⭐⭐⭐
            </div>

          </div>

        ))}

      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["5000+", "Alumni Network"],
          ["Top MNCs", "Working Worldwide"],
          ["95%", "Career Success Rate"]
        ].map((x, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition"
          >
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-center shadow-xl overflow-hidden">

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Join Our Successful Alumni Network</h3>
        <p className="text-sm mt-3 opacity-90">
          Be the next success story and start your journey towards a great career.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Get Started
        </button>

      </div>

    </div>
  )
}

};

const PlacementsPage = () => {
  const { section } = useParams();
  const current = sections[section || 'training'] || sections.training;

  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Placements" />
      <div className="container py-12 max-w-5xl mx-auto">
        {current.content}
      </div>
    </Layout>
  );
};

export default PlacementsPage;
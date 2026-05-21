import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const staticSections: Record<string, { title: string; content: JSX.Element }> = {
  hostel: {
  title: 'Hostel',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Hostel Facilities
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Safe, comfortable and well-equipped hostel facilities designed for academic focus and personal growth.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>
        <p className="leading-relaxed text-sm">
          Hostel life is an important part of student life. MECW provides well-organized hostel facilities 
          with separate buildings for boys and girls, ensuring discipline, comfort, and a balanced lifestyle. 
          The campus is fully Wi-Fi enabled and includes a nearby mosque for daily prayers.
        </p>
      </div>

      {/* ===== IMAGE GALLERY ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
        ].map((img,i)=>(
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img src={img} className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"/>
          </div>
        ))}
      </div>

      {/* ===== CONTACT ===== */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-red-600 font-semibold text-lg mb-2">Provost</h3>
          <p className="text-sm text-gray-600">
            <strong>Mr. Mohd Iqbal</strong><br/>
            📞 +91-8818044945<br/>
            📧 iqbalkhan83@gmail.com
          </p>
        </div>

        <div className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-red-600 font-semibold text-lg mb-2">Dy. Warden (Boys)</h3>
          <p className="text-sm text-gray-600">
            <strong>Mr. Mohd Umar Khan</strong><br/>
            📞 +91-6392095781<br/>
            📧 mukhan.lko@gmail.com
          </p>
        </div>

      </div>

      {/* ===== FACILITIES ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Furnished Rooms", "Each room includes bed, study table, chair & cupboard"],
          ["24/7 Utilities", "Electricity, water supply & RO drinking water"],
          ["Mess Facility", "Breakfast, lunch, high tea & dinner provided"],
          ["Wi-Fi Campus", "High-speed internet available"],
          ["Clean Washrooms", "Maintained hygiene and sanitation"],
          ["Recreation", "Common rooms for relaxation & activities"]
        ].map((item,i)=>(
          <div key={i} className="p-5 bg-white border border-red-100 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
            <h4 className="text-red-600 font-semibold">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== RULES ===== */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600">Hostel Rules</h3>

        {[
          "Students must stay in allotted rooms and cannot change without permission.",
          "Room allotment will be cancelled if not occupied within given time.",
          "All hostel dues must be cleared on time to avoid cancellation.",
          "Wardens have authority to inspect rooms for safety and discipline.",
          "Students may be shifted to other rooms if required administratively.",
          "Proper formalities must be completed before vacating hostel."
        ].map((rule,i)=>(
          <div key={i} className="p-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition">
            ✔ {rule}
          </div>
        ))}

      </div>

      {/* ===== ANTI RAGGING ===== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-700 to-red-600 text-white shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Anti-Ragging Policy</h3>
        <p className="text-sm opacity-90">
          Ragging is strictly prohibited in the hostel and campus. As per Supreme Court guidelines,
          ragging is a criminal offense. MECW ensures strict action against any violation to maintain
          safety, dignity, and discipline.
        </p>
      </div>

    </div>
  )
},

'life-skill': {
  title: 'Life Skill & Communication',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Life Skills & Communication
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Building confident, responsible, and industry-ready individuals through continuous personality and communication development.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <p className="text-sm leading-relaxed">
          The faculty members of Mewat Engineering College are deeply committed to empowering students 
          with essential life skills. Beyond academics, students are trained to handle real-life situations, 
          communicate effectively, and build a strong personal and professional identity. 
          These programs ensure that students not only succeed in their careers but also lead a balanced and confident life.
        </p>
      </div>

      {/* ===== IMAGE SECTION ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          "https://images.unsplash.com/photo-1552664730-d307ca884978",
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44"
        ].map((img,i)=>(
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img src={img} className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"/>
          </div>
        ))}
      </div>

      {/* ===== CORE SKILLS ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Public Speaking", "Develop confidence to present ideas clearly and effectively"],
          ["Personality Development", "Enhance attitude, confidence & positive mindset"],
          ["Group Discussions", "Practice corporate-level discussions and teamwork"],
          ["Interview Preparation", "Master HR & technical interview techniques"],
          ["Leadership Skills", "Build leadership qualities and decision-making ability"],
          ["Professional Communication", "Learn email writing, business communication & etiquette"]
        ].map((item,i)=>(
          <div key={i} className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <h4 className="text-red-600 font-semibold text-lg">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== ADVANCED MODULES ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["Emotional Intelligence", "Manage stress, emotions & interpersonal relationships"],
          ["Time Management", "Improve productivity and focus on goals"],
          ["Critical Thinking", "Enhance problem-solving and logical reasoning"]
        ].map((x,i)=>(
          <div key={i} className="p-6 bg-gradient-to-br from-white to-red-50 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-red-600 font-semibold">{x[0]}</h3>
            <p className="text-sm text-gray-500 mt-1">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["1000+", "Students Trained"],
          ["50+", "Workshops Conducted"],
          ["90%", "Confidence Growth"]
        ].map((x,i)=>(
          <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-white to-red-50 border shadow hover:shadow-xl transition">
            <h3 className="text-3xl font-bold text-red-600">{x[0]}</h3>
            <p className="text-gray-500 mt-2">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 to-red-600 text-white text-center shadow-xl overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Upgrade Your Personality & Skills</h3>
        <p className="text-sm mt-3 opacity-90">
          Join our life skill programs and become confident, career-ready, and future-focused.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Join Program
        </button>
      </div>

    </div>
  )
},

gymnasium: {
  title: 'Gymnasium',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Gymnasium
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          A modern fitness center designed to keep students physically active, mentally strong, and energized.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <p className="text-sm leading-relaxed">
          The MECW Gymnasium provides a healthy environment for students to maintain physical fitness 
          alongside academic excellence. Regular workouts improve focus, reduce stress, and build discipline, 
          helping students perform better in both studies and life.
        </p>
      </div>

      {/* ===== IMAGE GALLERY ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
          "https://images.unsplash.com/photo-1550345332-09e3ac987658",
          "https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
        ].map((img,i)=>(
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img src={img} className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"/>
          </div>
        ))}
      </div>

      {/* ===== FEATURES ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Modern Equipment", "Latest gym machines & advanced fitness tools"],
          ["Cardio Zone", "Treadmills, cycling, and endurance training area"],
          ["Strength Training", "Free weights and resistance machines"],
          ["Trainer Support", "Guidance from experienced fitness trainers"],
          ["Spacious Environment", "Clean and well-ventilated workout space"],
          ["Healthy Lifestyle", "Encouraging discipline and fitness habits"]
        ].map((item,i)=>(
          <div key={i} className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <h4 className="text-red-600 font-semibold text-lg">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== BENEFITS ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["Stress Relief", "Reduce academic stress and improve mental health"],
          ["Better Focus", "Enhance concentration and productivity"],
          ["Energy Boost", "Stay active and energetic throughout the day"]
        ].map((x,i)=>(
          <div key={i} className="p-6 bg-gradient-to-br from-white to-red-50 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-red-600 font-semibold">{x[0]}</h3>
            <p className="text-sm text-gray-500 mt-1">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== TIMINGS ===== */}
      <div className="p-6 bg-white border border-red-100 rounded-2xl shadow text-center">
        <h3 className="text-red-600 font-semibold text-lg">Gym Timings</h3>
        <p className="text-gray-500 text-sm mt-2">
          Morning: 6:00 AM – 9:00 AM <br/>
          Evening: 4:00 PM – 8:00 PM
        </p>
      </div>

      {/* ===== RULES ===== */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600">Gym Rules</h3>

        {[
          "Proper gym attire is mandatory.",
          "Maintain discipline and cleanliness inside the gym.",
          "Use equipment carefully and return after use.",
          "Follow trainer instructions strictly.",
          "Avoid overcrowding and respect others’ workout space."
        ].map((rule,i)=>(
          <div key={i} className="p-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition">
            ✔ {rule}
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 to-red-600 text-white text-center shadow-xl overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Stay Fit, Stay Strong</h3>
        <p className="text-sm mt-3 opacity-90">
          Join the gym and build a healthier, stronger version of yourself.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Join Gym
        </button>
      </div>

    </div>
  )
},

library: {
  title: 'Library',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Central Library
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          A modern knowledge hub empowering students with academic, research, and digital resources.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <p className="text-sm leading-relaxed">
          The Central Library at MECW is designed to support academic excellence and research innovation. 
          With a rich collection of books, journals, and digital resources, students gain access to 
          knowledge beyond classrooms. The library provides a peaceful and focused environment for 
          reading, learning, and research activities.
        </p>
      </div>

      {/* ===== IMAGE GALLERY ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
        ].map((img,i)=>(
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img src={img} className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"/>
          </div>
        ))}
      </div>

      {/* ===== CORE FEATURES ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["10,000+ Books", "Wide range of textbooks, references & academic materials"],
          ["Journals & Magazines", "Access to national & international publications"],
          ["Digital Library", "E-books, online journals & research databases"],
          ["Reading Hall", "Silent and comfortable study environment"],
          ["Research Support", "Resources for projects & innovation"],
          ["Wi-Fi Enabled", "High-speed internet for digital access"]
        ].map((item,i)=>(
          <div key={i} className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <h4 className="text-red-600 font-semibold text-lg">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== ADDITIONAL SERVICES ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["Book Issue System", "Easy borrowing & return process"],
          ["E-Learning Access", "Online study materials & video lectures"],
          ["Quiet Study Zones", "Dedicated silent areas for deep focus"]
        ].map((x,i)=>(
          <div key={i} className="p-6 bg-gradient-to-br from-white to-red-50 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-red-600 font-semibold">{x[0]}</h3>
            <p className="text-sm text-gray-500 mt-1">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== TIMINGS ===== */}
      <div className="p-6 bg-white border border-red-100 rounded-2xl shadow text-center">
        <h3 className="text-red-600 font-semibold text-lg">Library Timings</h3>
        <p className="text-gray-500 text-sm mt-2">
          Monday – Saturday: 9:00 AM – 6:00 PM <br/>
          Sunday: Closed
        </p>
      </div>

      {/* ===== RULES ===== */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600">Library Rules</h3>

        {[
          "Maintain complete silence inside the library.",
          "Carry valid ID card while entering.",
          "Books must be returned on time to avoid penalty.",
          "Handle books and resources carefully.",
          "Mobile phones should be kept on silent mode."
        ].map((rule,i)=>(
          <div key={i} className="p-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition">
            ✔ {rule}
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 to-red-600 text-white text-center shadow-xl overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Explore Knowledge Without Limits</h3>
        <p className="text-sm mt-3 opacity-90">
          Utilize our library resources and enhance your academic journey.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Visit Library
        </button>
      </div>

    </div>
  )
},

transport: {
  title: 'Transport',
  content: (
    <div className="space-y-16">

      {/* ===== HEADER ===== */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Transport Facility
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Reliable and safe transport services ensuring smooth daily commute for students and staff.
        </p>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

        <p className="text-sm leading-relaxed">
          MECW provides a well-organized transport system connecting nearby towns and villages.
          With safety measures, trained drivers, and punctual schedules, students experience a
          hassle-free and secure journey every day.
        </p>
      </div>

      {/* ===== IMAGE GALLERY ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
          "https://images.unsplash.com/photo-1504215680853-026ed2a45def"
        ].map((img,i)=>(
          <div key={i} className="overflow-hidden rounded-2xl group">
            <img src={img} className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"/>
          </div>
        ))}
      </div>

      {/* ===== FEATURES ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Wide Coverage", "Routes covering nearby cities, towns & villages"],
          ["Safety First", "GPS tracking & experienced drivers"],
          ["Comfortable Buses", "Clean, spacious & well-maintained vehicles"],
          ["On-Time Service", "Strict schedule for pickup & drop"],
          ["Affordable Plans", "Cost-effective transport facility"],
          ["Emergency Support", "Immediate assistance in case of need"]
        ].map((item,i)=>(
          <div key={i} className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <h4 className="text-red-600 font-semibold text-lg">{item[0]}</h4>
            <p className="text-sm text-gray-500">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== ROUTES INFO ===== */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          ["Nuh Route", "Daily buses covering Nuh and nearby areas"],
          ["Gurgaon Route", "Connectivity to Gurgaon region"],
          ["Local Villages", "Transport from surrounding rural areas"]
        ].map((x,i)=>(
          <div key={i} className="p-6 bg-gradient-to-br from-white to-red-50 border rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-red-600 font-semibold">{x[0]}</h3>
            <p className="text-sm text-gray-500 mt-1">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* ===== TIMINGS ===== */}
      <div className="p-6 bg-white border border-red-100 rounded-2xl shadow text-center">
        <h3 className="text-red-600 font-semibold text-lg">Transport Timings</h3>
        <p className="text-gray-500 text-sm mt-2">
          Morning Pickup: 7:00 AM – 9:00 AM <br/>
          Evening Drop: 3:00 PM – 5:30 PM
        </p>
      </div>

      {/* ===== RULES ===== */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600">Transport Rules</h3>

        {[
          "Students must carry valid ID while using transport.",
          "Maintain discipline and follow instructions of staff.",
          "Be punctual at pickup and drop points.",
          "Avoid damage to bus property.",
          "Respect fellow passengers and staff."
        ].map((rule,i)=>(
          <div key={i} className="p-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition">
            ✔ {rule}
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-red-700 to-red-600 text-white text-center shadow-xl overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-2xl rounded-full"></div>

        <h3 className="text-xl font-semibold">Travel Safe, Travel Smart</h3>
        <p className="text-sm mt-3 opacity-90">
          Register for transport services and enjoy a smooth daily commute.
        </p>

        <button className="mt-5 px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Apply for Transport
        </button>
      </div>

    </div>
  )
}
};


const CampusPage = () => {
  const { section } = useParams();
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    if (section === 'gallery') {
      const unsub = subscribeToData('gallery', setGallery);
      return () => unsub();
    }
  }, [section]);

  if (section === 'gallery') {
    return (
      <Layout>
        <PageBanner title="Photo Gallery" subtitle="Campus" />
        <div className="container py-12">
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map(g => (
                <div key={g.id} className="aspect-square rounded-lg overflow-hidden group">
                  <img src={g.imageUrl} alt={g.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          ) : <p className="text-center text-muted-foreground">Gallery images will appear once added by admin.</p>}
        </div>
      </Layout>
    );
  }

  const current = staticSections[section || 'hostel'] || staticSections.hostel;
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Campus" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default CampusPage;

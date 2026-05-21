import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const sections: Record<string, { title: string; content: JSX.Element }> = {
  'about-mec': {
  title: 'About MEC',
  content: (
    <div className="space-y-16">

      {/* HERO SECTION */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-black/70 z-10"></div>
        <img
          src="/images/mec-campus.jpg"
          alt="MEC Campus"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute z-20 inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to MEC
          </h1>
          <p className="text-gray-200 max-w-2xl mt-4">
            Knowledge grows when shared. MEC empowers students with innovation,
            education, and real-world skills for a better future.
          </p>
        </div>
      </div>

      {/* ABOUT TEXT */}
      <div className="max-w-5xl mx-auto text-center space-y-5">
        <p className="text-lg text-gray-700 leading-relaxed">
          Mewat Engineering College is one of the top engineering colleges in Haryana,
          focused on delivering high-quality education and shaping future engineers.
        </p>

        <p className="text-gray-600">
          Spread across 28 acres in Nuh, near Gurgaon & Delhi, the campus is surrounded
          by the scenic Aravalli Hills, offering a peaceful and pollution-free
          environment perfect for learning.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {[
          "Modern Labs",
          "Smart Classrooms",
          "Computer Centre",
          "Language Lab",
          "Central Library",
          "Wi-Fi Campus"
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition border border-red-100"
          >
            <h3 className="text-lg font-semibold text-red-600">
              {item}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              High-quality infrastructure designed for student excellence.
            </p>
          </div>
        ))}

      </div>

      {/* CAMPUS LIFE */}
      <div className="bg-gradient-to-r from-red-50 to-white p-8 rounded-3xl shadow-inner">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Campus Life
        </h2>

        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          MEC offers a complete student life experience with gymnasium,
          indoor & outdoor sports, hostel facilities, and a healthy environment
          that supports academic and personal growth.
        </p>
      </div>

      {/* WHY CHOOSE MEC */}
      <div>
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
          The MEC Advantage
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {[
            {
              title: "Affordable Hostel",
              desc: "₹40,000/year including food & lodging."
            },
            {
              title: "GATE Success",
              desc: "Students achieved AIR 51 in GATE."
            },
            {
              title: "100% Placement",
              desc: "Placement support for all eligible students."
            },
            {
              title: "Prime Location",
              desc: "Located in Delhi NCR, Nuh region."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        {/* Highlight Card */}
        <div className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-red-600 to-red-500 text-white text-center shadow-lg">
          <h3 className="text-2xl font-bold">
            Beautiful Campus & Infrastructure
          </h3>
          <p className="mt-2">
            Experience modern facilities at the foothills of Aravalli Range
            with a peaceful and inspiring learning environment.
          </p>
        </div>

      </div>

    </div>
  ),
},
 'vision': {
  title: 'Our Vision',
  content: (
    <div className="relative py-10">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      {/* Glow Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300/20 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">
            OUR VISION
          </h2>
          <p className="text-gray-500 mt-3">
            Shaping Future Innovators & Responsible Global Leaders
          </p>
        </div>

        {/* Glass Card */}
        <div className="p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl hover:shadow-red-200/50 transition duration-500">

          {/* Main Paragraph */}
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Strongly nourished by optimism, diligence, ingenuity, and a deep sense
            of responsibility, our vision is to create a purposeful global impact
            through excellence in technical education, research, and innovation.
            We aim to build a generation of engineers who not only excel in
            technology but also uphold strong ethical values and social responsibility.
          </p>

          {/* Divider */}
          <div className="w-28 h-1 bg-gradient-to-r from-red-500 to-red-400 mx-auto my-8 rounded-full"></div>

          {/* Vision Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Innovation Driven",
                desc: "Encouraging creativity, research, and problem-solving to develop cutting-edge solutions."
              },
              {
                title: "Global Impact",
                desc: "Preparing students to contribute to society at both national and international levels."
              },
              {
                title: "Ethical Leadership",
                desc: "Building leaders with integrity, responsibility, and strong moral values."
              },
              {
                title: "Academic Excellence",
                desc: "Maintaining high standards in teaching, learning, and continuous improvement."
              },
              {
                title: "Industry Ready",
                desc: "Equipping students with practical skills and real-world exposure."
              },
              {
                title: "Holistic Growth",
                desc: "Focusing on personal, professional, and intellectual development."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-red-100"
              >
                <h3 className="text-lg font-semibold text-red-600 group-hover:text-red-500 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

          {/* Bottom Highlight */}
          <div className="mt-10 text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
              Empowering Minds • Transforming Futures • Building Nation
            </div>
          </div>

        </div>

      </div>
    </div>
  ),
},
  'mission': {
  title: 'Our Mission',
  content: (
    <div className="relative py-10">

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      {/* Floating Glow Circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-300/20 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">
            OUR MISSION
          </h2>
          <p className="text-gray-500 mt-3">
            Driving Excellence in Education, Innovation & Social Responsibility
          </p>
        </div>

        {/* Glass Card */}
        <div className="p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl hover:shadow-red-200/50 transition duration-500">

          {/* Intro Line */}
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Our mission is to empower students with knowledge, skills, and values
            that align with global needs while fostering innovation, leadership,
            and a strong sense of responsibility towards society and humanity.
          </p>

          {/* Divider */}
          <div className="w-28 h-1 bg-gradient-to-r from-red-500 to-red-400 mx-auto my-8 rounded-full"></div>

          {/* Mission Points Grid */}
          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Global Vision",
                desc: "Identify global needs and emerging areas of specialization in collaboration with stakeholders."
              },
              {
                title: "Professional Excellence",
                desc: "Develop highly motivated engineers, entrepreneurs, and research-oriented professionals."
              },
              {
                title: "Innovative Learning",
                desc: "Implement modern teaching methodologies with strong focus on practical and skill-based learning."
              },
              {
                title: "Ethics & Values",
                desc: "Instill human values, integrity, and responsibility towards society and nation."
              },
              {
                title: "Industry Collaboration",
                desc: "Encourage partnerships with industries and research institutions for real-world exposure."
              },
              {
                title: "Societal Impact",
                desc: "Contribute to socio-economic development and create solutions for real-world challenges."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-red-100"
              >
                <h3 className="text-lg font-semibold text-red-600 group-hover:text-red-500 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

          {/* Bottom Highlight Badge */}
          <div className="mt-10 text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
              Learn • Innovate • Lead • Serve
            </div>
          </div>

        </div>

      </div>
    </div>
  ),
},
  'core-values': {
  title: 'Core Values',
  content: (
    <div className="relative py-10">

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      {/* Floating Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300/20 rounded-full blur-3xl"></div>

      {/* Container */}
      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">
            CORE VALUES
          </h2>
          <p className="text-gray-500 mt-3">
            The Foundation of Our Institution & Student Success
          </p>
        </div>

        {/* Glass Card */}
        <div className="p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl hover:shadow-red-200/50 transition duration-500">

          {/* Intro */}
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Our core values shape the culture, vision, and mission of our institution.
            They guide our actions, inspire our students, and define our commitment
            to excellence, innovation, and ethical responsibility.
          </p>

          {/* Divider */}
          <div className="w-28 h-1 bg-gradient-to-r from-red-500 to-red-400 mx-auto my-8 rounded-full"></div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Academic Integrity",
                desc: "We uphold honesty, transparency, and accountability in all academic and professional practices."
              },
              {
                title: "Respect & Growth",
                desc: "We respect students as future engineers and innovators, supporting their journey towards excellence."
              },
              {
                title: "Intellectual Excellence",
                desc: "We promote creativity, critical thinking, and continuous pursuit of knowledge."
              },
              {
                title: "Innovation & Creativity",
                desc: "Encouraging new ideas and fostering a culture of innovation in technology and research."
              },
              {
                title: "Ethics & Responsibility",
                desc: "Instilling strong moral values and a sense of duty towards society and the nation."
              },
              {
                title: "Continuous Improvement",
                desc: "We strive for constant growth, learning, and improvement in all areas."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-red-100"
              >
                <h3 className="text-lg font-semibold text-red-600 group-hover:text-red-500 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

          {/* Bottom Tagline */}
          <div className="mt-10 text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
              Integrity • Innovation • Excellence • Growth
            </div>
          </div>

        </div>

      </div>
    </div>
  ),
},
  'administrator-message': {
  title: "Administrator's Message",
  content: (
    <div className="relative py-12">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      {/* Floating Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-300/20 rounded-full blur-3xl"></div>

      {/* Container */}
      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">
            ADMINISTRATOR'S MESSAGE
          </h2>
        </div>

        {/* Main Card */}
        <div className="grid md:grid-cols-3 gap-8 items-center p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl hover:shadow-red-200/50 transition duration-500">

          {/* LEFT - IMAGE */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="/images/zakir-hussain.jpg"
                alt="Administrator"
                className="w-48 h-48 object-cover rounded-2xl shadow-lg border border-red-100"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-500/20 to-red-400/20"></div>
            </div>

            {/* Name & Role */}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Ch. Zakir Hussain
            </h3>
            <p className="text-sm text-gray-500">
              Administrator, Haryana Waqf Board
            </p>
          </div>

          {/* RIGHT - MESSAGE */}
          <div className="md:col-span-2 space-y-5 text-gray-700 leading-relaxed">

            {/* Quote */}
            <p className="italic text-red-600 text-lg border-l-4 border-red-500 pl-4">
              "Education is the most powerful weapon which you can use to change the world."
            </p>

            <p>
              Dear Parents/Students,
            </p>

            <p>
              I am extremely delighted to welcome you to Mewat Engineering College.
              India is a country where a majority of the population resides in rural areas,
              and we strongly believe that education is not just about skills, but about
              shaping individuals into responsible and capable human beings.
            </p>

            <p>
              The Haryana Waqf Board works towards the development and welfare of society,
              especially focusing on education for the Muslim community, while remaining
              open and inclusive to all. Our institution reflects this vision by providing
              equal opportunities to every student.
            </p>

            <p>
              We are committed to empowering underprivileged students through scholarships
              and support systems. A large percentage of our students come from economically
              weaker sections, and we take pride in helping them achieve their dreams
              through quality education and dedicated faculty.
            </p>

            <p>
              From a humble beginning of 225 students, we have grown to over 600 students,
              reflecting trust and progress. With a growing campus and future expansion
              plans, we aim to reach even greater heights.
            </p>

            <p>
              We welcome parents and students to visit our campus and experience our
              commitment to excellence. Together, with the support of all stakeholders,
              we will continue to grow and build a brighter future.
            </p>

            {/* Signature */}
            <div className="pt-4">
              <p className="font-semibold text-gray-800">Best Wishes,</p>
              <p className="text-red-600 font-bold">Ch. Zakir Hussain</p>
              <p className="text-sm text-gray-500">
                Administrator, Haryana Waqf Board
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  ),
},
  'ceo-message': {
  title: "CEO's Message",
  content: (
    <div className="relative py-12">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text mb-10">
          CEO'S MESSAGE
        </h2>

        {/* Card */}
        <div className="grid md:grid-cols-3 gap-8 items-center p-10 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-red-100 hover:shadow-red-200/50 transition duration-500">

          {/* LEFT - IMAGE + NAME */}
          <div className="text-center">
            <div className="relative">
              <img
                src="/images/ceo.jpg"
                className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg border border-red-100"
                alt="CEO"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-500/20 to-red-400/20"></div>
            </div>

            {/* Name */}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Mohammad Shayin IAS
            </h3>
            <p className="text-sm text-gray-500">
              CEO, Haryana Waqf Board
            </p>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="md:col-span-2 space-y-4 text-gray-700 leading-relaxed">

            {/* Quote */}
            <p className="italic text-red-600 border-l-4 border-red-500 pl-4">
              "Building future-ready engineers with values, vision, and innovation."
            </p>

            <p>
              I am extremely delighted to share that Mewat Engineering College
              has successfully completed a decade of excellence since its
              establishment in 2010. This institution is a unique initiative of
              the Haryana Waqf Board aimed at providing quality technical education.
            </p>

            <p>
              Our mission is to empower students with advanced knowledge,
              professional skills, and strong human values so they can contribute
              effectively to science, technology, and nation-building.
            </p>

            <p>
              Located near Delhi and Gurgaon, the college offers modern infrastructure,
              well-equipped laboratories, and excellent hostel facilities, making it
              comparable to top engineering institutions.
            </p>

            <p>
              We are continuously striving to elevate this institution into a center
              of excellence and invite students to be part of this journey towards
              success and innovation.
            </p>

            {/* Signature */}
            <div className="pt-4">
              <p className="font-semibold text-gray-800">Best Wishes,</p>
              <p className="text-red-600 font-bold text-lg"> Mohammad Shayin IAS</p>
              <p className="text-sm text-gray-500">
                CEO, Haryana Waqf Board
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  ),
},
  'director-message': {
  title: "Director's Message",
  content: (
    <div className="relative py-12">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text mb-10">
          DIRECTOR'S MESSAGE
        </h2>

        {/* Card */}
        <div className="grid md:grid-cols-3 gap-8 items-center p-10 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-red-100 hover:shadow-red-200/50 transition duration-500">

          {/* LEFT - IMAGE */}
          <div className="text-center">
            <div className="relative">
              <img
                src="/images/director.jpg"
                className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg border border-red-100"
                alt="Director"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-500/20 to-red-400/20"></div>
            </div>

            {/* Name */}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Prof. (Dr.) Khwaja M. Rafi
            </h3>
            <p className="text-sm text-gray-500">
              Director, MEC
            </p>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="md:col-span-2 space-y-4 text-gray-700 leading-relaxed">

            {/* Quote */}
            <p className="italic text-red-600 border-l-4 border-red-500 pl-4">
              "Excellence in education shapes the future of tomorrow."
            </p>

            <p>
              I am delighted to welcome prospective students to Mewat Engineering
              College (MEC), affiliated with Gurugram University, Govt. of Haryana.
              MEC aims to provide a professional education environment committed
              to excellence in teaching and learning.
            </p>

            <p>
              The college offers career-oriented courses designed in collaboration
              with industries and professional bodies, ensuring students gain
              real-world exposure and practical knowledge.
            </p>

            <p>
              MEC provides a perfect balance — large enough to offer diverse
              academic and cultural opportunities, yet small enough to ensure
              personal attention to every student.
            </p>

            <p>
              Our institute is equipped with state-of-the-art laboratories,
              modern infrastructure, smart classrooms, and sports facilities,
              supported by highly qualified and experienced faculty.
            </p>

            <p>
              We also take pride in supporting students from diverse backgrounds
              and economically weaker sections through various initiatives.
            </p>

            <p>
              I encourage all students to make the best use of the facilities
              available and wish them success in their academic journey.
            </p>

            {/* Signature */}
            <div className="pt-4">
              <p className="font-semibold text-gray-800">Best Wishes,</p>
              <p className="text-red-600 font-bold text-lg">
                Prof. (Dr.) Khwaja M. Rafi
              </p>
              <p className="text-sm text-gray-500">Director, MEC</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  ),
},
  'achievements': {
  title: 'Achievements',
  content: (
    <div className="relative py-12">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 blur-2xl opacity-60"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text mb-6">
          OUR ACHIEVEMENTS
        </h2>

        {/* Intro */}
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Mewat Engineering College has established itself as a reputed institution
          in engineering education through consistent achievements, awards, and
          academic excellence by its students.
        </p>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "GATE AIR 48",
              desc: "Mr. Dipanshu Garg (CSE, 2024) secured All India Rank 48 in GATE.",
              img: "/icons/trophy.png"
            },
            {
              title: "Competition Winner",
              desc: "Mr. Mujahid won 2nd Prize in Road Safety Competition, Rewari (Haryana).",
              img: "/icons/medal.png"
            },
            {
              title: "GATE AIR 51",
              desc: "Mr. Samran (EEE, 2017) secured All India Rank 51 in GATE.",
              img: "/icons/award.png"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-red-100"
            >

              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-red-50 shadow-sm mx-auto">
                <img src={item.img} alt="" className="w-8 h-8 object-contain" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-center text-red-600 group-hover:text-red-500 transition">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-600 text-sm mt-2 text-center leading-relaxed">
                {item.desc}
              </p>

              {/* Glow Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-red-100 to-transparent"></div>

            </div>
          ))}

        </div>

        {/* Bottom Tagline */}
        <div className="mt-12 text-center">
          <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg tracking-wide">
            Excellence • Recognition • Achievement
          </div>
        </div>

      </div>
    </div>
  ),
},
};

const AboutPage = () => {
  const { section } = useParams();
  const current = sections[section || 'about-mec'] || sections['about-mec'];
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="About Us" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default AboutPage;

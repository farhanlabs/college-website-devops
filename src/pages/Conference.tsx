import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBanner from '@/components/PageBanner';
import { Calendar, Download, Award, CreditCard } from 'lucide-react';

const Conference: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Top Banner - Using Your PageBanner Component */}
      <PageBanner 
        title="Conference" 
        subtitle="Online International Conference" 
      />

      {/* Hero Section - Red & White Theme (as per your reference) */}
      <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 text-sm font-medium border border-white/30">
            4th Edition • Online Mode
          </div>
         
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            4th ONLINE INTERNATIONAL CONFERENCE
          </h1>
         
          <h2 className="text-2xl md:text-3xl font-semibold text-red-100 leading-tight max-w-4xl mx-auto">
            On Recent Trends in Renewable Energy and Advancement in Engineering & Technology (RTREAET-2025)
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/20">
              19 - 20 March 2025
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/20">
              Online International Conference
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Brochure Cards */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <Download className="text-red-600" /> Conference Brochures
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: "2025", link: "/RTREAET-2025.pdf", label: "RTREAET-2025" },
              { year: "2023", link: "/RTREAET-2023.pdf", label: "RTREAET-2023" },
              { year: "2021", link: "/RTREAET-2021.pdf", label: "RTREAET-2021" },
              { year: "2020", link: "/RTREAET-2020.pdf", label: "RTREAET-2020" },
            ].map((item) => (
              <a
                key={item.year}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group bg-white border border-gray-200 hover:border-red-300 rounded-3xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  📘
                </div>
                <h4 className="font-semibold text-lg">{item.label}</h4>
                <p className="text-red-600 text-sm mt-1">Download PDF →</p>
              </a>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl shadow p-10 md:p-14">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">About RTREAET-2025</h3>
          <div className="prose text-gray-700 leading-relaxed text-[17px] max-w-none">
            Recent Trends in Renewable Energy and Advancement in Engineering & Technology (RTREAET-2025) aims to bring together leading academicians, scientists, researchers, research scholars, and industry personnel to exchange and share their experiences and research results about all aspects of renewable energy sources, engineering and technology.
            <br /><br />
            RTREAET-2025 plays a significant role in inspiring breakthrough innovations from fundamentals to technological challenges and applications that are shaping the era of Industry 4.0. The conference will provide a unique platform for participants to evolve their ideas through panel discussions and thought-provoking speaker sessions.
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-3xl shadow p-10 md:p-14">
          <h3 className="text-3xl font-bold mb-8 text-gray-900">Objectives</h3>
          <div className="space-y-6">
            {[
              "Bring together professionals from around the globe to encourage innovative ideas and share diversified knowledge.",
              "Provide indispensable exposure to promote the highest utilization of research knowledge.",
              "Offer a key platform for academicians, research scholars, and industry experts to present ongoing research.",
              "Facilitate career development and networking opportunities for all participants."
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <Award className="text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call for Papers */}
        <div className="bg-white rounded-3xl shadow p-10 md:p-14">
          <h3 className="text-3xl font-bold mb-8 text-gray-900">Call for Papers</h3>
          <p className="text-gray-700 mb-8">Original unpublished papers are invited in the following areas:</p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h4 className="font-bold text-red-700 mb-4">Renewable Energy</h4>
              <ul className="space-y-2 text-gray-700">
                {["Biomass Conversion", "Photovoltaic Technology Conversion", "Solar Thermal Applications", "Wind Energy Technology", "Desalination", "Solar and Low Energy Architecture", "Climatology and Meteorology", "Geothermal Technology", "Wave, Tide and Ocean Thermal Energies", "Hydro Power", "Hydrogen Production Technology and Fuel Cells", "Socio-economic and Policy Issues"].map((item) => (
                  <li key={item} className="flex gap-2 text-[15px]"><span className="text-red-600">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-10">
              <div>
                <h4 className="font-bold text-red-700 mb-4">Soft Computing Technologies</h4>
                <ul className="space-y-2 text-gray-700 text-[15px]">
                  {["Algorithms", "Neural Networks & Deep Learning", "Machine Learning", "Artificial Intelligence", "Fuzzy Logic System", "Human Computer Interface"].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-red-600">•</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-700 mb-4">Mechanical & Aerospace Engineering</h4>
                <ul className="space-y-2 text-gray-700 text-[15px]">
                  {["Smart Materials", "Robotics & Automation", "Fluid Mechanics", "Heat Transfer", "Finite Element Analysis"].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-red-600">•</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Dates + Registration */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow p-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="text-red-600" /> Important Dates
            </h3>
            <div className="space-y-4">
              {[
                ["Full Paper Submission", "28 Feb 2025"],
                ["Acceptance Notification", "13 Mar 2025"],
                ["Camera Ready Submission", "14 Mar 2025"],
                ["Registration Deadline", "17 Mar 2025"],
                ["Conference Dates", "19 - 20 Mar 2025"],
              ].map(([label, date]) => (
                <div key={label} className="flex justify-between py-3 border-b last:border-none">
                  <span>{label}</span>
                  <span className="font-semibold text-red-600">{date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow p-10">
            <h3 className="text-2xl font-bold mb-6">Registration Fee</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span>Indian Delegates</span>
                <span className="text-2xl font-bold text-red-600">₹500</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Foreign Delegates</span>
                <span className="text-2xl font-bold text-red-600">$15</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-8">Includes e-certificate and soft copy of proceedings.</p>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-3xl shadow p-10 md:p-14">
          <h3 className="text-2xl font-bold mb-6">Bank Account Details</h3>
          <div className="bg-gray-50 p-8 rounded-2xl space-y-3">
            <p><strong>Account Name:</strong> Mewat Engineering College Wakf</p>
            <p><strong>Account No.:</strong> 31204660546</p>
            <p><strong>Bank:</strong> State Bank of India</p>
            <p><strong>IFSC Code:</strong> SBIN0000620</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-3xl shadow p-10 md:p-14">
          <h3 className="text-3xl font-bold mb-8">Contact Us</h3>
          <div className="grid md:grid-cols-2 gap-10 text-gray-700">
            <div>
              <p className="font-medium">Mewat Engineering College (Waqf)</p>
              <p>Palla, District Nuh, Mewat, Haryana - 122107</p>
              <a href="https://www.mecw.ac.in" className="text-red-600 hover:underline">www.mecw.ac.in</a>
            </div>
            <div className="space-y-5">
              <div>
                <p className="font-medium">Dr. Adnan Akhlaq</p>
                <p>Adnanakhlaq87@gmail.com | +91-9897342786</p>
              </div>
              <div>
                <p className="font-medium">Dr. Shaheen Khan</p>
                <p>shaheen.khan.2@gmail.com | +91-9588356609</p>
              </div>
              <div>
                <p className="font-medium">Dr. Gaurav</p>
                <p>gaurav.citm@gmail.com | +91-8920876988</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Conference;
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import mecLogo from '@/assets/mec-logo.png';

const Footer = () => (
  <footer>
    {/* CTA strip */}
    <div className="bg-primary py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white">
          <h3 className="font-heading text-xl md:text-2xl">Ready to Begin Your Journey?</h3>
          <p className="text-white/60 text-sm mt-1">Admissions open for the academic year 2025-26.</p>
        </div>
        <a href="https://mecw-admission.vercel.app/#admission" target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-gold text-white rounded font-bold text-sm hover:brightness-110 transition-all shadow-lg inline-flex items-center gap-2">
          Apply Now <ArrowRight size={14} />
        </a>
      </div>
    </div>

    {/* Main footer */}
    <div className="bg-navy text-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={mecLogo} alt="MEC Logo" className="h-12 w-auto object-contain brightness-0 invert" />
              <div>
                <h3 className="font-heading text-lg leading-tight">MEC (Waqf)</h3>
                <p className="text-[10px] text-white/35 tracking-wide uppercase">Est. under Haryana Waqf Board</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-white/50">
              <p className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-gold" /> Palla, District Nuh, Mewat, Haryana-122107 India</p>
              <p className="flex items-center gap-2.5"><Phone size={14} className="shrink-0 text-gold" /> +91-9588356609</p>
              <p className="flex items-center gap-2.5"><Mail size={14} className="shrink-0 text-gold" /> director@mecw.ac.in</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-gold uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'About', path: '/about/about-mec' },
                { label: 'Departments', path: '/department/cse' },
                { label: 'Faculty', path: '/faculty' },
                { label: 'Admissions', path: '/admission/procedure' },
                { label: 'Career', path: '/placements/training' },
                { label: 'Contact / Enquiry', path: '/admission/enquiry' },
                { label: 'Right to Information', path: '/resources/anti-ragging' },
                { label: 'Mandatory Disclosure', path: '/about/about-mec' },
                {label:   'Conference', path: '/Conference' },
              ].map(link => (
                <Link key={link.label} to={link.path} className="flex items-center gap-1.5 text-white/45 hover:text-gold hover:translate-x-1 transition-all duration-200 py-0.5">
                  <ExternalLink size={10} className="shrink-0" /> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Important */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-gold uppercase tracking-wider">Important</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Anti Ragging Committee', path: '/resources/anti-ragging' },
                { label: 'Grievance Redressal Cell', path: '/resources/women-cell' },
                { label: 'Alumni Form', path: '/placements/alumni' },
                { label: 'AICTE Approval', path: '/about/achievements' },
                { label: 'NBA', path: '/about/achievements' },
                { label: 'Contact Details', path: '/admission/enquiry' },
              ].map(link => (
                <Link key={link.label} to={link.path} className="flex items-center gap-1.5 text-white/45 hover:text-gold hover:translate-x-1 transition-all duration-200 py-0.5">
                  <ExternalLink size={10} className="shrink-0" /> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-gold uppercase tracking-wider">Resources</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'MECW Login', path: '/login' },
                { label: 'Feedback Form', path: '/admission/enquiry' },
                { label: 'Margadarshak', path: '/about/about-mec' },
                { label: 'MAR Form', path: '/admission/downloads' },
                { label: 'Downloads', path: '/admission/downloads' },
                { label: 'Fee Structure', path: '/admission/fee-structure' },
              ].map(link => (
                <Link key={link.label} to={link.path} className="flex items-center gap-1.5 text-white/45 hover:text-gold hover:translate-x-1 transition-all duration-200 py-0.5">
                  <ExternalLink size={10} className="shrink-0" /> {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Affiliations bar */}
      <div className="border-t border-white/8 py-3">
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] text-white/50">
          <span>Affiliated to</span>
          <a href="https://gurugramuniversity.ac.in/" target="_blank" rel="noreferrer" className="text-gold hover:text-gold-light font-semibold transition-colors">
            Gurugram University →
          </a>
          <span className="text-white/15 hidden sm:inline">|</span>
          <span>Approved by AICTE, New Delhi</span>
          <span className="text-white/15 hidden sm:inline">|</span>
          <span>DTE, Haryana</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center text-[11px] text-white/30 gap-2">
          <p>&copy; {new Date().getFullYear()} Mewat Engineering College Wakf. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-white/15">|</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

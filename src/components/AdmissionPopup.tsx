import { useState, useEffect } from 'react';
import { subscribeToValue } from '@/lib/firebase';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdmissionPopup = () => {
  const [popup, setPopup] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const unsub = subscribeToValue('admissionPopup', setPopup);
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDismissed(true);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!popup?.active || dismissed) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={() => setDismissed(true)}
    >
      <div 
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in-0 zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* === FULL BANNER SECTION === */}
        <div className="relative">
          {popup.imageUrl ? (
            <img 
              src={popup.imageUrl} 
              alt="Admission Banner"
              className="w-full h-auto max-h-[320px] object-contain bg-white" 
            />
          ) : (
            <div className="h-52 bg-gradient-to-br from-red-600 via-red-700 to-amber-800 flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold">ADMISSIONS OPEN</h2>
              </div>
            </div>
          )}

          {/* Animated Close Button */}
          <button 
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          >
            <X 
              size={22} 
              className="text-red-600 group-hover:rotate-90 transition-transform duration-300" 
            />
          </button>

          {/* Live Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-white text-red-600 font-bold text-xs rounded-full shadow-md flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            LIVE
          </div>
        </div>

        {/* === CONTENT BELOW BANNER === */}
        <div className="p-6">
          <h2 className="font-bold text-xl text-gray-900 mb-2">
            {popup.title || 'Admissions 2026-27 Open'}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
            {popup.content || 'Apply now for the upcoming academic session.'}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <a 
              href="https://mecw-admission.vercel.app/#admission" 
              target="_blank" 
              rel="noreferrer"
              className="py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Apply Now 
              <ArrowRight size={18} />
            </a>

            <Link 
              to="/admission/enquiry" 
              onClick={() => setDismissed(true)}
              className="py-3 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold rounded-xl text-center transition-all"
            >
              Admission Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
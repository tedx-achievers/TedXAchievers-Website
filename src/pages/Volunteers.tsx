import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import { 
  Globe, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Ticket,
  Calendar
} from 'lucide-react';

const Volunteers = () => {
  const [checkEmail, setCheckEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showStatusChecker, setShowStatusChecker] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setCheckError(null);
    setCheckResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://tedxachievers-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/volunteers/me?email=${encodeURIComponent(checkEmail)}`);
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Could not check application status.";
        if (response.status === 404) {
          errorMessage = "We couldn't find an application with this email. Please check for typos.";
        } else if (response.status === 429) {
          errorMessage = "You're trying too quickly! Please wait a minute and try again.";
        } else if (data.message) {
          errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }

      setCheckResult(data);
    } catch (err: any) {
      setCheckError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <SEO 
        title="Volunteers - TEDxAchievers" 
        description="Volunteer applications for TEDxAchievers are officially closed. Thank you to everyone who applied!" 
      />

      <div className="min-h-screen pt-[35%] md:pt-[10%] pb-20 flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] text-white">
        {/* Dark overlay fading to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-[#050505] z-0"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
              [ Volunteer Update ]
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
              Thank You for Volunteering
            </h1>
            <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              We are deeply grateful for the immense interest and enthusiasm from everyone who submitted an application to join our team.
            </p>
          </div>

          {/* Announcement Card matching the native website theme */}
          <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-4xl mx-auto my-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Notice
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8 uppercase leading-snug">
              Volunteer Applications for TEDxAchievers are Officially Closed.
            </h2>

            <div className="space-y-6 text-gray-300 font-mono text-sm md:text-base leading-relaxed">
              <p className="bg-[#151515]/60 p-5 rounded-xl border border-white/5">
                Thank you to everyone who applied and showed interest in being part of this event. We're closing applications this early due to the volume of applications we've received so far.
              </p>

              <p className="bg-[#151515]/60 p-5 rounded-xl border border-white/5">
                Screening of applicants will begin shortly, and we'll be reaching out to shortlisted volunteers directly. If you applied, keep an eye on your email.
              </p>

              <p className="text-white font-medium text-base md:text-lg pt-2">
                More updates coming soon. See you at <span className="text-red-500 font-bold">TEDxAchievers</span>.
              </p>
            </div>

            {/* Links & Socials */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <a 
                href="https://www.tedxachieversuniversity.com.ng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 text-red-500" />
                <span>www.tedxachieversuniversity.com.ng</span>
              </a>

              <a 
                href="https://www.instagram.com/tedxachieversuniversity/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-red-500" />
                <FaTiktok className="w-4 h-4 text-red-500" />
                <svg className="w-3.5 h-3.5 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>@tedxachieversuniversity</span>
              </a>
            </div>

          </div>

          {/* Quick Actions / Explore More */}
          <div className="flex flex-wrap items-center justify-center gap-4 my-8">
            <Link 
              to="/tickets" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors shadow-lg"
            >
              <Ticket className="w-4 h-4" />
              <span>Get Tickets</span>
            </Link>

            <Link 
              to="/speakers" 
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-semibold text-sm transition-colors"
            >
       
              <span>Meet the Speakers</span>
            </Link>

            <Link 
              to="/timeline" 
              className="inline-flex items-center gap-2 bg-[#151515] hover:bg-[#202020] text-gray-200 hover:text-white border border-white/10 px-8 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              <Calendar className="w-4 h-4 text-red-500" />
              <span>Event Timeline</span>
            </Link>
          </div>

          {/* Check Application Status Section */}
          <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-4xl mx-auto my-6">
            <button 
              type="button"
              onClick={() => setShowStatusChecker(!showStatusChecker)}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-500" />
                  Check Application Status
                </h3>
                <p className="text-gray-400 font-mono text-sm mt-1">
                  Already submitted an application? Enter your email to view your screening status.
                </p>
              </div>
              <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-red-500/50 transition-colors">
                {showStatusChecker ? (
                  <ChevronUp className="w-5 h-5 text-gray-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-300" />
                )}
              </div>
            </button>

            {showStatusChecker && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <form onSubmit={handleCheckStatus} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={checkEmail}
                      onChange={(e) => setCheckEmail(e.target.value)}
                      required
                      className="flex-1 bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                      placeholder="Enter the email you applied with"
                    />
                    <button 
                      type="submit"
                      disabled={isChecking}
                      className={`whitespace-nowrap ${isChecking ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-200 text-black cursor-pointer'} px-8 py-4 rounded-xl transition-colors font-semibold tracking-wide text-sm`}
                    >
                      {isChecking ? 'Checking...' : 'Check Status'}
                    </button>
                  </div>

                  {checkError && (
                    <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                      {checkError}
                    </div>
                  )}

                  {checkResult && (
                    <div className="mt-6 p-6 bg-[#151515] border border-white/10 rounded-xl font-mono">
                      <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                        <div>
                          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Applicant (Email)</p>
                          <p className="text-white font-medium truncate max-w-[200px]" title={checkEmail}>
                            {checkEmail}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Status</p>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            checkResult.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            checkResult.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                            checkResult.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {checkResult.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {checkResult.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                            {checkResult.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                            {checkResult.status || 'Unknown'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs uppercase mb-1">Role</p>
                          <p className="text-gray-300 capitalize">{checkResult.preferredRole?.replace(/_/g, ' ') || 'N/A'}</p>
                        </div>
                        {checkResult.department && (
                          <div>
                            <p className="text-gray-500 text-xs uppercase mb-1">Department</p>
                            <p className="text-gray-300">{checkResult.department}</p>
                          </div>
                        )}
                        <div className="col-span-1 md:col-span-2">
                          <p className="text-gray-500 text-xs uppercase mb-1">Reference Code</p>
                          <div className="inline-flex items-center gap-3 bg-black/50 px-3 py-2 rounded">
                            <p className="text-white tracking-widest font-bold">{checkResult.referenceCode}</p>
                            <button 
                              type="button" 
                              onClick={() => handleCopy(checkResult.referenceCode)}
                              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                              title="Copy Reference Code"
                            >
                              {isCopied ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Volunteers;

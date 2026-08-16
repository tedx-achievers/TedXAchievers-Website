import { Link } from 'react-router-dom';
import { FaTiktok, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 overflow-hidden pt-16 relative">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-12 pb-16 relative z-10">
        
        {/* Left Side: Branding & Tagline */}
        <div className="max-w-sm">
          <div className="mb-6">
            <img src="/logo-white.png" alt="TEDxAchievers Logo" className="h-10 object-contain" />
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            TEDxAchievers is the platform you've been searching for. 
            Ideas worth spreading, stories worth telling.
          </p>
        </div>

        {/* Right Side: Links */}
        <div className="w-full md:w-auto flex-1 flex flex-wrap justify-between md:justify-end gap-x-6 gap-y-8 sm:gap-x-12 md:gap-16 lg:gap-32 text-sm">
          <div className="flex flex-col gap-3">
            <h3 className="text-stone-600 font-semibold mb-2 uppercase tracking-widest text-[10px]">Explore</h3>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/speakers" className="hover:text-white transition-colors">Speakers</Link>
            <Link to="/team" className="hover:text-white transition-colors">Team</Link>
            <Link to="/timeline" className="hover:text-white transition-colors">Event Timeline</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="text-stone-600 font-semibold mb-2 uppercase tracking-widest text-[10px]">Attend</h3>
            <Link to="/tickets" className="hover:text-white transition-colors">Tickets</Link>
            <Link to="/volunteers" className="hover:text-white transition-colors">Volunteers</Link>
            <Link to="/register" className="text-red-500 font-medium hover:text-red-400 transition-colors">Register</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-stone-600 font-semibold mb-2 uppercase tracking-widest text-[10px]">Connect</h3>
            <a href="https://www.tiktok.com/@tedxachieversuniversity" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <FaTiktok className="text-lg" /> TikTok
            </a>
            <a href="https://www.instagram.com/tedxachieversuniversity/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <FaInstagram className="text-lg" /> Instagram
            </a>
            <a href="mailto:admin@tedxachieversuniversity.com.ng" className="hover:text-white transition-colors flex items-center gap-2">
              <FaEnvelope className="text-lg" /> admin@tedxachieversuniversity.com.ng
            </a>
          </div>  
        </div>
      </div>

      {/* Massive Bottom Text */}
  
      <div className="w-full flex justify-center items-end mt-10 pointer-events-none select-none">
        <h1 className="font-segoe text-[20vw] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-red-500/50 via-red-600/20 to-transparent [-webkit-text-stroke:2px_rgba(239,68,68,0.6)] drop-shadow-[0_0_15px_rgba(239,68,68,0.2)] leading-[0.75] tracking-tighter translate-y-[15%]">
          ACHIEVERS
        </h1>
      </div>
    </footer>
  );
};

export default Footer;

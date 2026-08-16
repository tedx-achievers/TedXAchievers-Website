import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu automatically on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down and past 50px. Show if scrolling up.
      // Don't hide the navbar if the mobile menu is currently open.
      if (!isMenuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  return (
    <motion.nav 
      layout
      className={`fixed left-1/2 -translate-x-1/2 px-6 lg:px-8 py-3.5 backdrop-blur-xl bg-[#0f0f0f]/80 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-full flex justify-between items-center z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'top-8 opacity-100' : '-top-24 opacity-0 pointer-events-none'
      } ${isMenuOpen ? 'w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-max' : 'w-[80vw] sm:w-max gap-12'}`}
    >
      <motion.div layout>
        <Link to="/" className="flex items-center z-50">
          <img src="/logo-white.png" alt="TEDxAchievers Logo" className="h-8 md:h-10 object-contain" />
        </Link>
      </motion.div>
      
      {/* Desktop Links */}
      <motion.ul layout className="gap-6 text-gray-200 font-medium text-sm items-center hidden lg:flex">
        <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
        <li><Link to="/speakers" className="hover:text-white transition-colors">Speakers</Link></li>
        <li><Link to="/tickets" className="hover:text-white transition-colors">Tickets</Link></li>
        <li><Link to="/volunteers" className="hover:text-white transition-colors">Volunteers</Link></li>
        <li><Link to="/timeline" className="hover:text-white transition-colors">Event Timeline</Link></li>
        <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
        <li>
          <Link to="/register" className="ml-4 bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-full transition-colors shadow-lg shadow-red-600/20 font-semibold tracking-wide">
            Register
          </Link>
        </li>
      </motion.ul>

      {/* Mobile Toggle Button */}
      <motion.button 
        layout
        className="lg:hidden z-50 flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <motion.span 
          animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7 : 0 }} 
          className="w-6 h-[2px] bg-white block rounded-full origin-center"
        />
        <motion.span 
          animate={{ opacity: isMenuOpen ? 0 : 1 }} 
          className="w-6 h-[2px] bg-white block rounded-full"
        />
        <motion.span 
          animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0 }} 
          className="w-6 h-[2px] bg-white block rounded-full origin-center"
        />
      </motion.button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-4 bg-[#050505]/95 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl p-6 flex flex-col gap-1 lg:hidden"
          >
            <Link to="/about" className="text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors">About</Link>
            <Link to="/speakers" className="text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors">Speakers</Link>
            <Link to="/tickets" className="text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors">Tickets</Link>
            <Link to="/volunteers" className="text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors">Volunteers</Link>
            <Link to="/timeline" className="text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors">Event Timeline</Link>
            <Link to="/team" className="text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors">Team</Link>
            
            <div className="pt-4 mt-2 border-t border-white/10 px-2">
              <Link to="/register" className="block w-full bg-[#e62b1e] text-center text-white font-bold py-4 rounded-full uppercase tracking-widest text-sm transition-all shadow-lg shadow-[#e62b1e]/20 active:scale-95">
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import { FaMapMarkerAlt, FaTicketAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';
const HeroSection = () => {
  return (
    <div className="h-screen w-full bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-no-repeat relative flex flex-col justify-end">
      {/* Dark overlay fading to very dark at bottom to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-[#0f0f0f] z-0"></div>

      {/* Content Container positioned at the bottom */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 lg:px-8 pb-12 md:pb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Left Side */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-3xl">
          {/* Date & Location */}
          <div className="flex flex-col gap-3 font-mono text-gray-200 text-sm md:text-base">
            <div className="flex items-center gap-4">
              <FaRegCalendarAlt className="text-xl" />
              <span>Coming Soon</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl" />
              <span>Achievers University</span>
            </div>
          </div>

          {/* Massive Headline */}
          <SplitText
            text="TEDxAchievers"
            className="text-white text-6xl md:text-[6rem] lg:text-[8rem] font-bold tracking-tighter leading-none mt-2 drop-shadow-lg"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            tag="h1"
            textAlign="left"
          />

          {/* Subheadline */}
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-lg mt-2 font-mono leading-relaxed">
            Join 200+ creators, innovators, and industry leaders at TEDxAchievers
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-start md:items-end gap-4 pb-2 w-full md:w-auto">
           {/* Decorative Arrow */}
           <div className="hidden md:flex w-full justify-center animate-bounce">
             <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 ">
               <path d="M12 5v14M19 12l-7 7-7-7"/>
             </svg>
           </div>

           {/* CTA Button */}
           <Link
             to="/tickets"
             className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-red-600/30 font-semibold tracking-wide text-lg flex items-center gap-3 group w-full sm:w-auto justify-center"
           >
             <FaTicketAlt className="group-hover:rotate-12 transition-transform" />
             Get your Ticket
           </Link>

           {/* Audience / Avatars */}
           <div className="flex items-center gap-4 mt-2">
             <div className="flex -space-x-4">
               <img src="https://i.pravatar.cc/100?img=33" alt="Audience" className="w-10 h-10 rounded-full border-2 border-[#0f0f0f] object-cover" />
               <img src="https://i.pravatar.cc/100?img=47" alt="Audience" className="w-10 h-10 rounded-full border-2 border-[#0f0f0f] object-cover" />
               <img src="https://i.pravatar.cc/100?img=12" alt="Audience" className="w-10 h-10 rounded-full border-2 border-[#0f0f0f] object-cover" />
             </div>
             <span className="text-gray-300 text-xs sm:text-sm font-medium font-mono">200+ Audience</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;

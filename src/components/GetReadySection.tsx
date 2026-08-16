import { Link } from 'react-router-dom';
import DotField from './DotField';

const TicketIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="M13 5v2"/>
    <path d="M13 17v2"/>
    <path d="M13 11v2"/>
  </svg>
);

const GetReadySection = () => {
  /*
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: November 14, 2026
    const targetDate = new Date('2026-11-14T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  */

  

  return (
    <section className="relative overflow-hidden bg-[#050505] py-32 border-t border-white/5">
      {/* Background DotField */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={3}
          dotSpacing={20}
          bulgeStrength={100}
          glowRadius={300}
          sparkle={true}
          waveAmplitude={0}
          gradientFrom="rgba(239, 68, 68, 1)" 
          gradientTo="rgba(220, 38, 38, 0.6)"
          glowColor="rgba(239, 68, 68, 0.8)"
        />
      </div>

      <div className="max-w-[100rem] mx-auto px-6 lg:px-8 relative z-10 pointer-events-none">
        <div className="flex flex-col items-center justify-center pointer-events-auto text-center max-w-2xl mx-auto">
          
          {/* Content */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Get <span className="text-red-600">ready</span> !
              
            </h2>
            
            <p className="text-gray-300 font-mono text-lg md:text-xl mb-10">
              Coming Soon - Live in Achievers University
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link to="/tickets" className="w-full sm:w-auto justify-center bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-3 rounded-full font-semibold flex items-center gap-3 text-lg group">
                <TicketIcon className="group-hover:scale-110 transition-transform" />
                Buy a ticket
              </Link>
              <Link to="/volunteers" className="w-full sm:w-auto justify-center bg-[#111] border border-white/10 hover:border-red-600/50 hover:bg-[#1a1a1a] transition-all text-white px-8 py-3 rounded-full font-semibold flex items-center gap-3 text-lg group shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform text-red-500">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Volunteer
              </Link>
            </div>
          </div>

          {/* Right Content: Countdown (Hidden for now) */}
          {/*
          <div className="flex lg:justify-end">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl flex items-center justify-center gap-6 md:gap-10 w-full lg:w-auto">
              
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-bold text-white mb-2">{formatNumber(timeLeft.days)}</span>
                <span className="text-gray-400 text-sm md:text-base">Days</span>
              </div>
              
              <div className="w-px h-20 bg-white/10"></div>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-bold text-white mb-2">{formatNumber(timeLeft.hours)}</span>
                <span className="text-gray-400 text-sm md:text-base">Hours</span>
              </div>
              
              <div className="w-px h-20 bg-white/10"></div>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-bold text-white mb-2">{formatNumber(timeLeft.minutes)}</span>
                <span className="text-gray-400 text-sm md:text-base">Minutes</span>
              </div>
              
              <div className="w-px h-20 bg-white/10"></div>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-bold text-white mb-2">{formatNumber(timeLeft.seconds)}</span>
                <span className="text-gray-400 text-sm md:text-base">Seconds</span>
              </div>

            </div>
          </div>
          */}

        </div>
      </div>
    </section>
  );
};

export default GetReadySection;

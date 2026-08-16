import { useState, useEffect } from 'react';
import OptionWheel from '../components/OptionWheel';

const schedule = [
  {
    shortTitle: "08:00 AM - Arrival",
    time: "08:00 AM - 09:00 AM",
    title: "Arrival & Registration",
    description: "Check in, grab your badge, and get ready for an inspiring day of ideas worth spreading."
  },
  {
    shortTitle: "09:00 AM - Opening",
    time: "09:00 AM - 09:30 AM",
    title: "Welcome Address",
    description: "Kick off the day with an inspiring opening speech from our curators setting the stage for the ideas to come."
  },
  {
    shortTitle: "09:30 AM - Session 1",
    time: "09:30 AM - 11:00 AM",
    title: "Speaker Lineup Coming Soon",
    description: "We are currently curating an incredible lineup of visionary speakers. Stay tuned as we unveil the brilliant minds taking the stage."
  },
  {
    shortTitle: "11:00 AM - Break",
    time: "11:00 AM - 11:30 AM",
    title: "Coffee Break & Networking",
    description: "Refuel and mingle with fellow attendees and innovators."
  },
  {
    shortTitle: "11:30 AM - Session 2",
    time: "11:30 AM - 01:00 PM",
    title: "Speaker Lineup Coming Soon",
    description: "We are currently curating an incredible lineup of visionary speakers. Stay tuned as we unveil the brilliant minds taking the stage."
  },
  {
    shortTitle: "01:00 PM - Lunch",
    time: "01:00 PM - 02:30 PM",
    title: "Lunch Break",
    description: "Enjoy a curated lunch while participating in optional small-group mentorship circles with industry experts."
  },
  {
    shortTitle: "02:30 PM - Session 3",
    time: "02:30 PM - 04:00 PM",
    title: "Speaker Lineup Coming Soon",
    description: "We are currently curating an incredible lineup of visionary speakers. Stay tuned as we unveil the brilliant minds taking the stage."
  },
  {
    shortTitle: "04:00 PM - Closing",
    time: "04:00 PM - 05:00 PM",
    title: "Closing Remarks & Networking",
    description: "Wrap up the event with final thoughts, followed by an open networking hour to connect with speakers."
  }
];

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [wheelFontSize, setWheelFontSize] = useState(1.5);

  useEffect(() => {
    const handleResize = () => {
      setWheelFontSize(window.innerWidth >= 1024 ? 2.5 : 1.5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-fixed bg-no-repeat pt-[35%] md:pt-[10%] pb-10 relative overflow-hidden flex flex-col">
      {/* Dark overlay fading to black to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#050505]/95 to-[#050505] z-0"></div>
      
      {/* Red ambient glows */}
      <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-red-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1 flex flex-col ">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
            [ Schedule ]
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Event Timeline
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Follow the journey of ideas worth spreading. Scroll the wheel to plan your day and explore the sessions.
          </p>
        </div>

        {/* Interactive Timeline Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 flex-1 mt-4">
          
          {/* Left Side: Option Wheel */}
          <div className="w-full lg:w-1/2 h-[350px] lg:h-[500px] relative border-l-2 border-red-600/20 shadow-[-20px_0_30px_-15px_rgba(220,38,38,0.05)]">
            <OptionWheel
              items={schedule.map(item => item.shortTitle)}
              defaultSelected={0}
              textColor="#555555"
              activeColor="#ffffff"
              side="left"
              fontSize={wheelFontSize}
              spacing={1.8}
              curve={1}
              tilt={6}
              blur={2}
              fade={0.3}
              smoothing={200}
              inset={24}
              loop={false}
              draggable
              onChange={(index) => setSelectedIndex(index)}
            />
          </div>

          {/* Right Side: Selected Content Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/5 p-8 lg:p-12 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-start transition-all duration-500 min-h-[300px] justify-center w-full">
              <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
              
              <div className="text-white font-semibold text-sm tracking-wide mb-6 bg-red-600 px-6 py-2 rounded-full shadow-lg shadow-red-600/20 w-fit">
                {schedule[selectedIndex].time}
              </div>
              
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {schedule[selectedIndex].title}
              </h3>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-mono">
                {schedule[selectedIndex].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Timeline;

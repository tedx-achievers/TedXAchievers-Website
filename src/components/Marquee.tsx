import { FaStarOfLife } from 'react-icons/fa';

const Marquee = () => {
  const texts = [
    
    "Early bird tickets now available",
    "You can volunteer at tedxachievers",
    "Limited seats available",
    "Reserve your spot now",
    "Join us live at Achievers University",
    "Early bird tickets now available",
    "Limited seats available",
    "Reserve your spot now",
    "Join us live at Achievers University"
  ];

  // Double the items so it can seamlessly scroll to 50% width and jump back
  const marqueeItems = [...texts, ...texts];

  return (
    <div className="w-full bg-[#0a0a0a] py-6 overflow-hidden flex relative border-y border-white/5">
      <div className="flex whitespace-nowrap animate-marquee w-max hover:[animation-play-state:paused]">
        {marqueeItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-3 px-6 py-2.5 border border-white/10 rounded-full mx-3 bg-white/[0.02] backdrop-blur-sm transition-colors hover:bg-white/5">
            <FaStarOfLife className="text-red-600 text-xs animate-[spin_4s_linear_infinite]" />
            <span className="text-gray-300 font-mono text-sm tracking-wide">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

import { FiMic, FiMessageSquare, FiUser, FiLayers, FiGlobe, FiUsers } from 'react-icons/fi';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const features = [
  {
    icon: <FiMic />,
    title: "Engage with Innovators",
    description: "A room filled with professionals, investors, and change makers solving tomorrow's problems today.",
    image: "/images/feat_innovators.jpg"
  },
  {
    icon: <FiMessageSquare />,
    title: "Engaging Talks",
    description: "Talks focus on pioneering local innovations, circular economy models, and sustainable practices.",
    image: "/images/feat_talks.jpg"
  },
  {
    icon: <FiUser />,
    title: "Brand Alignment",
    description: "Align your brand with a globally respected standard of excellence like the TEDx community.",
    image: "/images/feat_brand.jpg"
  },
  {
    icon: <FiLayers />,
    title: "Collaborative Dialogue",
    description: "Share your own perspectives, and participate in discussions that directly impact the community.",
    image: "/images/feat_dialogue.jpg"
  },
  {
    icon: <FiGlobe />,
    title: "A Curated Room",
    description: "A curated group of top innovators, creatives, and industry leaders on a single stage.",
    image: "/images/feat_curated.jpg"
  },
  {
    icon: <FiUsers />,
    title: "Spark New Ideas",
    description: "Get access to diverse, cross-disciplinary ideas to spark ideas for your own impact journey.",
    image: "/images/feat_ideas.jpg"
  }
];

const WhyAttend = () => {
  return (
    <section className="bg-[#0a0a0a] pt-24 md:py-24 text-white relative z-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-30">
        <span className="text-gray-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
          [Why Attend]
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Spark conversations & ideas <br className="hidden md:block" />
          <span className="text-gray-500">worth spreading.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative z-30 w-full px-4">
        <ScrollStack 
          useWindowScroll={true}
          className="bg-transparent"
          itemDistance={40}
          stackPosition="20%"
        >
          {features.map((feat, idx) => (
            <ScrollStackItem 
              key={idx} 
              itemClassName="bg-[#111111] border border-white/5 !h-auto min-h-[450px] overflow-hidden !p-0"
            >
              <div className="flex flex-col-reverse md:flex-row h-full w-full min-h-[450px]">
                {/* Left Side: Text */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-left">
                  <div className="text-4xl text-red-600 mb-6 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm md:text-lg leading-relaxed max-w-md">
                    {feat.description}
                  </p>
                </div>
                
                {/* Right Side: Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <img 
                    src={feat.image} 
                    alt={feat.title} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  {/* Subtle gradient overlay to blend the edge into the dark background */}
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111111] to-transparent hidden md:block"></div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111111] to-transparent md:hidden"></div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default WhyAttend;

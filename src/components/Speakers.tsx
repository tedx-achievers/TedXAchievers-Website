
const Speakers = () => {
  return (
    <section className="bg-[#0f0f0f] py-24 md:py-32 relative border-t border-white/5 z-20 overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Side: Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left relative z-10">
            <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-6">
              [ Speakers ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              Visionaries & <br />
              <span className="text-gray-500">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 font-mono text-lg max-w-xl leading-relaxed mb-10">
              We are currently curating an incredible lineup of speakers for TEDxAchievers. 
              Stay tuned as we unveil the brilliant minds taking the stage.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg shadow-red-600/20 font-semibold tracking-wide relative overflow-hidden group w-fit inline-flex items-center justify-center leading-none">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_2s_infinite] z-10" />
                Lineup Coming Soon
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10  group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0f0f]/80 via-transparent to-transparent z-10" />
            <img 
              src="/images/speaker_stage.jpg" 
              alt="TEDx Stage" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Speakers;

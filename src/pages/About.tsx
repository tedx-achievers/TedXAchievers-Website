import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import BlurText from '../components/ui/BlurText';
import BorderGlow from '../components/ui/BorderGlow';
import TrueFocus from '../components/ui/TrueFocus';

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-[35%] md:pt-[10%] pb-10 px-6 font-sans overflow-hidden">
      <div className="max-w-[100rem] mx-auto space-y-32">
        
        {/* Intro / Legacy Section */}
        <section className="text-center space-y-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#e62b1e] rounded-full blur-[150px] opacity-10 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[#e62b1e] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">Our Legacy</h2>
            <BlurText 
              text="The Impact" 
              delay={50} 
              animateBy="letters" 
              direction="bottom" 
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter justify-center mt-2"
            />
          </motion.div>
          
          <div className="space-y-6 pb-20">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
              textClassName="text-2xl md:text-4xl font-light text-gray-200 max-w-4xl mx-auto leading-relaxed"
            >
              "Ideas are the seeds of change. We provide the soil where innovation takes root and flourishes across the globe."
            </ScrollReveal>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">
              Ideas that scale for impact
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-full"
          >
            <BorderGlow
              glowColor="4 80 50"
              colors={['#e62b1e', '#ff4d4d', '#991c14']}
              backgroundColor="#111"
              borderRadius={24}
              fillOpacity={0}
              className="p-10 h-full w-full group"
            >
              <div className="absolute top-0 right-0 w-32 h-32  rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider relative z-10">Our Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                To spread ideas that spark meaningful change in our community and beyond, fostering a culture of curiosity and action.
              </p>
            </BorderGlow>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-full"
          >
            <BorderGlow
              glowColor="4 80 50"
              colors={['#e62b1e', '#ff4d4d', '#991c14']}
              backgroundColor="#111"
              borderRadius={24}
              fillOpacity={0}
              className="p-10 h-full w-full group"
            >
              <div className="absolute top-0 right-0 w-32 h-32  rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider relative z-10">Our Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                To be the leading platform for innovation and creative thinking, empowering local voices to command global attention.
              </p>
            </BorderGlow>
          </motion.div>
        </section>

        {/* Quote Section */}
        <section className="py-20 text-center flex flex-col items-center overflow-visible">
          <div className="max-w-5xl mx-auto w-full px-4">
            <TrueFocus 
              sentence='"The people who are crazy enough to think they can change the world are the ones who do."'
              manualMode={false}
              blurAmount={5}
              borderColor="#e62b1e"
              glowColor="rgba(230, 43, 30, 0.6)"
              animationDuration={0.8}
              pauseBetweenAnimations={0.2}
              className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white leading-tight text-center"
            />
          </div>
          <p className="mt-16 text-[#e62b1e] font-semibold tracking-[0.2em] uppercase relative z-10">
            — Steve Jobs
          </p>
        </section>

        {/* The Architects & CTA */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h2 className="text-[#e62b1e] text-sm md:text-base font-bold tracking-[0.2em] uppercase">The Architects</h2>
            <BlurText 
              text="Meet The Minds" 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
            />
            <p className="text-gray-400 text-lg leading-relaxed">
              A collective of curators, designers, and innovators building the platform for tomorrow's breakthroughs.
            </p>
            <div className="pt-4">
              <Link to="/team" className="inline-flex items-center gap-2 text-white border-b-2 border-[#e62b1e] pb-1 font-semibold uppercase tracking-wider hover:text-[#e62b1e] transition-colors">
                View All Team Members 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gradient-to-br from-[#e62b1e] to-red-900 text-white p-10 md:p-12 rounded-3xl space-y-8 relative overflow-hidden border border-red-400/50 shadow-2xl shadow-red-900/50"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full blur-[80px] opacity-20 pointer-events-none" />
            
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Become a Part of the Story</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Whether you are an innovator, a volunteer, or a partner, your voice is essential to the impact we create.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 relative z-10 w-full">
              <Link to="/volunteers" className="w-full bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm text-center hover:bg-gray-200 transition-colors whitespace-nowrap">
                Apply to Volunteer
              </Link>
              <a href="mailto:partner@tedxachievers.com" className="w-full border-2 border-white/30 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm text-center hover:bg-white/10 hover:border-white transition-all whitespace-nowrap">
                Partner With Us
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default About;

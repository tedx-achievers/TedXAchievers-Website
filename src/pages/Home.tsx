import HeroSection from '../components/HeroSection';
import Marquee from '../components/Marquee';
import WhyAttend from '../components/WhyAttend';
import Speakers from '../components/Speakers';
import FAQ from '../components/FAQ';
import GetReadySection from '../components/GetReadySection';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-[#0a0a0a]">
      <SEO 
        title="TEDxAchievers | Ideas Worth Spreading" 
        description="Join us for an inspiring day of talks and performances at TEDxAchievers." 
      />
      <HeroSection />
      <Marquee />
      <WhyAttend />
      <Speakers />
      <FAQ />
      <GetReadySection />
    </div>
  );
};

export default Home;

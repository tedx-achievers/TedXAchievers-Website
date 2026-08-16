import Lanyard from '../components/Lanyard';

const generateCardTexture = (name: string, role: string) => {
  if (typeof document === 'undefined') return '/placeholder.png';
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '/placeholder.png';
  
  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#151515');
  grad.addColorStop(1, '#050505');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Top Red Accent
  ctx.fillStyle = '#e62b1e';
  ctx.fillRect(0, 0, canvas.width, 100);
  
  // Logo
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('TEDx', canvas.width / 2, 60);
  ctx.font = '36px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Achievers', canvas.width / 2, 60);
  
  // Avatar Frame
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 260, 90, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a0a';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#e62b1e';
  ctx.stroke();
  
  // Avatar Head
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 235, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#222222';
  ctx.fill();
  
  // Avatar Body
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 330, 60, Math.PI * 1.15, Math.PI * -0.15);
  ctx.fillStyle = '#222222';
  ctx.fill();
  
  // Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(name, canvas.width / 2, 430);
  
  // Role
  ctx.fillStyle = '#e62b1e';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(role.toUpperCase(), canvas.width / 2, 470);
  
  // Event Date/Label
  ctx.fillStyle = '#555555';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CORE STAFF 2026', canvas.width / 2, 505);
  
  // Barcode
  ctx.fillStyle = '#333333';
  for (let i = 0; i < 28; i++) {
    const barWidth = Math.random() * 4 + 2;
    ctx.fillRect(35 + i * 12, 540, barWidth, 30);
  }
  
  return canvas.toDataURL('image/png');
};

const teamMembers = [
  {
    name: "Coming Soon",
    role: "Lead Organizer / Curator",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Co-Organizer",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Head of Speaker Relations",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Head of Production",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Marketing & PR Lead",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Sponsorship Coordinator",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Volunteer Coordinator",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Coming Soon",
    role: "Logistics Lead",
    linkedin: "#",
    twitter: "#"
  }
];

const Team = () => {
  return (
    <div className="min-h-screen bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-fixed bg-no-repeat pt-[10%] pb-10 relative overflow-hidden flex flex-col">
      {/* Dark overlay fading to black to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#050505]/95 to-[#050505] z-0"></div>
      
      {/* Red ambient glows */}
      <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-red-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1 flex flex-col">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
            [ Core Organizers ]
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Meet the Team
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            The passionate minds and dedicated volunteers working behind the scenes to bring TEDxAchievers to life.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="w-full h-[650px] relative group"
            >
              {/* Optional glowing effect behind the lanyard on hover */}
              <div className="absolute inset-0 bg-red-600/5 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <Lanyard 
                position={[0, 0, 12]} 
                gravity={[0, -20, 0]} 
                frontImage={generateCardTexture(member.name, member.role)} 
                imageFit="cover" 
                lanyardWidth={1.4}
              />
            </div>
          ))}
        </div>

        {/* CTA for volunteering */}
        <div className="mt-24 mb-8 text-center bg-[#0a0a0a]/50 border border-white/5 p-12 rounded-3xl backdrop-blur-md">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to join the team?</h3>
          <p className="text-gray-400 font-mono text-sm mb-8 max-w-lg mx-auto">
            We are always looking for passionate individuals to help bring this event to life.
          </p>
          <a href="/volunteers" className="inline-flex bg-white text-black px-12 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            Become a Volunteer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;

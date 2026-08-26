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
    <div className="min-h-screen bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-fixed bg-no-repeat pt-[35%]  md:pt-[10%] pb-10 relative overflow-hidden flex flex-col">
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
            <div key={index} className="w-full">
              {/* Mobile/Tablet Card View */}
              <div className="flex lg:hidden flex-col items-center bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-8 text-center hover:border-red-600/30 transition-colors backdrop-blur-sm shadow-xl">
                <div className="w-24 h-24 bg-[#1a1a1a] rounded-full mb-6 border-2 border-red-600/30 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">Avatar</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-red-600 font-mono text-xs uppercase tracking-wider mb-6">{member.role}</p>
                <div className="flex justify-center gap-5 mt-auto">
                  <a href={member.linkedin} className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={member.twitter} className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                </div>
              </div>

              {/* Desktop Lanyard View */}
              <div className="hidden lg:block w-full h-[650px] relative group">
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

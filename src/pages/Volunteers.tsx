import React, { useState } from 'react';

const Volunteers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    matric: '',
    role: '',
    reason: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer Form Submitted', formData);
    // Form submission logic would go here
    alert("Application received! We'll be in touch.");
  };

  return (
    <div className="min-h-screen pt-[35%]  md:pt-[10%] pb-10 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dark overlay fading to black to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-[#050505] z-0"></div>


      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
            [ Join The Team ]
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Become a Volunteer
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Help us bring TEDxAchievers to life. We're looking for passionate individuals to join our crew, shape the experience, and be part of something extraordinary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-7xl mx-auto my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="phone" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="+1 (234) 567-8900"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="department" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="matric" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Matric Number</label>
              <input
                type="text"
                id="matric"
                name="matric"
                value={formData.matric}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="e.g. AU/1234/2026"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="role" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Preferred Role</label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm appearance-none w-full"
                >
                  <option value="" disabled>Select a role...</option>
                  <option value="logistics_venue">Logistics & Venue Unit</option>
                  <option value="finance_sponsorship">Finance & Sponsorship Unit</option>
                  <option value="welfare">Welfare</option>
                  <option value="protocol_ushering">Protocol & Ushering Unit</option>
                  <option value="technical">Technical Unit</option>
                  <option value="media">Media</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-10">
            <label htmlFor="reason" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Why do you want to volunteer?</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm resize-none placeholder:text-gray-700"
              placeholder="Tell us about your motivation..."
            />
          </div>

          <button 
            type="button"
            disabled
            className="w-full bg-[#333] border border-white/5 text-gray-400 px-6 py-3 rounded-full transition-colors font-semibold tracking-wide text-lg cursor-not-allowed"
          >
            Coming Soon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Volunteers;

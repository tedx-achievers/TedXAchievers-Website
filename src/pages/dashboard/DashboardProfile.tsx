import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, Shield } from 'lucide-react';

const DashboardProfile = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your personal information and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-2/3"
        >
          <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <User size={16} /> Full Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="Jane Doe"
                    className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    defaultValue="jane.doe@example.com"
                    className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567"
                    className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <MapPin size={16} /> Location
                  </label>
                  <input 
                    type="text" 
                    defaultValue="New York, NY"
                    className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              {/* Dietary Requirements */}
              <div className="space-y-2 pt-4 border-t border-white/20">
                <label className="text-sm font-medium text-gray-400">Dietary Requirements</label>
                <select className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 appearance-none transition-all">
                  <option value="none">None</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="dairy-free">Dairy-Free</option>
                  <option value="other">Other (Please specify at checkout)</option>
                </select>
              </div>

              <button type="submit" className="mt-8 bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-red-600/20">
                <Save size={18} />
                Save Changes
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Avatar & Preferences */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-1/3 flex flex-col gap-6"
        >
          {/* Avatar Section */}
          <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-semibold">Change Photo</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Jane Doe</h3>
            <p className="text-gray-400 text-sm mb-4">Attendee</p>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 text-xs font-mono uppercase rounded-lg border border-green-500/20">
              <Shield size={14} /> Account Verified
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="text-white text-sm font-medium">Email Updates</p>
                  <p className="text-gray-500 text-xs">Receive event schedules and news.</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="text-white text-sm font-medium">SMS Alerts</p>
                  <p className="text-gray-500 text-xs">Important day-of-event notifications.</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardProfile;

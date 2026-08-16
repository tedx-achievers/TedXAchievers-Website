import { motion } from 'framer-motion';
import { Calendar, Ticket, ArrowRight, Bell, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-[#111] border border-white/20 rounded-xl p-8 md:p-10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Welcome back, <span className="text-red-500">Achiever</span>
            </h1>
            <p className="text-gray-400 max-w-lg">
              Your TEDxAchievers experience is just around the corner. Check your tickets, browse exclusive merch, and manage your profile.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 flex items-center gap-4 min-w-[200px]">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <Calendar className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Event Date</p>
              <p className="text-white font-semibold">Nov 14, 2026</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Your Tickets', value: '1 Pass', icon: Ticket, link: '/dashboard/tickets', color: 'text-red-500', bg: 'bg-red-500/10' },
          { title: 'New Merch', value: '3 Items', icon: Zap, link: '/dashboard/shop', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { title: 'Announcements', value: '2 Unread', icon: Bell, link: '#', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
          >
            <Link to={stat.link} className="block group">
              <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 hover:border-white/30 transition-all rounded-xl p-6 h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={`${stat.bg} p-3 rounded-xl`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <ArrowRight className="text-gray-600 group-hover:text-white transition-colors transform group-hover:translate-x-1" size={20} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Bell size={20} className="text-red-500" /> Recent Updates
        </h2>
        <div className="space-y-6">
          {[
            { date: 'Today', text: 'Speaker lineup for afternoon sessions has been updated.' },
            { date: 'Yesterday', text: 'Exclusive TEDx hoodies are now available in the shop.' },
            { date: 'Oct 12', text: 'Your registration was successfully confirmed.' },
          ].map((activity, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
              <div>
                <p className="text-white text-sm md:text-base">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;

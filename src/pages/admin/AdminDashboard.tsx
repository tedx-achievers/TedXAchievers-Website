import { useEffect, useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const StatCard = ({ title, value, prefix = '', subText = '' }: { title: string, value: string | number, prefix?: string, subText?: string }) => (
  <div className="relative group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
    <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-mono mb-3 relative z-10">{title}</h3>
    <div className="text-4xl font-bold text-white tracking-tight relative z-10 flex items-baseline">
      {prefix && <span className="text-red-500/80 text-xl mr-2 font-mono font-medium">{prefix}</span>}
      {value}
    </div>
    {subText && <p className="text-gray-400 text-xs mt-2 font-mono relative z-10">{subText}</p>}
  </div>
);

const AdminDashboard = () => {
  const { getDashboardStats, isLoading, error } = useAdmin();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, [getDashboardStats]);

  if (isLoading && !stats) {
    return <div className="text-white animate-pulse">Loading overview...</div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-900/20 p-4 rounded-xl border border-red-500/20">{error}</div>;
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Overview</h1>
        <p className="text-gray-400 text-sm">Key metrics and statistics for TEDxAchievers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Registered" value={stats.totalRegistered} />
        <StatCard title="Total Verified" value={stats.totalVerified} />
        <StatCard title="Tickets Paid" value={stats.totalTicketsPaid} />
        <StatCard title="Checked In" value={stats.totalCheckedIn} subText={`Rate: ${stats.checkinRate}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 relative group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-mono mb-8 relative z-10">Revenue</h3>
          <div className="text-5xl font-bold text-white mb-10 tracking-tight relative z-10 flex items-baseline">
            {stats.totalRevenueNgn}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Student</p>
              <p className="text-white font-mono text-lg">{stats.revenueByTier?.student || 'NGN 0.00'}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">General</p>
              <p className="text-white font-mono text-lg">{stats.revenueByTier?.general || 'NGN 0.00'}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">VIP</p>
              <p className="text-white font-mono text-lg">{stats.revenueByTier?.vip || 'NGN 0.00'}</p>
            </div>
          </div>
        </div>

        <div className="relative group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-mono mb-6 relative z-10">Volunteers</h3>
          <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-gray-400 text-sm">Applications</span>
              <span className="text-white font-bold text-xl">{stats.totalVolunteerApplications}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-yellow-500/80 text-sm font-medium tracking-wide">Pending</span>
              <span className="text-white font-bold text-xl">{stats.pendingVolunteers}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-green-500/80 text-sm font-medium tracking-wide">Approved</span>
              <span className="text-green-400 font-bold text-xl">{stats.approvedVolunteers}</span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-red-500/80 text-sm font-medium tracking-wide">Rejected</span>
              <span className="text-red-400 font-bold text-xl">{stats.rejectedVolunteers}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-mono mb-6 relative z-10">Tickets by Tier</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Student</p>
            <p className="text-white font-mono text-3xl font-bold">{stats.ticketsByTier?.student || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">General</p>
            <p className="text-white font-mono text-3xl font-bold">{stats.ticketsByTier?.general || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">VIP</p>
            <p className="text-white font-mono text-3xl font-bold">{stats.ticketsByTier?.vip || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

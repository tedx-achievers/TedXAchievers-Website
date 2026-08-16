import { Outlet } from 'react-router-dom';
import DashboardNav from '../components/DashboardNav';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative pb-24">
      {/* Red ambient glows for background styling */}
      <div className="fixed top-0 left-1/4 w-[40rem] h-[40rem] bg-red-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <DashboardNav />
    </div>
  );
};

export default DashboardLayout;

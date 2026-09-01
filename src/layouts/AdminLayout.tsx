import { useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminLayout = () => {
  const { user, isAuthenticated, isLoading, checkAdminAuth, logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAdminAuth();
    }
  }, [isAuthenticated, checkAdminAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated or not an admin/volunteer
  if (!isAuthenticated || (user?.role?.toLowerCase() !== 'admin' && user?.role?.toLowerCase() !== 'volunteer')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: 'M4 6h16M4 12h16M4 18h7' },
    { name: 'Attendees', path: '/admin/dashboard/attendees', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { name: 'Volunteers', path: '/admin/dashboard/volunteers', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-mono relative overflow-hidden">
      {/* Premium Command Center Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-[#0a0a0a] to-[#000000] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-red-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="relative z-20 w-64 border-r border-white/10 bg-black/40 backdrop-blur-2xl flex flex-col hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-white/10">
          <Link to="/" className="inline-block relative group">
            <div className="absolute -inset-2 bg-red-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src="/logo-white.png" alt="TEDxAchievers Logo" className="h-6 object-contain relative z-10" />
          </Link>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]"></div>
            <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Admin Protocol</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm transition-all duration-300 relative overflow-hidden ${
                location.pathname === item.path 
                  ? 'bg-red-600/10 text-red-400 border border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.15)] font-bold' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {location.pathname === item.path && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />
              )}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-4 mb-6 px-2 text-sm text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 border border-red-500/50 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              {user?.name.charAt(0)}
            </div>
            <div className="truncate flex-1">
              <p className="text-white text-xs truncate font-bold tracking-wide">{user?.name}</p>
              <p className="text-[10px] uppercase text-red-400/80 tracking-widest mt-0.5">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-red-400 transition-colors"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

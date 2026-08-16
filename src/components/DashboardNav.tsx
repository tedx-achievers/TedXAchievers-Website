import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Ticket, ShoppingBag, User } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tickets', href: '/dashboard/tickets', icon: Ticket },
  { name: 'Shop', href: '/dashboard/shop', icon: ShoppingBag },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

const DashboardNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center">
      <nav className="bg-[#1a1a1a]/85 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-full px-2 py-2 w-full max-w-md">
        <ul className="flex justify-between items-center relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name} className="relative flex-1">
                <Link to={item.href} className="flex flex-col items-center justify-center py-2 relative">
                  
                  {/* Sliding Background "Squircle" */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-red-600/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    className={`relative z-10 flex flex-col items-center transition-colors duration-300 ${
                      isActive ? 'text-red-500' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className={`text-[10px] font-bold mt-1 tracking-tight ${
                      isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-200'
                    }`}>
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardNav;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, } from 'framer-motion';

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center py-24 px-4 overflow-hidden">
      {/* Dark overlay with slight blur for glassmorphism focus */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"></div>

      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#e62b1e] rounded-full blur-[150px] opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-red-900 rounded-full blur-[150px] opacity-20 pointer-events-none z-0" />

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden"
      >
        {/* Glow effect behind the card content */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#e62b1e] rounded-full blur-[80px] opacity-30 pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo-white.png" alt="TEDxAchievers Logo" className="h-8 object-contain mx-auto" />
          </Link>
          <h2 className="text-3xl font-black text-white uppercase tracking-wider">
            {isLogin ? 'Welcome Back' : 'Join the Story'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {isLogin ? 'Sign in to access your tickets and schedule.' : 'Register to secure your spot at TEDxAchievers.'}
          </p>
        </div>

        <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
          {isLogin ? (
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
                />
              </div>
            </div>
          )}

          {isLogin ? (
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Confirm</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#e62b1e] hover:bg-red-600 text-white font-bold py-4 rounded-full uppercase tracking-widest text-sm transition-all mt-6 hover:-translate-y-0.5"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center relative z-10 pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-white hover:text-[#e62b1e] font-semibold transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

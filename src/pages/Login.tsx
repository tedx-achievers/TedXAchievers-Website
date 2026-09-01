import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by useAuth hook and displayed via the error state
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center py-24 px-4 overflow-hidden">
      <SEO 
        title="Login | TEDxAchievers" 
        description="Sign in to your TEDxAchievers account." 
      />
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
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to access your tickets and dashboard.
          </p>
        </div>

        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-[#e62b1e] transition-colors">
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-[#e62b1e] text-white hover:bg-red-700'} border border-white/5 font-bold py-4 rounded-full uppercase tracking-widest text-sm transition-all mt-6`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center relative z-10 pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Don't have an account?
            <Link to="/register" className="ml-2 text-white hover:text-[#e62b1e] font-semibold transition-colors focus:outline-none">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

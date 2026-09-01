import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { useAuth } from '../../hooks/useAuth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      setSuccess(true);
      setTimeout(() => navigate('/reset-password', { state: { email } }), 3000);
    } catch (err) {
      // Error handled by useAuth
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center py-24 px-4 overflow-hidden">
      <SEO title="Forgot Password | TEDxAchievers" description="Reset your TEDxAchievers password." />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden"
      >
        <div className="text-center mb-8 relative z-10">
          <Link to="/login" className="inline-block mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white transition-colors"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h2 className="text-3xl font-black text-white uppercase tracking-wider">
            Reset Password
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Enter your email to receive a reset link.
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
            <h3 className="text-green-400 font-bold mb-2">Check your email</h3>
            <p className="text-gray-300 text-sm">If an account exists, a 6-digit reset code has been sent. Redirecting...</p>
          </div>
        ) : (
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="you@example.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={true}
              className={`w-full bg-[#333] text-gray-400 cursor-not-allowed border border-white/5 font-bold py-4 rounded-full uppercase tracking-widest text-sm transition-all mt-6`}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

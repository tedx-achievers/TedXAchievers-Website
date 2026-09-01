import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { useAuth } from '../../hooks/useAuth';

const SetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const { setPassword, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setValidationError("Invalid or missing setup token");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }

    try {
      await setPassword({ token, password: formData.password });
      navigate('/dashboard');
    } catch (err) {
      // Error handled by useAuth
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center py-24 px-4 overflow-hidden">
      <SEO title="Set Password | TEDxAchievers" description="Set your password for your new account." />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden"
      >
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-black text-white uppercase tracking-wider">
            Setup Account
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Welcome! Please set a password for your account.
          </p>
        </div>

        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
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
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {(error || validationError) && (
            <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              {validationError || error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading || !token || (formData.password !== formData.confirmPassword && formData.password.length > 0)}
            className={`w-full ${isLoading || !token || (formData.password !== formData.confirmPassword && formData.password.length > 0) ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-[#e62b1e] text-white hover:bg-red-700'} border border-white/5 font-bold py-4 rounded-full uppercase tracking-widest text-sm transition-all mt-6`}
          >
            {isLoading ? 'Setting up...' : 'Complete Setup'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SetPassword;

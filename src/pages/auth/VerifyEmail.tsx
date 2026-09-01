import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { useAuth } from '../../hooks/useAuth';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, resendVerification, isLoading, error, clearError } = useAuth();
  
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(location.state?.email || '');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResend = async () => {
    if (!email || resendCooldown > 0) return;
    setResendSuccess(false);
    clearError();
    try {
      await resendVerification({ email });
      setResendSuccess(true);
      setResendCooldown(60);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      // Error handled by useAuth
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyEmail({ email, code });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      // Error handled by useAuth
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/home_hero_bg.jpg')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center py-24 px-4 overflow-hidden">
      <SEO title="Verify Email | TEDxAchievers" description="Verify your email address." />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden"
      >
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-black text-white uppercase tracking-wider">
            Verify Email
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            We sent a 6-digit code to {email || 'your email'}. Enter it below.
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
            <h3 className="text-green-400 font-bold mb-2">Verified Successfully!</h3>
            <p className="text-gray-300 text-sm">Redirecting you to login...</p>
          </div>
        ) : (
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) clearError(); }}
                required
                placeholder="you@example.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Verification Code</label>
              <input 
                type="text" 
                name="code"
                value={code}
                onChange={(e) => { setCode(e.target.value); if (error) clearError(); }}
                required
                maxLength={6}
                placeholder="123456" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#e62b1e] focus:ring-1 focus:ring-[#e62b1e] transition-all text-center tracking-widest text-2xl"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            {resendSuccess && (
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                A new verification code has been sent.
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || code.length < 6 || !email}
              className={`w-full ${isLoading || code.length < 6 || !email ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-[#e62b1e] text-white hover:bg-red-700'} border border-white/5 font-bold py-4 rounded-full uppercase tracking-widest text-sm transition-all mt-6`}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="mt-6 text-center">
              <button 
                type="button"
                onClick={handleResend}
                disabled={isLoading || resendCooldown > 0 || !email}
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 
                  ? `Resend code in ${resendCooldown}s` 
                  : "Didn't receive code? Resend"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;

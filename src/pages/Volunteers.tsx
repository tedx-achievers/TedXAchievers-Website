import React, { useState } from 'react';

const Volunteers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    matric: '',
    role: '',
    reason: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{ referenceCode: string } | null>(null);

  const [checkEmail, setCheckEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const [changeEmail, setChangeEmail] = useState('');
  const [changeRole, setChangeRole] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const [changeResult, setChangeResult] = useState<string | null>(null);
  const [changeError, setChangeError] = useState<string | null>(null);

  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      department: formData.department,
      matricNumber: formData.matric,
      preferredRole: formData.role,
      motivation: formData.reason,
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://tedxachievers-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/volunteers/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Application failed. Please try again.";
        if (response.status === 422) {
          errorMessage = "Please check your details. ";
          if (data.message?.includes('email')) errorMessage += "The email address is invalid.";
          else if (data.message?.includes('motivation')) errorMessage += "Your motivation must be at least 20 characters.";
          else errorMessage += data.message || "Some fields are missing or invalid.";
        } else if (response.status === 409) {
          if (data.message?.includes('department')) {
            errorMessage = "Sorry, this department is full! Please select another department or role.";
          } else if (data.message?.includes('limit')) {
            errorMessage = data.message;
          } else {
            errorMessage = "You have already submitted an application with this email address.";
          }
        } else if (response.status === 429) {
          errorMessage = "You're trying too quickly! Please wait a minute and try again.";
        } else if (response.status === 413) {
          errorMessage = "Your submission is too large. Please shorten your motivation.";
        } else if (data.message) {
          errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }

      setSubmitSuccess({ referenceCode: data.referenceCode });
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        matric: '',
        role: '',
        reason: ''
      });
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setCheckError(null);
    setCheckResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://tedxachievers-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/volunteers/me?email=${encodeURIComponent(checkEmail)}`);
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Could not check application status.";
        if (response.status === 404) {
          errorMessage = "We couldn't find an application with this email. Please check for typos.";
        } else if (response.status === 429) {
          errorMessage = "You're trying too quickly! Please wait a minute and try again.";
        } else if (data.message) {
          errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }

      setCheckResult(data);
    } catch (err: any) {
      setCheckError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleChangeRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChanging(true);
    setChangeError(null);
    setChangeResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://tedxachievers-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/volunteers/change-role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: changeEmail, preferredRole: changeRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change role.");
      }

      setChangeResult(data.message || "Role updated successfully.");
      setChangeRole('');
    } catch (err: any) {
      setChangeError(err.message || "An unexpected error occurred.");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="min-h-screen pt-[35%]  md:pt-[10%] pb-10 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dark overlay fading to black to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-[#050505] z-0"></div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
            [ Join The Team ]
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Become a Volunteer
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Help us bring TEDxAchievers to life. We're looking for passionate individuals to join our crew, shape the experience, and be part of something extraordinary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-7xl mx-auto my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="phone" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="+1 (234) 567-8900"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="department" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="matric" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Matric Number</label>
              <input
                type="text"
                id="matric"
                name="matric"
                value={formData.matric}
                onChange={handleChange}
                required
                className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="e.g. AU/1234/2026"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="role" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Preferred Role</label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm appearance-none w-full"
                >
                  <option value="" disabled>Select a role...</option>
                  <option value="technical">Technical</option>
                  <option value="videography">Videography</option>
                  <option value="photography">Photography</option>
                  <option value="content">Content</option>
                  <option value="protocol_and_ushering">Protocol & Ushering</option>
                  <option value="welfare">Welfare</option>
                  <option value="graphic_and_design">Graphic & Design</option>
                  <option value="venue_and_decoration">Venue & Decoration</option>
                  <option value="partnership_and_sponsorship">Partnership & Sponsorship</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-10">
            <label htmlFor="reason" className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">Why do you want to volunteer?</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm resize-none placeholder:text-gray-700"
              placeholder="Tell us about your motivation..."
            />
          </div>

          {submitError && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="mb-6 p-6 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
              <h3 className="text-green-400 font-bold mb-2">Application Successful!</h3>
              <p className="text-gray-300 text-sm mb-4">Please save your reference code:</p>
              <div className="bg-black/50 p-3 rounded font-mono text-xl text-white tracking-wider inline-flex items-center gap-3">
                <span>{submitSuccess.referenceCode}</span>
                <button 
                  type="button" 
                  onClick={() => handleCopy(submitSuccess.referenceCode)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Copy Reference Code"
                >
                  {isCopied ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'} border border-white/5 px-6 py-3 rounded-full transition-colors font-semibold tracking-wide text-lg`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {/* Change Role Section */}
        <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-7xl mx-auto my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              Change Preferred Role
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              Need to change your unit? Enter your email and select your new preferred role.
            </p>
            <div className="mt-4 inline-block px-4 py-2 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-xs font-mono">
              Note: You can only change your preferred role once.
            </div>
          </div>

          <form onSubmit={handleChangeRoleSubmit} className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={changeEmail}
                onChange={(e) => setChangeEmail(e.target.value)}
                required
                className="flex-1 bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="Enter your email address"
              />
              <div className="relative flex-1">
                <select
                  value={changeRole}
                  onChange={(e) => setChangeRole(e.target.value)}
                  required
                  className="bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm appearance-none w-full h-full"
                >
                  <option value="" disabled>Select new role...</option>
                  <option value="technical">Technical</option>
                  <option value="videography">Videography</option>
                  <option value="photography">Photography</option>
                  <option value="content">Content</option>
                  <option value="protocol_and_ushering">Protocol & Ushering</option>
                  <option value="welfare">Welfare</option>
                  <option value="graphic_and_design">Graphic & Design</option>
                  <option value="venue_and_decoration">Venue & Decoration</option>
                  <option value="partnership_and_sponsorship">Partnership & Sponsorship</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
              <button 
                type="submit"
                disabled={isChanging}
                className={`md:w-auto w-full whitespace-nowrap ${isChanging ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-200 text-black cursor-pointer'} px-8 py-4 rounded-xl transition-colors font-semibold tracking-wide`}
              >
                {isChanging ? 'Updating...' : 'Update Role'}
              </button>
            </div>

            {changeError && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                {changeError}
              </div>
            )}

            {changeResult && (
              <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                {changeResult}
              </div>
            )}
          </form>
        </div>

        {/* Check Status Section */}
        <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-7xl mx-auto my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              Check Application Status
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              Already applied? Enter your email to check your status.
            </p>
          </div>

          <form onSubmit={handleCheckStatus} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
                required
                className="flex-1 bg-[#151515] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-mono text-sm placeholder:text-gray-700"
                placeholder="Enter your email address"
              />
              <button 
                type="submit"
                disabled={isChecking}
                className={`md:w-auto w-full whitespace-nowrap ${isChecking ? 'bg-[#333] text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-200 text-black cursor-pointer'} px-8 py-4 rounded-xl transition-colors font-semibold tracking-wide`}
              >
                {isChecking ? 'Checking...' : 'Check Status'}
              </button>
            </div>

            {checkError && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                {checkError}
              </div>
            )}

            {checkResult && (
              <div className="mt-6 p-6 bg-[#151515] border border-white/10 rounded-xl">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-mono mb-1">Applicant</p>
                    <p className="text-white font-medium">{checkResult.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-mono mb-1">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                      checkResult.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      checkResult.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      checkResult.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {checkResult.status || 'Unknown'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">Role</p>
                    <p className="text-gray-300 capitalize">{checkResult.preferredRole?.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">Department</p>
                    <p className="text-gray-300">{checkResult.department}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs uppercase mb-1">Reference Code</p>
                    <div className="inline-flex items-center gap-3 bg-black/50 px-3 py-2 rounded">
                      <p className="text-white tracking-widest font-bold">{checkResult.referenceCode}</p>
                      <button 
                        type="button" 
                        onClick={() => handleCopy(checkResult.referenceCode)}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Copy Reference Code"
                      >
                        {isCopied ? (
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;

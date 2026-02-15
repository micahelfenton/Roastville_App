import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Coffee, Mail, Lock, User, Store, AlertCircle } from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    shopCode: "ROASTVILLE", // Default to Roastville
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!formData.email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.shopCode.trim()) {
      setError("Please enter a shop code");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await signup(
        formData.email.trim(),
        formData.password,
        formData.fullName.trim(),
        formData.shopCode.trim().toUpperCase()
      );
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.error || "Failed to create account. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 green-brick-bg relative">
      {/* Centered Watermark for Mobile */}
      <div className="brick-watermark-center" style={{ display: 'none' }}>
        <div className="brick-watermark-text">
          <span>ROASTVILLE</span>
          <span>COFFEE</span>
          <span>ROASTERS</span>
        </div>
      </div>

      {/* Atmospheric coffee steam */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-5">
        <div className="coffee-steam-1"></div>
        <div className="coffee-steam-2"></div>
        <div className="coffee-steam-3"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphism Card */}
        <div className="glass-card rounded-3xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="p-8 pb-6 relative">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-2xl shadow-lg">
                <Coffee className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 className="font-display text-3xl text-white text-center mb-2 tracking-tight">
              Join Roastville
            </h1>
            <p className="text-sm text-white/70 text-center font-light">
              Create your account and start your coffee journey
            </p>
          </div>

          <div className="px-8 pb-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <p className="text-sm text-emerald-200 text-center">
                  ✓ Account created! Redirecting to login...
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="John Doe"
                    disabled={loading || success}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    placeholder="you@example.com"
                    disabled={loading || success}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    disabled={loading || success}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    required
                    placeholder="Re-enter password"
                    disabled={loading || success}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Shop Code */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Shop Code
                </label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    name="shopCode"
                    value={formData.shopCode}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="ROASTVILLE"
                    disabled={loading || success}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200 disabled:opacity-50 uppercase"
                  />
                </div>
                <p className="text-xs text-white/50">
                  Enter your coffee shop's code (provided by the shop)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </span>
                ) : success ? (
                  '✓ Account Created!'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-white/5 border-t border-white/10 backdrop-blur-sm">
            <p className="text-sm text-white/70 text-center">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Subtle tagline */}
        <p className="text-center mt-6 text-white/50 text-xs font-light">
          Crafted with care, served with pride
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Coffee, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/home";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = await login(email.trim(), password, remember);
    setLoading(false);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid credentials — please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 green-brick-bg relative">
      {/* Roastville Watermark - Text on Left Side (Desktop only) */}
      <div className="brick-watermark-left">
        <div className="brick-watermark-text">
          <span>ROASTVILLE</span>
          <span>COFFEE</span>
          <span>ROASTERS</span>
        </div>
      </div>
      
      {/* Roastville Watermark - Coffee Cup on Right Side (Desktop only) */}
      <div className="brick-watermark-right">
        <div className="brick-watermark-cup">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Coffee Cup Outline */}
            <path d="M 50 80 L 60 160 Q 100 170 140 160 L 150 80 Z" />
            {/* Cup Handle */}
            <path d="M 150 100 Q 170 100 170 120 Q 170 140 150 140" fill="none" />
            {/* Coffee Level */}
            <path d="M 55 95 L 62 150 Q 100 158 138 150 L 145 95 Z" opacity="0.3" />
            {/* Steam Lines (animated) */}
            <path className="watermark-steam" d="M 75 70 Q 70 50 75 30" />
            <path className="watermark-steam" d="M 100 65 Q 100 45 105 25" />
            <path className="watermark-steam" d="M 125 70 Q 130 50 125 30" />
          </svg>
        </div>
      </div>
      
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
        {/* Premium Glassmorphism Card */}
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Header with Roastville branding */}
          <div className="p-8 pb-6 relative">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-2xl shadow-lg">
                <Coffee className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 className="font-display text-3xl text-white text-center mb-2 tracking-tight">
              Welcome to Roastville
            </h1>
            <p className="text-sm text-white/70 text-center font-light">
              Your premium coffee journey awaits
            </p>
          </div>

          <div className="px-8 pb-8">
            {/* Social login options */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-white/95 hover:bg-white text-gray-800 font-medium text-sm flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => alert('Google login coming soon')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-transparent text-white/60 font-light">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={submit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm text-white/90 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-400 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="group-hover:text-white transition-colors">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-white/5 border-t border-white/10 backdrop-blur-sm">
            <p className="text-sm text-white/70 text-center">
              New to Roastville?{' '}
              <a
                href="/register"
                className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors"
              >
                Create an account
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

export default Login;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: `
      /* Base brick color with subtle noise */
      repeating-linear-gradient(
        90deg,
        #1a6d44 0px,
        #1a6d44 0.5px,
        #1d7548 0.5px,
        #1d7548 1px
      ),
      repeating-linear-gradient(
        0deg,
        #1a6d44 0px,
        #1a6d44 0.5px,
        #1d7548 0.5px,
        #1d7548 1px
      ),
      /* Vertical mortar lines */
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 95px,
        #0d3d25 95px,
        #0d3d25 100px
      ),
      /* Horizontal mortar lines - main rows */
      repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 55px,
        #0d3d25 55px,
        #0d3d25 60px
      ),
      /* Offset horizontal mortar lines - alternating rows */
      repeating-linear-gradient(
        0deg,
        transparent 120px,
        transparent 175px,
        #0d3d25 175px,
        #0d3d25 180px
      ),
      /* Brick color gradient */
      linear-gradient(135deg, #165c37 0%, #1d7548 50%, #1a6d44 100%)
    `, backgroundSize: '2px 2px, 2px 2px, 100px 60px, 100px 120px, 100px 120px, 100% 100%', backgroundPosition: '0 0, 0 0, 0 0, 0 0, 50px 60px, 0 0' }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(180deg,rgba(22,59,47,0.95),rgba(17,64,46,0.95))' }}>
          <div className="p-6">
            <h2 className="font-display text-2xl text-white mb-1">Welcome back</h2>
            <p className="text-sm text-white/80 mb-6">Sign in to your Roastville account</p>

            {/* Social login options */}
            <div className="space-y-2 mb-6">
              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-white text-gray-800 font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                onClick={() => alert('Google login coming soon')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-b from-[rgba(22,59,47,0.95)] to-[rgba(17,64,46,0.95)] text-white/60">or continue with email</span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="text-sm text-white/80">Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full rounded-lg px-3 py-2 text-black" />
              </label>

              <label className="block">
                <span className="text-sm text-white/80">Password</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 w-full rounded-lg px-3 py-2 text-black" />
              </label>

                <div className="flex items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-white/80">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded" />
                    Remember me
                  </label>
                  <div className="pt-2 flex-1">
                    <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-[#1B4D3E] text-white font-medium">
                      {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                  </div>
                </div>

              {error && <p className="text-xs text-red-300 mt-2">{error}</p>}
            </form>
          </div>
          <div className="p-4 bg-white/4 border-t border-white/6">
            <p className="text-xs text-white/80">Don’t have an account? <a href="/register" className="underline">Create one</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

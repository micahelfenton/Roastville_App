import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      navigate('/login');
    } catch (err) {
      // noop
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="p-6">
            <h2 className="font-display text-2xl mb-1">Create account</h2>
            <p className="text-sm text-muted-foreground mb-4">Join Roastville</p>

            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg px-3 py-2" />
              </label>

              <label className="block">
                <span className="text-sm text-muted-foreground">Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full rounded-lg px-3 py-2" />
              </label>

              <label className="block">
                <span className="text-sm text-muted-foreground">Password</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 w-full rounded-lg px-3 py-2" />
              </label>

              <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-[#1B4D3E] text-white font-medium">
                  {loading ? 'Creating…' : 'Create account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

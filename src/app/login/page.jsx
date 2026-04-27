'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Shield, 
  ArrowRight,
  Fingerprint,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for error in URL (from NextAuth)
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam === 'CredentialsSignin' ? 'Invalid username or password' : 'Authentication failed');
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: '/admin'
      });

      if (result?.error) {
        setError('Invalid username or password');
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      console.error(err);
    }
  };

  const inputClasses = `
    w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-white/30 
    focus:outline-none focus:border-[#fffa00]/50 focus:bg-white/10
    focus:ring-2 focus:ring-[#fffa00]/20
    transition-all duration-300
  `;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#fffa00]/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#fffa00]/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-white/5 blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Golden Ratio Container - 1:1.618 */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Card with Golden Ratio proportions */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-[#fffa00]/10 rounded-[2rem] blur-xl opacity-60" />

          <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden">
            {/* Header Section - Golden Ratio: 61.8% content, 38.2% visual */}
            <div className="p-8 pb-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#fffa00]/10
                                border border-white/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#fffa00]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">MRR CMS</h1>
                  <p className="text-white/50 text-sm">Secure Admin Access</p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 
                                text-red-300 text-sm flex items-start gap-3 animate-pulse">
                  <Fingerprint className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 
                                    flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClasses}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 
                                    flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClasses} pr-12`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 
                                 hover:text-white/60 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button - Golden Ratio proportions */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 group relative overflow-hidden rounded-xl 
                           bg-[#fffa00]
                           px-6 py-4 font-semibold text-black
                           transition-all duration-300
                           hover:shadow-[0_0_40px_-10px_rgba(255,250,0,0.5)]
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Access Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-[#fff500]
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>

            {/* Footer Section - 38.2% */}
            <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <Link 
                  href="/"
                  className="text-white/40 hover:text-[#fffa00] transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" />
                  Back to Home
                </Link>
                <span className="text-white/30 flex items-center gap-1.5">
                  <Fingerprint className="w-3 h-3" />
                  Secure Connection
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Golden Ratio decorative elements */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <span className="uppercase tracking-[0.3em]">Golden Ratio Design</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

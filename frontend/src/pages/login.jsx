import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const PasswordInput = ({ value, onChange, placeholder, showPassword, setShowPassword }) => (
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] focus:border-transparent transition-all duration-300"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
    >
      <Icon name={showPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
    </button>
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // TODO: connect API endpoint using src/config/api.js
      // const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe })
      // });

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token';
      localStorage.setItem('authToken', mockToken);
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: connect API endpoint using src/config/api.js
      // window.location.href = `${API_BASE_URL}${API_ENDPOINTS.AUTH_GOOGLE}`;
      
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.google.token';
      localStorage.setItem('authToken', mockToken);
      navigate('/');
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4"
            >
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop&auto=format"
                alt="hi logo"
                className="w-20 h-20 mx-auto rounded-2xl object-cover shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/120x120/5E6AD2/ffffff?text=hi';
                }}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/60"
            >
              Sign in to your account to continue
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white/80">
                    Email address
                  </label>
                  <div className="relative">
                    <Icon name="Mail" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/20 outline-none transition-all duration-300 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-white/80">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#00D4FF] hover:text-white transition-colors duration-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/20 bg-white/5"
                    />
                    <span className="text-sm text-white/80">Remember me</span>
                  </label>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#050506] text-white/40">Or continue with</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <img
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=20&h=20&fit=crop&auto=format"
                    alt="Google"
                    className="w-5 h-5 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/20x20/ffffff/333333?text=G';
                    }}
                  />
                  Continue with Google
                </motion.button>

                <div className="text-center">
                  <p className="text-sm text-white/60">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-[#00D4FF] hover:text-white transition-colors duration-300"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 p-8 bg-gradient-to-br from-[#5E6AD2]/10 to-[#7C3AED]/10 border border-white/10 rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto"
                >
                  <Icon name="Check" className="w-8 h-8 text-white" />
                </motion.div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">Success!</h2>
                  <p className="text-white/60 text-sm">
                    Redirecting to dashboard...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
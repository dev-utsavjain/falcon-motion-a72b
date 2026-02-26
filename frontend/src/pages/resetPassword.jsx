import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => {
  const navLinks = [
    { name: 'Dashboard', path: '/', navOrder: 1 },
    { name: 'Users', path: '/users', navOrder: 2 },
    { name: 'Analytics', path: '/analytics', navOrder: 3 },
    { name: 'Settings', path: '/settings', navOrder: 4 }
  ].sort((a, b) => a.navOrder - b.navOrder);

  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED] rounded-lg flex items-center justify-center">
              <Icon name="Zap" className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">hi</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.path}
                href={link.path}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#050506] border-t border-white/10 mt-auto">
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED] rounded flex items-center justify-center">
            <Icon name="Zap" className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/70 text-sm">© 2024 hi. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-white/50 hover:text-white/70 text-sm transition-colors">Privacy</a>
          <a href="#" className="text-white/50 hover:text-white/70 text-sm transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

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

const PasswordRequirements = () => (
  <div className="mt-2 text-xs text-white/50 space-y-1">
    <p>Password must contain:</p>
    <ul className="list-disc list-inside space-y-0.5 ml-1">
      <li>At least 8 characters</li>
      <li>One uppercase letter</li>
      <li>One lowercase letter</li>
      <li>One number or special character</li>
    </ul>
  </div>
);

const SuccessMessage = ({ onLoginRedirect }) => (
  <div className="text-center space-y-4">
    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
      <Icon name="Check" className="w-8 h-8 text-green-400" />
    </div>
    <h3 className="text-xl font-semibold text-white">Password Reset Successful!</h3>
    <p className="text-white/60">Your password has been updated. You can now log in with your new password.</p>
    <button
      onClick={onLoginRedirect}
      className="px-6 py-2 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white rounded-lg hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 active:scale-95"
    >
      Go to Login
    </button>
  </div>
);

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid reset token');
    }
  }, [token]);

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(pwd);
    return minLength && hasUpper && hasLower && hasNumberOrSpecial;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password does not meet requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // TODO: connect API endpoint using src/config/api.js
      // const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.RESET_PASSWORD}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, password })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050506] flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Key" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-white/60">Enter your new password below</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5E6AD2]/20 to-[#7C3AED]/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {success ? (
                <SuccessMessage onLoginRedirect={handleLoginRedirect} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      New Password
                    </label>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                    <PasswordRequirements />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      showPassword={showConfirmPassword}
                      setShowPassword={setShowConfirmPassword}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <Icon name="AlertCircle" className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !token}
                    className="w-full py-3 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Loader2" className="w-4 h-4 animate-spin" />
                        Resetting...
                      </div>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              Back to Login
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
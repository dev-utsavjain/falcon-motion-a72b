import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const PasswordStrengthIndicator = ({ strength }) => {
  const getStrength = () => {
    if (strength === 0) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (strength === 1) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
  };

  const { label, color, width } = getStrength();

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/60">Password strength</span>
        <span className={`text-xs font-medium ${color.replace('bg-', 'text-')}`}>{label}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: width === 'w-1/3' ? '33%' : width === 'w-2/3' ? '66%' : '100%' }}
          transition={{ duration: 0.3 }}
          className={`${color} h-1 rounded-full`}
        />
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    if (name === 'password') {
      setPasswordStrength(validatePasswordStrength(value));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // TODO: connect API endpoint using src/config/api.js
      // const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_REGISTER}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password
      //   })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // TODO: connect API endpoint using src/config/api.js
      // window.location.href = `${API_BASE_URL}${API_ENDPOINTS.AUTH_GOOGLE}`;
      console.log('Google signup initiated');
    } catch (error) {
      console.error('Google signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="UserPlus" className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-white/60">Join us and start your journey</p>
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Account created successfully! Redirecting...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-[#5E6AD2]/50'
                  }`}
                  placeholder="Enter your full name"
                />
                <Icon name="User" className="absolute right-4 top-3.5 w-5 h-5 text-white/40" />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-[#5E6AD2]/50'
                  }`}
                  placeholder="Enter your email address"
                />
                <Icon name="Mail" className="absolute right-4 top-3.5 w-5 h-5 text-white/40" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-[#5E6AD2]/50'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-white/40 hover:text-white transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                </button>
              </div>
              {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-[#5E6AD2]/50'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-white/40 hover:text-white transition-colors"
                >
                  <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-3"
            >
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#5E6AD2] focus:ring-[#5E6AD2]/50"
              />
              <label htmlFor="terms" className="text-sm text-white/80">
                I agree to the <a href="#" className="text-[#5E6AD2] hover:underline">Terms of Service</a> and <a href="#" className="text-[#5E6AD2] hover:underline">Privacy Policy</a>
              </label>
            </motion.div>
            {errors.terms && <p className="mt-1 text-sm text-red-400">{errors.terms}</p>}

            {errors.submit && <p className="text-sm text-red-400 text-center">{errors.submit}</p>}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" className="w-5 h-5" />
                  Create Account
                </>
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative flex items-center justify-center my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative bg-[#050506] px-4 text-sm text-white/60">or continue with</div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=24&h=24&fit=crop&auto=format"
                alt="Google"
                className="w-5 h-5"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/24x24/ffffff/000000?text=G';
                }}
              />
              Continue with Google
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center text-sm text-white/60"
            >
              Already have an account?{' '}
              <Link to="/login" className="text-[#5E6AD2] hover:underline font-medium">
                Sign in
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
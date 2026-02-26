import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    // TODO: connect API endpoint using src/config/api.js
    // const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_FORGOT_PASSWORD}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
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
              Reset your password
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/60"
            >
              Enter your email and we'll send you a link to reset your password
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!success ? (
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
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/20 outline-none transition-all duration-300 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="w-5 h-5" />
                      Send reset link
                    </>
                  )}
                </motion.button>

                <div className="space-y-4">
                  <p className="text-xs text-white/40 text-center">
                    You can only request a password reset once every 15 minutes.
                  </p>
                  
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-white transition-colors duration-300 text-sm"
                    >
                      <Icon name="ArrowLeft" className="w-4 h-4" />
                      Back to login
                    </Link>
                  </div>
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
                  <h2 className="text-xl font-semibold text-white">Check your email</h2>
                  <p className="text-white/60 text-sm">
                    We've sent a password reset link to <strong className="text-white">{email}</strong>
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white/60 text-sm">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setEmail('');
                      }}
                      className="text-[#00D4FF] hover:text-white transition-colors"
                    >
                      try again
                    </button>
                  </p>
                </div>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-white transition-colors duration-300"
                >
                  <Icon name="ArrowLeft" className="w-4 h-4" />
                  Return to login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
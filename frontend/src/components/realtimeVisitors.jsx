import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function RealtimeVisitors() {
  const [count, setCount] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#5E6AD2]/20 to-[#7C3AED]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white/70 text-sm font-medium">Real-time Visitors</h3>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span className="text-green-400 text-xs">Live</span>
        </div>
      </div>
      <motion.div
        key={count}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold text-white"
      >
        {count.toLocaleString()}
      </motion.div>
      <p className="text-white/50 text-xs mt-1">Active users on site</p>
    </motion.div>
  );
}
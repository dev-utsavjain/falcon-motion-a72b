import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const countries = [
  { code: 'US', name: 'United States', users: 4560, x: 20, y: 35 },
  { code: 'GB', name: 'United Kingdom', users: 2340, x: 48, y: 28 },
  { code: 'DE', name: 'Germany', users: 1890, x: 52, y: 30 },
  { code: 'FR', name: 'France', users: 1650, x: 50, y: 32 },
  { code: 'CA', name: 'Canada', users: 1420, x: 22, y: 25 },
  { code: 'AU', name: 'Australia', users: 980, x: 78, y: 70 },
  { code: 'BR', name: 'Brazil', users: 760, x: 32, y: 60 },
  { code: 'IN', name: 'India', users: 650, x: 68, y: 42 },
  { code: 'JP', name: 'Japan', users: 540, x: 82, y: 35 },
  { code: 'MX', name: 'Mexico', users: 420, x: 18, y: 45 }
];

export default function GeoMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Geographic Distribution</h3>
        <Icon name="Globe" className="w-5 h-5 text-white/50" />
      </div>
      <div className="relative w-full h-64 bg-gradient-to-b from-[#5E6AD2]/10 to-[#7C3AED]/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format')] bg-cover bg-center opacity-20" />
        {countries.map((country, index) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="absolute group cursor-pointer"
            style={{ left: `${country.x}%`, top: `${country.y}%` }}
          >
            <div className="w-3 h-3 bg-[#00D4FF] rounded-full animate-pulse" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#050506] px-3 py-2 rounded-lg border border-white/10 text-white text-xs whitespace-nowrap">
                <div className="font-medium">{country.name}</div>
                <div className="text-white/70">{country.users.toLocaleString()} users</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {countries.slice(0, 6).map(country => (
          <div key={country.code} className="flex items-center justify-between">
            <span className="text-white/70 text-sm">{country.code}</span>
            <span className="text-white font-medium text-sm">{country.users.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
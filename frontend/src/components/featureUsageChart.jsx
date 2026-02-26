import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const featureData = [
  { name: 'Dashboard', usage: 3420, color: '#5E6AD2' },
  { name: 'Reports', usage: 2890, color: '#7C3AED' },
  { name: 'Analytics', usage: 2560, color: '#00D4FF' },
  { name: 'Users', usage: 1980, color: '#F59E0B' },
  { name: 'Settings', usage: 1650, color: '#10B981' },
  { name: 'API', usage: 1420, color: '#EF4444' },
  { name: 'Billing', usage: 1180, color: '#8B5CF6' },
  { name: 'Support', usage: 980, color: '#F97316' },
  { name: 'Integrations', usage: 760, color: '#06B6D4' },
  { name: 'Export', usage: 540, color: '#84CC16' }
];

export default function FeatureUsageChart() {
  const maxUsage = Math.max(...featureData.map(f => f.usage));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Feature Usage</h3>
        <Icon name="BarChart3" className="w-5 h-5 text-white/50" />
      </div>
      <div className="space-y-3">
        {featureData.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/80 text-sm">{feature.name}</span>
              <span className="text-white font-medium text-sm">{feature.usage.toLocaleString()}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(feature.usage / maxUsage) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
                className="h-2.5 rounded-full group-hover:opacity-80 transition-opacity"
                style={{ backgroundColor: feature.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
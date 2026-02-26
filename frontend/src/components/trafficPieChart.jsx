import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const trafficData = [
  { name: 'Direct', value: 42, color: '#5E6AD2' },
  { name: 'Organic', value: 31, color: '#7C3AED' },
  { name: 'Referral', value: 18, color: '#00D4FF' },
  { name: 'Social', value: 9, color: '#F59E0B' }
];

const PieSlice = ({ data, index }) => {
  const angle = (data.value / 100) * 360;
  const startAngle = trafficData.slice(0, index).reduce((acc, d) => acc + (d.value / 100) * 360, 0);
  const endAngle = startAngle + angle;
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const x1 = cx + radius * Math.cos(Math.PI * startAngle / 180);
  const y1 = cy + radius * Math.sin(Math.PI * startAngle / 180);
  const x2 = cx + radius * Math.cos(Math.PI * endAngle / 180);
  const y2 = cy + radius * Math.sin(Math.PI * endAngle / 180);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <motion.path
      d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
      fill={data.color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="hover:opacity-80 transition-opacity cursor-pointer"
    />
  );
};

export default function TrafficPieChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Traffic Sources</h3>
        <Icon name="PieChart" className="w-5 h-5 text-white/50" />
      </div>
      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          {trafficData.map((data, index) => (
            <PieSlice key={data.name} data={data} index={index} />
          ))}
          <circle cx="100" cy="100" r="40" fill="#050506" />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {trafficData.map(item => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-white/70 text-sm">{item.name}</span>
            <span className="text-white font-medium ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const cohortData = [
  { week: 'W1', cohorts: [100, 85, 72, 61, 52, 44, 38] },
  { week: 'W2', cohorts: [100, 83, 69, 57, 48, 41] },
  { week: 'W3', cohorts: [100, 87, 74, 63, 54] },
  { week: 'W4', cohorts: [100, 84, 70, 59] },
  { week: 'W5', cohorts: [100, 86, 73] },
  { week: 'W6', cohorts: [100, 82] },
  { week: 'W7', cohorts: [100] }
];

const getColor = (value) => {
  if (value >= 80) return 'bg-[#5E6AD2]';
  if (value >= 60) return 'bg-[#7C3AED]';
  if (value >= 40) return 'bg-[#00D4FF]';
  if (value >= 20) return 'bg-[#F59E0B]';
  return 'bg-white/10';
};

export default function RetentionCohortChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">User Retention Cohort</h3>
        <Icon name="Users" className="w-5 h-5 text-white/50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-white/50 pb-2">Cohort</th>
              {[0, 1, 2, 3, 4, 5, 6].map(week => (
                <th key={week} className="text-center text-white/50 pb-2 min-w-[60px]">W{week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row, i) => (
              <tr key={row.week}>
                <td className="text-white/70 py-1">{row.week}</td>
                {row.cohorts.map((value, j) => (
                  <td key={j} className="p-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: (i + j) * 0.05 }}
                      className={`w-full h-8 rounded-lg flex items-center justify-center text-white font-medium ${getColor(value)}`}
                    >
                      {value}%
                    </motion.div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
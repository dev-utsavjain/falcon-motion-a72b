import { useState } from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const presets = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Custom', days: null }
];

export default function AnalyticsDatePicker({ onChange }) {
  const [selected, setSelected] = useState(presets[0]);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const handleSelect = (preset) => {
    setSelected(preset);
    if (preset.days) {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - preset.days);
      onChange({ start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] });
    }
  };

  const handleCustom = () => {
    if (customStart && customEnd) {
      onChange({ start: customStart, end: customEnd });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex bg-white/5 rounded-2xl p-1">
        {presets.map(preset => (
          <button
            key={preset.label}
            onClick={() => handleSelect(preset)}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
              selected.label === preset.label
                ? 'bg-[#5E6AD2] text-white shadow-lg'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
      {selected.label === 'Custom' && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={customStart}
            onChange={e => setCustomStart(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]"
          />
          <span className="text-white/40">to</span>
          <input
            type="date"
            value={customEnd}
            onChange={e => setCustomEnd(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]"
          />
          <button
            onClick={handleCustom}
            className="p-2 bg-[#5E6AD2] rounded-xl text-white hover:bg-[#7C3AED] transition-colors duration-300"
          >
            <Icon name="Check" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
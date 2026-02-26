import { useState } from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const metrics = [
  'Page Views', 'Unique Visitors', 'Bounce Rate', 'Session Duration',
  'Conversion Rate', 'Revenue', 'Transactions', 'AOV', 'CAC', 'LTV'
];

const dimensions = [
  'Date', 'Country', 'Device', 'Source', 'Campaign', 'Product', 'Channel', 'Referrer'
];

export default function ReportBuilder({ onGenerate }) {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [reportName, setReportName] = useState('');

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev =>
      prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]
    );
  };

  const toggleDimension = (dimension) => {
    setSelectedDimensions(prev =>
      prev.includes(dimension) ? prev.filter(d => d !== dimension) : [...prev, dimension]
    );
  };

  const handleGenerate = () => {
    if (selectedMetrics.length && selectedDimensions.length && reportName) {
      onGenerate({ metrics: selectedMetrics, dimensions: selectedDimensions, name: reportName });
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Custom Report Builder</h3>
        <Icon name="FileBarChart" className="w-5 h-5 text-white/50" />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Report Name</label>
          <input
            type="text"
            value={reportName}
            onChange={e => setReportName(e.target.value)}
            placeholder="Enter report name"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]"
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Metrics</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {metrics.map(metric => (
              <button
                key={metric}
                onClick={() => toggleMetric(metric)}
                className={`px-3 py-2 text-sm rounded-xl border transition-all duration-300 ${
                  selectedMetrics.includes(metric)
                    ? 'bg-[#5E6AD2] border-[#5E6AD2] text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Dimensions</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {dimensions.map(dimension => (
              <button
                key={dimension}
                onClick={() => toggleDimension(dimension)}
                className={`px-3 py-2 text-sm rounded-xl border transition-all duration-300 ${
                  selectedDimensions.includes(dimension)
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {dimension}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!selectedMetrics.length || !selectedDimensions.length || !reportName}
          className="w-full py-2.5 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}
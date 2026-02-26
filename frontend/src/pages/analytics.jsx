import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const DatePicker = ({ dateRange, setDateRange }) => {
  const presets = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 }
  ];

  const handlePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  return (
    <div className="flex items-center gap-3">
      {presets.map((preset) => (
        <motion.button
          key={preset.label}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handlePreset(preset.days)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 text-sm"
        >
          {preset.label}
        </motion.button>
      ))}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition-all duration-300 text-sm"
        />
        <span className="text-white/60">to</span>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition-all duration-300 text-sm"
        />
      </div>
    </div>
  );
};

const TrafficPieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">Traffic Sources</h2>
        <Icon name="Globe" className="w-5 h-5 text-white/60" />
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
              const endAngle = startAngle + (item.value / total) * 360;
              const largeArcFlag = (item.value / total) * 360 > 180 ? 1 : 0;
              const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 35 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 35 * Math.sin((endAngle * Math.PI) / 180);
              
              return (
                <motion.path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
              <div className="text-sm text-white/60">Total</div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-white/80">{item.source}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium">{item.value}%</span>
              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RetentionCohortChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-white text-xl font-semibold">User Retention Cohort</h2>
      <Icon name="Users" className="w-5 h-5 text-white/60" />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left text-white/60 font-medium p-2">Cohort</th>
            <th className="text-center text-white/60 font-medium p-2">Users</th>
            <th className="text-center text-white/60 font-medium p-2">Week 1</th>
            <th className="text-center text-white/60 font-medium p-2">Week 2</th>
            <th className="text-center text-white/60 font-medium p-2">Week 3</th>
            <th className="text-center text-white/60 font-medium p-2">Week 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={row.week}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-white/10 last:border-0"
            >
              <td className="p-2 text-white/80">{row.week}</td>
              <td className="p-2 text-center text-white">{row.cohort}</td>
              <td className="p-2 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`inline-flex items-center justify-center w-12 h-6 rounded text-xs font-medium ${
                    row.week1 > 30 ? 'bg-green-500/20 text-green-300' : row.week1 > 20 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {row.week1}%
                </motion.div>
              </td>
              <td className="p-2 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.05 }}
                  className={`inline-flex items-center justify-center w-12 h-6 rounded text-xs font-medium ${
                    row.week2 > 30 ? 'bg-green-500/20 text-green-300' : row.week2 > 20 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {row.week2}%
                </motion.div>
              </td>
              <td className="p-2 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                  className={`inline-flex items-center justify-center w-12 h-6 rounded text-xs font-medium ${
                    row.week3 > 30 ? 'bg-green-500/20 text-green-300' : row.week3 > 20 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {row.week3}%
                </motion.div>
              </td>
              <td className="p-2 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                  className={`inline-flex items-center justify-center w-12 h-6 rounded text-xs font-medium ${
                    row.week4 > 30 ? 'bg-green-500/20 text-green-300' : row.week4 > 20 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {row.week4}%
                </motion.div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const FeatureUsageChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-white text-xl font-semibold">Feature Usage</h2>
      <Icon name="BarChart3" className="w-5 h-5 text-white/60" />
    </div>
    <div className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-center justify-between group hover:bg-white/5 rounded-lg p-2 transition-colors duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#00D4FF] flex items-center justify-center">
              <Icon name="Code" className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/80">{item.feature}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.usage}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-[#5E6AD2] to-[#00D4FF]"
              />
            </div>
            <span className="text-white text-sm font-medium w-12 text-right">{item.usage}%</span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ReportBuilder = ({ onGenerate }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['traffic', 'retention']);
  const [reportType, setReportType] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const metrics = [
    { id: 'traffic', label: 'Traffic Sources', icon: 'Globe' },
    { id: 'retention', label: 'User Retention', icon: 'Users' },
    { id: 'features', label: 'Feature Usage', icon: 'Code' },
    { id: 'geo', label: 'Geographic Data', icon: 'MapPin' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onGenerate({ metrics: selectedMetrics, type: reportType, timeRange });
    setIsGenerating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">Custom Report Builder</h2>
        <Icon name="FileText" className="w-5 h-5 text-white/60" />
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-3">Select Metrics</label>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <motion.label
                key={metric.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-all duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMetrics([...selectedMetrics, metric.id]);
                    } else {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== metric.id));
                    }
                  }}
                  className="rounded border-white/20 bg-white/5 text-[#5E6AD2] focus:ring-[#5E6AD2]"
                />
                <Icon name={metric.icon} className="w-4 h-4 text-white/60" />
                <span className="text-white/80 text-sm">{metric.label}</span>
              </motion.label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition-all duration-300"
            >
              <option value="overview">Overview</option>
              <option value="detailed">Detailed</option>
              <option value="summary">Summary</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] transition-all duration-300"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating || selectedMetrics.length === 0}
          className="w-full py-3 bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5E6AD2]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Icon name="Loader2" className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Report'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const RealtimeVisitors = ({ count }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-white text-xl font-semibold">Real-time Visitors</h2>
      <Icon name="Activity" className="w-5 h-5 text-green-400 animate-pulse" />
    </div>
    <div className="text-center">
      <motion.div
        key={count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-2"
      >
        {count.toLocaleString()}
      </motion.div>
      <p className="text-white/60 text-sm">Currently online</p>
    </div>
    <div className="mt-4 flex items-center justify-center gap-2">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-green-400 text-xs">Live</span>
    </div>
  </motion.div>
);

const GeoMap = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.7 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-white text-xl font-semibold">Geographic Distribution</h2>
      <Icon name="MapPin" className="w-5 h-5 text-white/60" />
    </div>
    <div className="space-y-3">
      {data.map((country, index) => (
        <motion.div
          key={country.country}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-center justify-between group hover:bg-white/5 rounded-lg p-3 transition-colors duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{country.flag}</span>
            <span className="text-white/80 text-sm">{country.country}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-white font-medium">{country.users.toLocaleString()}</div>
              <div className="text-white/60 text-xs">users</div>
            </div>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(country.users / 4000) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-[#5E6AD2] to-[#00D4FF]"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="mt-6 flex items-center justify-center">
      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 flex items-center gap-2">
        <Icon name="Maximize2" className="w-4 h-4" />
        View Full Map
      </button>
    </div>
  </motion.div>
);

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-07' });
  const [isExporting, setIsExporting] = useState(false);
  const [trafficData, setTrafficData] = useState([
    { source: 'Direct', value: 45, color: '#5E6AD2' },
    { source: 'Organic', value: 30, color: '#7C3AED' },
    { source: 'Referral', value: 15, color: '#00D4FF' },
    { source: 'Social', value: 10, color: '#A78BFA' }
  ]);
  const [retentionData, setRetentionData] = useState([
    { week: 'W1', cohort: 100, week1: 45, week2: 32, week3: 28, week4: 25 },
    { week: 'W2', cohort: 85, week1: 38, week2: 27, week3: 24, week4: 21 },
    { week: 'W3', cohort: 92, week1: 41, week2: 29, week3: 26, week4: 23 },
    { week: 'W4', cohort: 78, week1: 35, week2: 25, week3: 22, week4: 19 }
  ]);
  const [featureUsage, setFeatureUsage] = useState([
    { feature: 'Dashboard', usage: 89 },
    { feature: 'Reports', usage: 76 },
    { feature: 'Analytics', usage: 68 },
    { feature: 'Settings', usage: 54 },
    { feature: 'Integrations', usage: 43 },
    { feature: 'API', usage: 38 },
    { feature: 'Billing', usage: 32 },
    { feature: 'Team', usage: 28 },
    { feature: 'Notifications', usage: 24 },
    { feature: 'Export', usage: 19 }
  ]);
  const [realtimeVisitors, setRealtimeVisitors] = useState(1247);
  const [geoData, setGeoData] = useState([
    { country: 'United States', users: 3421, flag: '🇺🇸' },
    { country: 'United Kingdom', users: 2156, flag: '🇬🇧' },
    { country: 'Germany', users: 1893, flag: '🇩🇪' },
    { country: 'France', users: 1432, flag: '🇫🇷' },
    { country: 'Canada', users: 987, flag: '🇨🇦' }
  ]);

  const handleExport = async () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csv = [
        'Date,Page Views,Unique Visitors,Traffic Sources,Retention Rate',
        `${dateRange.start} to ${dateRange.end},12450,8241,"${trafficData.map(t=>t.source).join(';')}",65.2%`
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${dateRange.start}-${dateRange.end}.csv`;
      a.click();
    }, 1500);
  };

  const handleGenerateReport = (config) => {
    console.log('Generating report:', config);
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeVisitors(prev => Math.max(1000, prev + Math.floor(Math.random() * 20) - 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Analytics
              </h1>
              <p className="text-white/60 mt-2">Deep dive into product performance and user behavior</p>
            </div>
            <DatePicker dateRange={dateRange} setDateRange={handleDateRangeChange} />
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
            >
              <Icon name={isExporting ? 'Loader2' : 'Download'} className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} />
              Export Report
            </motion.button>
            <span className="text-white/40 text-sm">{dateRange.start} to {dateRange.end}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 mb-12">
          <TrafficPieChart data={trafficData} />
          <RetentionCohortChart data={retentionData} />
          <FeatureUsageChart data={featureUsage} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <ReportBuilder onGenerate={handleGenerateReport} />
          </div>
          <div className="space-y-6">
            <RealtimeVisitors count={realtimeVisitors} />
            <GeoMap data={geoData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
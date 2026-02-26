import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import AnalyticsDatePicker from '../components/analyticsDatePicker';
import TrafficPieChart from '../components/trafficPieChart';
import RetentionCohortChart from '../components/retentionCohortChart';
import FeatureUsageChart from '../components/featureUsageChart';
import ReportBuilder from '../components/reportBuilder';
import RealtimeVisitors from '../components/realtimeVisitors';
import GeoMap from '../components/geoMap';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-07' });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,Date,Page Views,Unique Visitors\n2024-01-01,1200,800\n2024-01-02,1350,900';
      link.download = 'analytics-report.csv';
      link.click();
    }, 1500);
  };

  const handleGenerateReport = (config) => {
    console.log('Generating report:', config);
  };

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
            <AnalyticsDatePicker onChange={setDateRange} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
            >
              <Icon name={isExporting ? 'Loader2' : 'Download'} className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} />
              Export Report
            </button>
            <span className="text-white/40 text-sm">{dateRange.start} to {dateRange.end}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 mb-12">
          <TrafficPieChart />
          <RetentionCohortChart />
          <FeatureUsageChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <ReportBuilder onGenerate={handleGenerateReport} />
          </div>
          <div className="space-y-6">
            <RealtimeVisitors />
            <GeoMap />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
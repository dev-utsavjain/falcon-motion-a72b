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

const KPICard = ({ title, value, trend, trendDirection, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED] rounded-xl">
        <Icon name={icon} className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center gap-1 text-sm ${trendDirection === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        <Icon name={trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} className="w-4 h-4" />
        <span>{trend}%</span>
      </div>
    </div>
    <h3 className="text-white/60 text-sm font-medium mb-1">{title}</h3>
    <p className="text-white text-3xl font-bold">{value}</p>
  </motion.div>
);

const RevenueChart = ({ data, timeRange, setTimeRange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 lg:col-span-2"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-white text-xl font-semibold">Revenue Overview</h2>
      <div className="flex gap-2">
        {['7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
              timeRange === range
                ? 'bg-[#5E6AD2] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
          </button>
        ))}
      </div>
    </div>
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="flex-1 bg-gradient-to-t from-[#5E6AD2] to-[#00D4FF] rounded-t-lg relative group cursor-pointer"
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              ${item.value.toLocaleString()}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ActivityHeatmap = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <h2 className="text-white text-xl font-semibold mb-6">User Activity Heatmap</h2>
    <div className="grid grid-cols-7 gap-1">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.02 }}
          className={`aspect-square rounded-sm ${
            item.intensity === 0 ? 'bg-white/10' :
            item.intensity < 25 ? 'bg-[#00D4FF]/30' :
            item.intensity < 50 ? 'bg-[#00D4FF]/50' :
            item.intensity < 75 ? 'bg-[#00D4FF]/70' :
            'bg-[#00D4FF]'
          } hover:scale-110 transition-transform duration-300 cursor-pointer`}
          title={`${item.date}: ${item.intensity}% activity`}
        />
      ))}
    </div>
  </motion.div>
);

const ActivityFeed = ({ activities }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <h2 className="text-white text-xl font-semibold mb-6">Recent Activity</h2>
    <div className="space-y-4">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#00D4FF] flex items-center justify-center flex-shrink-0">
              <Icon name={activity.icon} className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">{activity.description}</p>
              <p className="text-white/40 text-xs mt-1">{activity.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </motion.div>
);

const QuickActions = ({ actions }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.8 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <h2 className="text-white text-xl font-semibold mb-6">Quick Actions</h2>
    <div className="grid grid-cols-1 gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#00D4FF] flex items-center justify-center">
            <Icon name={action.icon} className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium">{action.title}</span>
          <Icon name="ArrowRight" className="w-4 h-4 text-white/40 ml-auto group-hover:text-white transition-colors duration-300" />
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [kpiData, setKpiData] = useState([
    { title: 'Monthly Recurring Revenue', value: '$124,500', trend: 12.5, trendDirection: 'up', icon: 'DollarSign' },
    { title: 'Active Users', value: '2,845', trend: 8.2, trendDirection: 'up', icon: 'Users' },
    { title: 'Churn Rate', value: '2.4%', trend: 0.8, trendDirection: 'down', icon: 'UserMinus' },
    { title: 'Growth Rate', value: '24.8%', trend: 3.2, trendDirection: 'up', icon: 'TrendingUp' }
  ]);

  const [revenueData, setRevenueData] = useState([
    { date: 'Jan', value: 45000 },
    { date: 'Feb', value: 52000 },
    { date: 'Mar', value: 48000 },
    { date: 'Apr', value: 61000 },
    { date: 'May', value: 58000 },
    { date: 'Jun', value: 67000 },
    { date: 'Jul', value: 72000 },
    { date: 'Aug', value: 69000 },
    { date: 'Sep', value: 78000 },
    { date: 'Oct', value: 82000 },
    { date: 'Nov', value: 89000 },
    { date: 'Dec', value: 95000 }
  ]);

  const [heatmapData, setHeatmapData] = useState(
    Array.from({ length: 49 }, (_, i) => ({
      date: new Date(Date.now() - (48 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      intensity: Math.floor(Math.random() * 100)
    }))
  );

  const [activities, setActivities] = useState([
    { id: 1, description: 'New user registration: john@example.com', timestamp: '2 minutes ago', icon: 'UserPlus' },
    { id: 2, description: 'Payment received: $299 from Acme Corp', timestamp: '15 minutes ago', icon: 'CreditCard' },
    { id: 3, description: 'Feature deployed: Advanced Analytics', timestamp: '1 hour ago', icon: 'Rocket' },
    { id: 4, description: 'Support ticket resolved: #1234', timestamp: '2 hours ago', icon: 'CheckCircle' },
    { id: 5, description: 'Team member invited: sarah@company.com', timestamp: '3 hours ago', icon: 'Mail' }
  ]);

  const quickActions = [
    { title: 'Add New User', icon: 'UserPlus' },
    { title: 'View Reports', icon: 'BarChart3' },
    { title: 'Settings', icon: 'Settings' }
  ];

  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prev => prev.map(item => ({
        ...item,
        value: item.title === 'Monthly Recurring Revenue' 
          ? `$${(parseInt(item.value.replace(/[^0-9]/g, '')) + Math.floor(Math.random() * 1000)).toLocaleString()}`
          : item.title === 'Active Users'
          ? `${(parseInt(item.value.replace(/,/g, '')) + Math.floor(Math.random() * 10)).toLocaleString()}`
          : item.value
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050506]">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#5E6AD2] to-[#00D4FF] bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-white/60 text-lg">Welcome back! Here's your overview.</p>
          </div>
          <div className="relative">
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Icon name="Bell" className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00D4FF] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <RevenueChart data={revenueData} timeRange={timeRange} setTimeRange={setTimeRange} />
          <ActivityHeatmap data={heatmapData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed activities={activities} />
          <QuickActions actions={quickActions} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
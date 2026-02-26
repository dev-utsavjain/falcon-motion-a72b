import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">hi</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-white/70 hover:text-white transition-colors">
              <Icon name="Bell" className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00D4FF] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Icon name="User" className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Icon name="LogOut" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'alert': return 'AlertTriangle';
      case 'update': return 'RefreshCw';
      case 'info': return 'Info';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'alert': return 'text-[#00D4FF]';
      case 'update': return 'text-[#5E6AD2]';
      case 'info': return 'text-[#7C3AED]';
      case 'success': return 'text-green-400';
      default: return 'text-white/60';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-4 transition-all duration-300 ${!notification.read ? 'bg-[#5E6AD2]/10 border-[#5E6AD2]/30' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${getIconColor(notification.type)}`}>
          <Icon name={getIcon(notification.type)} className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">{notification.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{notification.message}</p>
              <p className="text-white/40 text-xs mt-2">{notification.timestamp}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onMarkRead(notification.id)}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title={notification.read ? 'Mark as unread' : 'Mark as read'}
              >
                <Icon name={notification.read ? 'Eye' : 'EyeOff'} className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(notification.id)}
                className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                title="Delete notification"
              >
                <Icon name="Trash2" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {!notification.read && (
        <div className="absolute left-2 top-2 w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse" />
      )}
    </motion.div>
  );
};

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      active
        ? 'bg-[#5E6AD2] text-white shadow-lg shadow-[#5E6AD2]/25'
        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const PreferencesModal = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: false,
    alerts: true,
    updates: true,
    marketing: false
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 w-full max-w-md z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-white/80 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button
                    onClick={() => handleToggle(key)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      value ? 'bg-[#5E6AD2]' : 'bg-white/20'
                    }`}
                  >
                    <motion.div
                      layout
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${
                        value ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#5E6AD2]/80 transition-all"
              >
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ClearConfirmModal = ({ isOpen, onClose, onConfirm }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0B] border border-white/10 rounded-2xl p-8 w-full max-w-sm z-50"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Clear All Notifications?</h3>
            <p className="text-white/60 mb-6">This action cannot be undone. All notifications will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'High CPU Usage Alert',
      message: 'Server CPU usage has exceeded 85% for the last 5 minutes. Please investigate immediately.',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'update',
      title: 'System Update Available',
      message: 'A new version of the platform is available. Update now to get the latest features and security improvements.',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Team Member Joined',
      message: 'Sarah Johnson has been added to your team as a Developer. Welcome aboard!',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Deployment Successful',
      message: 'Your latest changes have been successfully deployed to production. All systems operational.',
      timestamp: '5 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Security Warning',
      message: 'Unusual login activity detected from a new location. Please review your account security.',
      timestamp: '1 day ago',
      read: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showPreferences, setShowPreferences] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'alerts') return notification.type === 'alert';
    if (filter === 'updates') return notification.type === 'update';
    return true;
  });

  const handleMarkRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: !n.read } : n)
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newNotifications = [
        {
          id: Date.now(),
          type: 'info',
          title: 'Backup Completed',
          message: 'Daily backup has been successfully completed. All data is secure.',
          timestamp: '2 days ago',
          read: true
        },
        {
          id: Date.now() + 1,
          type: 'update',
          title: 'Feature Rollout',
          message: 'New analytics features are now available in your dashboard.',
          timestamp: '3 days ago',
          read: true
        }
      ];
      setNotifications(prev => [...prev, ...newNotifications]);
      setLoading(false);
    }, 1000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Notifications</h1>
              <p className="text-white/60">You have {unreadCount} unread notifications</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Icon name="Settings" className="w-4 h-4" />
                Preferences
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
              >
                <Icon name="Trash2" className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterButton>
            <FilterButton active={filter === 'unread'} onClick={() => setFilter('unread')}>
              Unread ({unreadCount})
            </FilterButton>
            <FilterButton active={filter === 'alerts'} onClick={() => setFilter('alerts')}>
              Alerts
            </FilterButton>
            <FilterButton active={filter === 'updates'} onClick={() => setFilter('updates')}>
              Updates
            </FilterButton>
          </div>

          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="BellOff" className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No notifications</h3>
                <p className="text-white/60">You're all caught up! Check back later for updates.</p>
              </motion.div>
            ) : (
              <div>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                  />
                ))}
                
                {notifications.length > 5 && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#5E6AD2]/80 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                    >
                      {loading ? (
                        <>
                          <Icon name="Loader2" className="w-4 h-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Icon name="ChevronDown" className="w-4 h-4" />
                          Load More
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <PreferencesModal isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
      <ClearConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearAll}
      />
    </div>
  );
}
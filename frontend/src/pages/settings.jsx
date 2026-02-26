import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', showInNav: true, navOrder: 1 },
    { name: 'Analytics', path: '/analytics', showInNav: true, navOrder: 2 },
    { name: 'Settings', path: '/settings', showInNav: true, navOrder: 3 }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-white font-bold text-xl">hi</div>
            <nav className="hidden md:flex items-center gap-6">
              {navItems
                .filter(item => item.showInNav)
                .sort((a, b) => a.navOrder - b.navOrder)
                .map(item => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Icon name="Bell" className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Icon name="User" className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Icon name="LogOut" className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#050506] border-t border-white/10 mt-24">
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-white font-bold text-xl mb-4">hi</div>
          <p className="text-white/60">Powering insights for modern teams</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Settings</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
        <p>&copy; 2024 hi. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
      active
        ? 'bg-[#5E6AD2] text-white shadow-lg shadow-[#5E6AD2]/25'
        : 'text-white/60 hover:text-white hover:bg-white/10'
    }`}
  >
    {children}
  </button>
);

const GeneralSettings = ({ settings, onSave }) => {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Company Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Company Name</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#5E6AD2] transition-colors"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Timezone</label>
            <select
              value={form.timezone}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#5E6AD2] transition-colors"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
          <div>
            <label className="text-white/70 text-sm mb-2 block">Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#5E6AD2] transition-colors"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#5E6AD2] hover:bg-[#4B5AB5] text-white rounded-lg transition-colors duration-300"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-green-400 flex items-center gap-2">
              <Icon name="Check" className="w-4 h-4" />
              Saved!
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BillingSettings = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Current Plan</h3>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-medium">Pro Plan</p>
            <p className="text-white/60">$99/month</p>
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            Upgrade
          </button>
        </div>
        <div className="border-t border-white/10 pt-6">
          <h4 className="text-white font-medium mb-4">Payment Method</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-white/80 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-[#5E6AD2]"
              />
              Credit Card
            </label>
            <label className="flex items-center gap-3 text-white/80 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-[#5E6AD2]"
              />
              PayPal
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Invoice History</h3>
        <div className="space-y-3">
          {[
            { date: 'Nov 1, 2024', amount: '$99.00', status: 'Paid' },
            { date: 'Oct 1, 2024', amount: '$99.00', status: 'Paid' },
            { date: 'Sep 1, 2024', amount: '$99.00', status: 'Paid' }
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
              <div>
                <p className="text-white font-medium">{invoice.date}</p>
                <p className="text-white/60 text-sm">Invoice #{1000 + i}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{invoice.amount}</p>
                <p className="text-green-400 text-sm">{invoice.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TeamSettings = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', avatar: 'photo-1472099645785-5658abf4ff4e' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Editor', avatar: 'photo-1494790108755-2616b612b5bc' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Viewer', avatar: 'photo-1507003211169-0a1dd7228f2d' }
  ]);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    if (inviteEmail) {
      setMembers([...members, {
        id: Date.now(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: 'Viewer',
        avatar: 'photo-1438761681033-6461ffad8d80'
      }]);
      setInviteEmail('');
    }
  };

  const handleRemove = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Team Members</h3>
        <div className="space-y-4">
          {members.map(member => (
            <div key={member.id} className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
              <div className="flex items-center gap-4">
                <img
                  src={`https://images.unsplash.com/${member.avatar}?w=48&h=48&fit=crop&auto=format`}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/48x48/1a1a2e/eaeaea?text=U';
                  }}
                />
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  <p className="text-white/60 text-sm">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={member.role}
                  onChange={(e) => {
                    const newMembers = members.map(m => 
                      m.id === member.id ? { ...m, role: e.target.value } : m
                    );
                    setMembers(newMembers);
                  }}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#5E6AD2]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <button
                  onClick={() => handleRemove(member.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Icon name="Trash2" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Invite Team Member</h3>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#5E6AD2]"
          />
          <button
            onClick={handleInvite}
            className="px-6 py-3 bg-[#5E6AD2] hover:bg-[#4B5AB5] text-white rounded-lg transition-colors"
          >
            Invite
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const IntegrationsSettings = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Slack', description: 'Team communication', enabled: true, icon: 'MessageSquare' },
    { id: 2, name: 'Google Analytics', description: 'Web analytics', enabled: false, icon: 'BarChart3' },
    { id: 3, name: 'Stripe', description: 'Payment processing', enabled: true, icon: 'CreditCard' },
    { id: 4, name: 'GitHub', description: 'Code repository', enabled: false, icon: 'Github' }
  ]);

  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, enabled: !int.enabled } : int
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Available Integrations</h3>
        <div className="space-y-4">
          {integrations.map(integration => (
            <div key={integration.id} className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name={integration.icon} className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{integration.name}</p>
                  <p className="text-white/60 text-sm">{integration.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleIntegration(integration.id)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  integration.enabled ? 'bg-[#5E6AD2]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    integration.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ApiSettings = () => {
  const [keys, setKeys] = useState([
    { id: 1, name: 'Production Key', key: 'sk_live_...abcd', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development Key', key: 'sk_test_...wxyz', created: '2024-01-10', lastUsed: '1 day ago' }
  ]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateKey = (id) => {
    setKeys(keys.map(k => 
      k.id === id ? { ...k, key: `sk_${k.key.includes('live') ? 'live' : 'test'}_...${Math.random().toString(36).substr(2, 4)}` } : k
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-semibold">API Keys</h3>
          <button className="px-4 py-2 bg-[#5E6AD2] hover:bg-[#4B5AB5] text-white rounded-lg transition-colors">
            Generate New Key
          </button>
        </div>
        <div className="space-y-4">
          {keys.map(apiKey => (
            <div key={apiKey.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">{apiKey.name}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Icon name="Copy" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => regenerateKey(apiKey.id)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Icon name="RefreshCw" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-white/60 text-sm font-mono mb-3">{apiKey.key}</p>
              <div className="flex items-center gap-6 text-white/40 text-xs">
                <span>Created: {apiKey.created}</span>
                <span>Last used: {apiKey.lastUsed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: false,
    weekly: true,
    monthly: false
  });

  const togglePreference = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-6">Notification Preferences</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-4">Notification Types</h4>
            <div className="space-y-3">
              {Object.entries({
                email: 'Email notifications',
                push: 'Push notifications',
                sms: 'SMS notifications'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-white/80">{label}</span>
                  <button
                    onClick={() => togglePreference(key)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences[key] ? 'bg-[#5E6AD2]' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences[key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Report Frequency</h4>
            <div className="space-y-3">
              {Object.entries({
                weekly: 'Weekly reports',
                monthly: 'Monthly reports'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-white/80">{label}</span>
                  <button
                    onClick={() => togglePreference(key)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences[key] ? 'bg-[#5E6AD2]' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences[key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DangerZone = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = () => {
    if (confirmText === 'DELETE') {
      // TODO: connect API endpoint using src/config/api.js
      setShowModal(false);
      setConfirmText('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
        <h3 className="text-red-400 text-xl font-semibold mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-red-500/20 last:border-0">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-white/60 text-sm">Permanently delete your account and all data</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#050506] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <h4 className="text-white text-xl font-semibold mb-4">Delete Account</h4>
              <p className="text-white/60 mb-6">
                This action cannot be undone. Type DELETE to confirm.
              </p>
              <input
                type="text"
                placeholder="Type DELETE"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500 mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirmText !== 'DELETE'}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-white/20 disabled:text-white/40 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'Acme Corp',
    timezone: 'UTC',
    language: 'en'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'integrations', label: 'Integrations', icon: 'Plug' },
    { id: 'api', label: 'API', icon: 'Key' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'danger', label: 'Danger Zone', icon: 'AlertTriangle' }
  ];

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    // TODO: connect API endpoint using src/config/api.js
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings settings={settings} onSave={handleSaveSettings} />;
      case 'billing':
        return <BillingSettings />;
      case 'team':
        return <TeamSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'api':
        return <ApiSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'danger':
        return <DangerZone />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050506]">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Settings
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Configure your product settings, billing, team members, and integrations
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64">
              <nav className="sticky top-24 space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon name={tab.icon} className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
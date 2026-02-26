import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Header = () => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
    { label: 'Users', path: '/users', icon: 'Users' },
    { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
    { label: 'Settings', path: '/settings', icon: 'Settings' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-white">hi</Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300">
                  <Icon name={item.icon} className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <Icon name="Bell" className="w-5 h-5 text-white/80" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <Icon name="User" className="w-5 h-5 text-white/80" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <Icon name="LogOut" className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#050506] border-t border-white/10 mt-24">
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/50">© 2024 hi. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-white/50">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', role: 'Admin', createdAt: '2023-01-15', lastActive: '2024-07-01' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Active', role: 'User', createdAt: '2023-02-20', lastActive: '2024-06-30' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'Pending', role: 'Guest', createdAt: '2024-06-01', lastActive: '2024-06-29' },
  { id: 4, name: 'David Brown', email: 'david@example.com', status: 'Inactive', role: 'User', createdAt: '2023-03-10', lastActive: '2023-12-15' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'Active', role: 'Admin', createdAt: '2023-04-05', lastActive: '2024-07-02' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', status: 'Active', role: 'User', createdAt: '2023-05-12', lastActive: '2024-06-28' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', status: 'Active', role: 'User', createdAt: '2023-06-18', lastActive: '2024-07-01' },
  { id: 8, name: 'Henry Clark', email: 'henry@example.com', status: 'Pending', role: 'Guest', createdAt: '2024-05-20', lastActive: '2024-05-25' },
  { id: 9, name: 'Ivy Martinez', email: 'ivy@example.com', status: 'Active', role: 'Admin', createdAt: '2023-07-22', lastActive: '2024-07-02' },
  { id: 10, name: 'Jack Wilson', email: 'jack@example.com', status: 'Inactive', role: 'User', createdAt: '2023-08-30', lastActive: '2024-01-10' },
  { id: 11, name: 'Karen Moore', email: 'karen@example.com', status: 'Active', role: 'User', createdAt: '2023-09-14', lastActive: '2024-06-30' },
  { id: 12, name: 'Leo Taylor', email: 'leo@example.com', status: 'Active', role: 'Guest', createdAt: '2023-10-05', lastActive: '2024-06-29' },
  { id: 13, name: 'Mia Anderson', email: 'mia@example.com', status: 'Pending', role: 'User', createdAt: '2024-04-01', lastActive: '2024-04-15' },
  { id: 14, name: 'Noah Thomas', email: 'noah@example.com', status: 'Active', role: 'Admin', createdAt: '2023-11-11', lastActive: '2024-07-02' },
  { id: 15, name: 'Olivia Jackson', email: 'olivia@example.com', status: 'Active', role: 'User', createdAt: '2023-12-20', lastActive: '2024-07-01' },
  { id: 16, name: 'Paul Harris', email: 'paul@example.com', status: 'Inactive', role: 'Guest', createdAt: '2024-01-15', lastActive: '2024-03-01' },
  { id: 17, name: 'Quinn Thompson', email: 'quinn@example.com', status: 'Active', role: 'User', createdAt: '2024-02-10', lastActive: '2024-06-30' },
  { id: 18, name: 'Ruby Garcia', email: 'ruby@example.com', status: 'Active', role: 'Admin', createdAt: '2023-07-07', lastActive: '2024-07-02' },
  { id: 19, name: 'Sam Rodriguez', email: 'sam@example.com', status: 'Pending', role: 'User', createdAt: '2024-03-25', lastActive: '2024-04-05' },
  { id: 20, name: 'Tina Lewis', email: 'tina@example.com', status: 'Active', role: 'Guest', createdAt: '2023-08-14', lastActive: '2024-06-28' },
  { id: 21, name: 'Uma King', email: 'uma@example.com', status: 'Active', role: 'User', createdAt: '2023-09-09', lastActive: '2024-07-01' },
  { id: 22, name: 'Victor Scott', email: 'victor@example.com', status: 'Inactive', role: 'Admin', createdAt: '2023-10-31', lastActive: '2024-02-20' }
];

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const perPage = 20;

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
    filtered.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
    return filtered;
  }, [users, search, statusFilter, roleFilter, sortKey, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const handleSelectUser = id => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === paginatedUsers.length ? [] : paginatedUsers.map(u => u.id));
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const handleBulkAction = action => {
    setUsers(prev => prev.map(u => selectedUsers.includes(u.id) ? { ...u, status: action === 'activate' ? 'Active' : action === 'deactivate' ? 'Inactive' : u.status } : u));
    if (action === 'delete') setUsers(prev => prev.filter(u => !selectedUsers.includes(u.id)));
    setSelectedUsers([]);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const user = { ...newUser, id: Date.now(), status: 'Pending', createdAt: new Date().toISOString().slice(0, 10), lastActive: new Date().toISOString().slice(0, 10) };
    setUsers(prev => [user, ...prev]);
    setNewUser({ name: '', email: '', role: 'User' });
    setShowAddModal(false);
  };

  const handleExport = () => {
    const csv = ['Name,Email,Status,Role,Created Date,Last Active']
      .concat(filteredUsers.map(u => `${u.name},${u.email},${u.status},${u.role},${u.createdAt},${u.lastActive}`))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050506] text-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Users</h1>
              <p className="text-white/60">Manage your team and permissions</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5E6AD2] hover:bg-[#5E6AD2]/90 transition-colors duration-300"
              >
                <Icon name="Plus" className="w-4 h-4" />
                Add User
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <Icon name="Download" className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Guest">Guest</option>
            </select>
            <select
              value={`${sortKey}-${sortOrder}`}
              onChange={e => {
                const [key, order] = e.target.value.split('-');
                setSortKey(key);
                setSortOrder(order);
              }}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="createdAt-desc">Newest</option>
              <option value="createdAt-asc">Oldest</option>
              <option value="lastActive-desc">Last Active</option>
            </select>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-white/60">{selectedUsers.length} selected</span>
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 rounded bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors duration-300"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition-colors duration-300"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          )}

          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-white/20 bg-white/5"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Created</th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Last Active</th>
                  <th className="px-4 py-3 text-left text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-white/20 bg-white/5"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setShowProfileModal(user)}
                        className="flex items-center gap-3 text-left hover:text-[#5E6AD2] transition-colors duration-300"
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${user.id % 2 ? '1522071820081-009f0129c71c' : '1600880292203-757bb62b4baf'}?w=40&h=40&fit=crop&auto=format`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/1a1a2e/eaeaea?text=U'; }}
                        />
                        <span className="font-medium">{user.name}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-white/70">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-500/20 text-green-300' : user.status === 'Inactive' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                        <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-400' : user.status === 'Inactive' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={e => handleRoleChange(user.id, e.target.value)}
                        className="px-2 py-1 rounded bg-white/10 border border-white/10 text-sm focus:border-[#5E6AD2] outline-none transition-colors duration-300"
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Guest">Guest</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-white/70">{user.createdAt}</td>
                    <td className="px-4 py-3 text-white/70">{user.lastActive}</td>
                    <td className="px-4 py-3">
                      <button className="p-1 rounded hover:bg-white/10 transition-colors duration-300">
                        <Icon name="MoreHorizontal" className="w-5 h-5 text-white/60" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-white/50">Showing {paginatedUsers.length} of {filteredUsers.length} users</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors duration-300"
              >
                <Icon name="ChevronLeft" className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded transition-colors duration-300 ${currentPage === i + 1 ? 'bg-[#5E6AD2] text-white' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors duration-300"
              >
                <Icon name="ChevronRight" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl bg-[#111113] border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
              />
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#5E6AD2] outline-none transition-colors duration-300"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 rounded-lg bg-[#5E6AD2] hover:bg-[#5E6AD2]/90 transition-colors duration-300"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-lg rounded-2xl bg-[#111113] border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://images.unsplash.com/photo-${showProfileModal.id % 2 ? '1522071820081-009f0129c71c' : '1600880292203-757bb62b4baf'}?w=64&h=64&fit=crop&auto=format`}
                alt={showProfileModal.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/1a1a2e/eaeaea?text=U'; }}
              />
              <div>
                <h2 className="text-xl font-bold">{showProfileModal.name}</h2>
                <p className="text-white/60">{showProfileModal.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/50">Status</p>
                <p className="font-medium">{showProfileModal.status}</p>
              </div>
              <div>
                <p className="text-white/50">Role</p>
                <p className="font-medium">{showProfileModal.role}</p>
              </div>
              <div>
                <p className="text-white/50">Created</p>
                <p className="font-medium">{showProfileModal.createdAt}</p>
              </div>
              <div>
                <p className="text-white/50">Last Active</p>
                <p className="font-medium">{showProfileModal.lastActive}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={() => setShowProfileModal(null)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@pages/dashboard';
import Users from '@pages/users';
import Analytics from '@pages/analytics';
import Settings from '@pages/settings';
import Notifications from '@pages/notifications';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}
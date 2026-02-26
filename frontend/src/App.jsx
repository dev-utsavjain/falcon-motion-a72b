import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@pages/dashboard';
import Users from '@pages/users';
import Analytics from '@pages/analytics';
import Settings from '@pages/settings';
import Notifications from '@pages/notifications';
import Register from '@pages/register';
import ForgotPassword from '@pages/forgotPassword';
import ResetPassword from '@pages/resetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
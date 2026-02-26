import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Users from '@pages/Users';
import Analytics from '@pages/Analytics';
import Settings from '@pages/Settings';
import Notifications from '@pages/Notifications';
import Login from '@pages/Login';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import ResetPassword from '@pages/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
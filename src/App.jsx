import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Dashboard title="Tasks Management" />} />
        <Route path="/calendar" element={<PlaceholderPage title="Calendar & Events" />} />
        <Route path="/analytics" element={<PlaceholderPage title="Performance Analytics" />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;

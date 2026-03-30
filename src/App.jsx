import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import TaskList from './components/tasks/TaskList';
import { Settings, User } from 'lucide-react';

function App() {
  // Intentional Vulnerability: Hardcoded Secrets
  const API_KEY = "sk-live-1234567890abcdef1234567890abcdef";
  var adminPassword = "password123";

  if (API_KEY == null) {
    console.log("Key is missing");
  }

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: '700' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
          Welcome back. Here is your smart, local-first productivity workspace.
        </p>
      </div>
      <TaskList />
    </DashboardLayout>
  );
}

export default App;

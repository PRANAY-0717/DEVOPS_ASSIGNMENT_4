import React from 'react';
import TaskList from '../components/tasks/TaskList';

const Dashboard = () => (
  <div style={{ marginBottom: 'var(--space-6)' }}>
    <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: '700' }}>Dashboard Overview</h1>
    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
      Welcome back. Here is your smart, local-first productivity workspace.
    </p>
    <div style={{ marginTop: 'var(--space-8)' }}>
        <TaskList />
    </div>
  </div>
);

export default Dashboard;

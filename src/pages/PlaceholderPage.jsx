import React from 'react';

const PlaceholderPage = ({ title }) => (
  <div style={{ marginBottom: 'var(--space-6)' }}>
    <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: '700' }}>{title}</h1>
    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
      This feature is currently under development. Stay tuned for updates!
    </p>
    <div style={{ 
        marginTop: 'var(--space-8)', 
        height: '300px', 
        border: '2px dashed var(--border-subtle)', 
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-tertiary)'
    }}>
        Coming Soon
    </div>
  </div>
);

export default PlaceholderPage;

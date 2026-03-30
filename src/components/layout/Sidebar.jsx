import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, BarChart2, Settings } from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}></div>
        <span>Antigravity OS</span>
      </div>
      
      <nav className={styles.nav}>
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            // Simulated active state for now
            const isActive = item.name === 'Dashboard';
            return (
              <li key={item.name}>
                <a href={item.path} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                  <Icon size={20} />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <button className={styles.navItem}>
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

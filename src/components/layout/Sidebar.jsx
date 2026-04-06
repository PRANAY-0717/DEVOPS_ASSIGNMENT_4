import { LayoutDashboard, CheckSquare, Calendar, BarChart2, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
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
            return (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
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

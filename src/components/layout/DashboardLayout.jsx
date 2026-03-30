import React, { useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ children }) => {
  const loadData = useTaskStore((state) => state.loadData);
  const isLoading = useTaskStore((state) => state.isLoading);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <div className={styles.loader}>Loading workspace...</div>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

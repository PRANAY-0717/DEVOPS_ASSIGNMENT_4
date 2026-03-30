import React, { useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import TaskModal from '../tasks/TaskModal';
import styles from './Header.module.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search tasks, categories..." 
            className={styles.searchInput} 
          />
        </div>
        
        <div className={styles.actions}>
          <button className={styles.iconButton}>
            <Bell size={20} />
            <span className={styles.badge}></span>
          </button>
          <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </header>
      
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;

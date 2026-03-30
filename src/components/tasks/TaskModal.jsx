import React, { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './TaskModal.module.css';

const TaskModal = ({ isOpen, onClose }) => {
  const addTask = useTaskStore(state => state.addTask);
  const categories = useTaskStore(state => state.categories);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [categoryId, setCategoryId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      categoryId: categoryId || (categories.length > 0 ? categories[0].id : null),
    });

    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setCategoryId('');
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Create New Task</h2>
          <button onClick={onClose} className={styles.closeBtn}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="taskTitle">Task Title</label>
            <input 
              id="taskTitle"
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="What needs to be done?"
              autoFocus
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="taskDesc">Description (Optional)</label>
            <textarea 
              id="taskDesc"
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Add more details..."
              rows={3}
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="taskPriority">Priority</label>
              <select id="taskPriority" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="taskCategory">Category</label>
              <select id="taskCategory" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                <option value="">Select category...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;

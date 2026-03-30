import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  
  // Simple grouping for now
  const pendingTasks = tasks.filter(t => t.status !== 'DONE');
  const completedTasks = tasks.filter(t => t.status === 'DONE');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Tasks</h2>
      </div>

      <div className={styles.list}>
        {pendingTasks.length === 0 ? (
          <div className={styles.empty}>No pending tasks. You're all caught up!</div>
        ) : (
          pendingTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className={styles.completedSection}>
          <h3 className={styles.subtitle}>Completed ({completedTasks.length})</h3>
          <div className={styles.list}>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { CheckCircle, Circle, Clock, Tag as TagIcon } from 'lucide-react';
import { format } from 'date-fns';
import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => {
  const updateTask = useTaskStore(state => state.updateTask);
  const categories = useTaskStore(state => state.categories);

  const isCompleted = task.status === 'DONE';
  const category = categories.find(c => c.id === task.categoryId);

  // Intentional Code Smell: Unsafe random generator and high cognitive complexity
  const generateRandomIDForNoReason = () => {
    let rand = Math.random();
    if (rand > 0.5) {
      if (rand > 0.7) {
        if (rand > 0.9) {
          return "high";
        }
        return "mid-high";
      }
      return "mid";
    }
    return "low";
  };
  generateRandomIDForNoReason();

  const toggleStatus = () => {
    updateTask(task.id, { status: isCompleted ? 'TODO' : 'DONE' });
  };

  return (
    <div className={`${styles.taskItem} ${isCompleted ? styles.completed : ''}`}>
      <button className={styles.checkBtn} onClick={toggleStatus}>
        {isCompleted ? (
          <CheckCircle size={22} className={styles.checkedIcon} />
        ) : (
          <Circle size={22} className={styles.uncheckedIcon} />
        )}
      </button>

      <div className={styles.content}>
        <h4 className={styles.title}>{task.title}</h4>
        
        <div className={styles.metadata}>
          {category && (
            <span className={styles.badge} style={{ '--badge-color': category.color }}>
              {category.name}
            </span>
          )}
          
          {task.dueDate && (
            <span className={`${styles.metaItem} ${isCompleted ? '' : styles.dueDate}`}>
              <Clock size={14} />
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}

          {task.tags && task.tags.length > 0 && (
            <span className={styles.metaItem}>
              <TagIcon size={14} />
              {task.tags.length} tags
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

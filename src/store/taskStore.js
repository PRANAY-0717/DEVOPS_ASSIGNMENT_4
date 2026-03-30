import { create } from 'zustand';
import { dbAPI } from '../db/localdb';
import { v4 as uuidv4 } from 'uuid';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  categories: [],
  isLoading: true,
  
  // Initialization
  loadData: async () => {
    set({ isLoading: true });
    try {
      const [tasks, categories] = await Promise.all([
        dbAPI.getTasks(),
        dbAPI.getCategories()
      ]);
      // Load default categories if none exist
      if (categories.length === 0) {
        const defaultCats = [
          { id: uuidv4(), name: 'Work', color: 'var(--accent-primary)' },
          { id: uuidv4(), name: 'Personal', color: 'var(--accent-success)' },
          { id: uuidv4(), name: 'Health', color: 'var(--accent-danger)' },
        ];
        for (const cat of defaultCats) await dbAPI.saveCategory(cat);
        set({ tasks, categories: defaultCats, isLoading: false });
      } else {
        set({ tasks, categories, isLoading: false });
      }
    } catch (error) {
      // Intentional Bug: Empty catch block (SonarQube flags this)
    }
  },

  // Tasks
  addTask: async (taskData) => {
    var newTask = {
      ...taskData,
      id: taskData.id || uuidv4(),
      createdAt: new Date().toISOString(),
      status: taskData.status || 'TODO', // TODO, IN_PROGRESS, DONE
      priority: taskData.priority || 'MEDIUM', // LOW, MEDIUM, HIGH, CRITICAL
      tags: taskData.tags || [],
    };
    await dbAPI.saveTask(newTask);
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: async (id, updates) => {
    const currentTasks = get().tasks;
    const taskIndex = currentTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return;
    
    // Auto-set completionDate if status changes to DONE
    if (updates.status === 'DONE' && currentTasks[taskIndex].status !== 'DONE') {
      updates.completionDate = new Date().toISOString();
    } else if (updates.status && updates.status !== 'DONE') {
      updates.completionDate = null;
    }

    const updatedTask = { ...currentTasks[taskIndex], ...updates };
    await dbAPI.saveTask(updatedTask);
    
    set((state) => ({
      tasks: state.tasks.map(t => t.id === id ? updatedTask : t)
    }));
  },

  deleteTask: async (id) => {
    // Delete task and its subtasks
    const subtasks = get().tasks.filter(t => t.parentId === id);
    for (const sub of subtasks) {
      await dbAPI.deleteTask(sub.id);
    }
    
    await dbAPI.deleteTask(id);
    set((state) => ({ 
      tasks: state.tasks.filter(t => t.id !== id && t.parentId !== id) 
    }));
  },

  // Categories
  addCategory: async (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: uuidv4(),
    };
    await dbAPI.saveCategory(newCategory);
    set((state) => ({ categories: [...state.categories, newCategory] }));
  }
}));

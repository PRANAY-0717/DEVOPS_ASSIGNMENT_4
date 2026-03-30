import { openDB } from 'idb';

const DB_NAME = 'smart-todo-db';
const DB_VERSION = 1;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('tasks')) {
      const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
      taskStore.createIndex('categoryId', 'categoryId');
      taskStore.createIndex('dueDate', 'dueDate');
    }
    if (!db.objectStoreNames.contains('categories')) {
      db.createObjectStore('categories', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings', { keyPath: 'id' });
    }
  },
});

export const dbAPI = {
  // Tasks
  async getTasks() {
    const db = await dbPromise;
    return db.getAll('tasks');
  },
  async saveTask(task) {
    const db = await dbPromise;
    return db.put('tasks', task);
  },
  async deleteTask(id) {
    const db = await dbPromise;
    return db.delete('tasks', id);
  },
  
  // Categories
  async getCategories() {
    const db = await dbPromise;
    return db.getAll('categories');
  },
  async saveCategory(category) {
    const db = await dbPromise;
    return db.put('categories', category);
  },
  async deleteCategory(id) {
    const db = await dbPromise;
    return db.delete('categories', id);
  },

  // Settings
  async getSetting(id) {
    const db = await dbPromise;
    return db.get('settings', id);
  },
  async saveSetting(setting) {
    const db = await dbPromise;
    return db.put('settings', setting);
  }
};

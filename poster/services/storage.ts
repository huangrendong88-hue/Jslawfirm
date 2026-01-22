
import { SavedPoster } from '../types';

const DB_NAME = 'PosterAssistantDB';
const STORE_NAME = 'posters';
const DB_VERSION = 1;

/**
 * 极简 IndexedDB 封装，用于本地持久化存储海报
 */
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject('数据库打开失败');
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // 创建存储对象，以 id 为主键
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

export const savePoster = async (poster: Omit<SavedPoster, 'id' | 'timestamp'>): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const data = {
      ...poster,
      timestamp: Date.now()
    };
    const request = store.add(data);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject('保存失败');
  });
};

export const getAllPosters = async (): Promise<SavedPoster[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    // 按时间倒序排列（最新生成的在前）
    request.onsuccess = () => resolve((request.result as SavedPoster[]).sort((a, b) => b.timestamp - a.timestamp));
    request.onerror = () => reject('获取失败');
  });
};

export const deletePoster = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject('删除失败');
  });
};

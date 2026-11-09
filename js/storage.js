/**
 * IndexedDB + LocalStorage Unified Client Storage System
 * Handles Projects, Certifications (including PDF Blobs), and Profile Images safely
 */
class PortfolioStorage {
  constructor() {
    this.dbName = 'WuttipatPortfolioDB';
    this.version = 1;
    this.db = null;
    this.initPromise = this.init();
  }

  async init() {
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported, fallback to LocalStorage');
      return null;
    }

    return new Promise((resolve) => {
      // 500ms safety timeout fallback to avoid blocking render
      const timeoutId = setTimeout(() => {
        console.warn('IndexedDB init timed out, falling back to LocalStorage');
        resolve(null);
      }, 500);

      try {
        const request = indexedDB.open(this.dbName, this.version);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('projects')) {
            db.createObjectStore('projects', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('certificates')) {
            db.createObjectStore('certificates', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('files')) {
            db.createObjectStore('files', { keyPath: 'key' });
          }
          if (!db.objectStoreNames.contains('profile')) {
            db.createObjectStore('profile', { keyPath: 'key' });
          }
        };

        request.onsuccess = (event) => {
          clearTimeout(timeoutId);
          this.db = event.target.result;
          resolve(this.db);
        };

        request.onerror = (event) => {
          clearTimeout(timeoutId);
          console.error('IndexedDB error:', event.target.error);
          resolve(null);
        };

        request.onblocked = () => {
          clearTimeout(timeoutId);
          console.warn('IndexedDB blocked, fallback to LocalStorage');
          resolve(null);
        };
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('IndexedDB open threw error:', err);
        resolve(null);
      }
    });
  }

  async setFile(key, fileData) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');
        const req = store.put({ key, data: fileData, updatedAt: Date.now() });
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } else {
      try {
        localStorage.setItem(`file_${key}`, fileData);
        return true;
      } catch (e) {
        console.error('Storage quota exceeded:', e);
        return false;
      }
    }
  }

  async getFile(key) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('files', 'readonly');
        const store = tx.objectStore('files');
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.data : null);
        req.onerror = () => resolve(null);
      });
    } else {
      return localStorage.getItem(`file_${key}`);
    }
  }

  async removeFile(key) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      });
    } else {
      localStorage.removeItem(`file_${key}`);
      return true;
    }
  }

  // Profile
  async saveProfile(profileData) {
    await this.initPromise;
    if (this.db) {
      try {
        const tx = this.db.transaction('profile', 'readwrite');
        tx.objectStore('profile').put({ key: 'main', ...profileData });
      } catch (e) {
        console.warn('saveProfile db error:', e);
      }
    }
    try {
      localStorage.setItem('portfolio_profile', JSON.stringify(profileData));
    } catch (e) {}
  }

  async getProfile() {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('profile', 'readonly');
          const req = tx.objectStore('profile').get('main');
          req.onsuccess = () => {
            if (req.result) resolve(req.result);
            else {
              const fallback = localStorage.getItem('portfolio_profile');
              try { resolve(fallback ? JSON.parse(fallback) : null); } catch (e) { resolve(null); }
            }
          };
          req.onerror = () => {
            const fallback = localStorage.getItem('portfolio_profile');
            try { resolve(fallback ? JSON.parse(fallback) : null); } catch (e) { resolve(null); }
          };
        } catch (e) {
          const fallback = localStorage.getItem('portfolio_profile');
          try { resolve(fallback ? JSON.parse(fallback) : null); } catch (err) { resolve(null); }
        }
      });
    }
    const fallback = localStorage.getItem('portfolio_profile');
    try {
      return fallback ? JSON.parse(fallback) : null;
    } catch (e) {
      return null;
    }
  }

  // Projects CRUD
  async getProjects() {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('projects', 'readonly');
          const store = tx.objectStore('projects');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => {
            const data = localStorage.getItem('portfolio_projects');
            try { resolve(data ? JSON.parse(data) : []); } catch (e) { resolve([]); }
          };
        } catch (e) {
          const data = localStorage.getItem('portfolio_projects');
          try { resolve(data ? JSON.parse(data) : []); } catch (err) { resolve([]); }
        }
      });
    }
    const data = localStorage.getItem('portfolio_projects');
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveProjects(projects) {
    await this.initPromise;
    if (this.db) {
      try {
        const tx = this.db.transaction('projects', 'readwrite');
        const store = tx.objectStore('projects');
        store.clear();
        projects.forEach((item) => store.put(item));
      } catch (e) {
        console.warn('saveProjects db error:', e);
      }
    }
    try {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage quota limit reached, data preserved in IndexedDB');
    }
  }

  // Certificates CRUD
  async getCertificates() {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('certificates', 'readonly');
          const store = tx.objectStore('certificates');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => {
            const data = localStorage.getItem('portfolio_certificates');
            try { resolve(data ? JSON.parse(data) : []); } catch (e) { resolve([]); }
          };
        } catch (e) {
          const data = localStorage.getItem('portfolio_certificates');
          try { resolve(data ? JSON.parse(data) : []); } catch (err) { resolve([]); }
        }
      });
    }
    const data = localStorage.getItem('portfolio_certificates');
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveCertificates(certificates) {
    await this.initPromise;
    if (this.db) {
      try {
        const tx = this.db.transaction('certificates', 'readwrite');
        const store = tx.objectStore('certificates');
        store.clear();
        certificates.forEach((item) => store.put(item));
      } catch (e) {
        console.warn('saveCertificates db error:', e);
      }
    }
    try {
      localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
    } catch (e) {
      console.warn('LocalStorage quota reached, certificates preserved in IndexedDB');
    }
  }
}

window.portfolioStorage = new PortfolioStorage();

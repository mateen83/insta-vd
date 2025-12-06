import { logger } from './logger';

// In-memory cache fallback when Redis is not available
class MemoryCache {
  private cache: Map<string, { value: any; expiry: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    const expiry = Date.now() + (ttl * 1000);
    this.cache.set(key, { value, expiry });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  // Cleanup expired entries periodically
  startCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now > item.expiry) {
          this.cache.delete(key);
        }
      }
    }, 60000); // Every minute
  }
}

export const memoryCache = new MemoryCache();
memoryCache.startCleanup();

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    return await memoryCache.get<T>(key);
  } catch (error) {
    logger.error('Cache get error:', error);
    return null;
  }
}

export async function setCache(key: string, value: any, ttl: number): Promise<void> {
  try {
    await memoryCache.set(key, value, ttl);
  } catch (error) {
    logger.error('Cache set error:', error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await memoryCache.del(key);
  } catch (error) {
    logger.error('Cache delete error:', error);
  }
}

logger.info('Using in-memory cache (Redis not available)');

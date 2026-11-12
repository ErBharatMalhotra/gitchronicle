/**
 * GitChronicle 3-Layer Edge Caching Architecture
 * - Layer 1: In-Memory / Global LRU Cache with stale-while-revalidate (SWR)
 * - Layer 2: Optional Upstash Redis KV integration (if env vars provided)
 * - Layer 3: Next.js Cache & SWR TTL headers
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  staleAt: number;
}

// 6 Hours Fresh TTL, 24 Hours Stale Tolerance
const FRESH_TTL_MS = 6 * 60 * 60 * 1000;
const STALE_TTL_MS = 24 * 60 * 60 * 1000;

class MemoryCacheManager {
  private cache: Map<string, CacheEntry<unknown>> = new Map();

  get<T>(key: string): { data: T | null; isStale: boolean } {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) {
      return { data: null, isStale: false };
    }

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return { data: null, isStale: false };
    }

    const isStale = now > entry.staleAt;
    return { data: entry.data, isStale };
  }

  set<T>(key: string, data: T, ttlMs: number = FRESH_TTL_MS): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      staleAt: now + ttlMs,
      expiresAt: now + ttlMs + STALE_TTL_MS,
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global singleton to persist across serverless invocations in dev and warm edge containers
const globalCache = (globalThis as unknown as { __gitChronicleCache?: MemoryCacheManager }).__gitChronicleCache || new MemoryCacheManager();
if (process.env.NODE_ENV !== "production") {
  (globalThis as unknown as { __gitChronicleCache?: MemoryCacheManager }).__gitChronicleCache = globalCache;
}

export const cache = {
  async get<T>(key: string): Promise<{ data: T | null; isStale: boolean }> {
    // 1. Check in-memory layer
    const memResult = globalCache.get<T>(key);
    if (memResult.data) {
      return memResult;
    }

    // 2. Optional Upstash Redis KV check
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (redisUrl && redisToken) {
      try {
        const response = await fetch(`${redisUrl}/get/${encodeURIComponent(key)}`, {
          headers: {
            Authorization: `Bearer ${redisToken}`,
          },
          cache: "no-store",
        });
        if (response.ok) {
          const json = await response.json();
          if (json.result) {
            const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
            // Warm local memory
            globalCache.set(key, parsed, FRESH_TTL_MS);
            return { data: parsed as T, isStale: false };
          }
        }
      } catch (err) {
        console.warn("Redis KV cache read fallback to memory:", err);
      }
    }

    return { data: null, isStale: false };
  },

  async set<T>(key: string, data: T, ttlMs: number = FRESH_TTL_MS): Promise<void> {
    globalCache.set(key, data, ttlMs);

    // Optional Upstash Redis KV write
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (redisUrl && redisToken) {
      try {
        const seconds = Math.floor(ttlMs / 1000);
        await fetch(`${redisUrl}/setex/${encodeURIComponent(key)}/${seconds}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${redisToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.warn("Redis KV cache write error:", err);
      }
    }
  },
};

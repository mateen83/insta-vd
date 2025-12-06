import { chromium, Browser, Page } from 'playwright';
import { config } from '../config';
import { logger } from '../utils/logger';

// Try Redis first, fallback to memory cache
let getCached: any, setCache: any;
try {
  const redis = require('../utils/redis');
  getCached = redis.getCached;
  setCache = redis.setCache;
} catch {
  const fallback = require('../utils/redis-fallback');
  getCached = fallback.getCached;
  setCache = fallback.setCache;
}

interface InstagramVideoData {
  success: boolean;
  source_type: 'reel' | 'post' | 'tv';
  video_direct_url: string;
  thumbnail_url?: string;
  expires_hint: string;
  method: string;
}

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    browser = await chromium.launch({
      headless: config.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      ...(config.proxyUrl && {
        proxy: {
          server: config.proxyUrl,
        },
      }),
    });

    browser.on('disconnected', () => {
      logger.warn('Browser disconnected');
      browser = null;
    });
  }

  return browser;
}

export async function extractInstagramVideo(
  url: string,
  sourceType: 'reel' | 'post' | 'tv'
): Promise<InstagramVideoData> {
  const cacheKey = `instagram:${url}`;
  
  // Check cache first
  const cached = await getCached<InstagramVideoData>(cacheKey);
  if (cached) {
    logger.info('Returning cached result for:', url);
    return cached;
  }

  let page: Page | null = null;

  try {
    const browserInstance = await getBrowser();
    page = await browserInstance.newPage();

    // Set user agent to avoid detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Set viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to Instagram URL
    logger.info('Navigating to:', url);
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for video element
    await page.waitForSelector('video', { timeout: 10000 });

    // Extract video URL and thumbnail
    const videoData = await page.evaluate(() => {
      const video = document.querySelector('video');
      const img = document.querySelector('img[srcset]');
      
      return {
        videoUrl: video?.src || video?.querySelector('source')?.src || null,
        thumbnailUrl: img?.src || null,
      };
    });

    if (!videoData.videoUrl) {
      throw new Error('Could not extract video URL from page');
    }

    const result: InstagramVideoData = {
      success: true,
      source_type: sourceType,
      video_direct_url: videoData.videoUrl,
      thumbnail_url: videoData.thumbnailUrl || undefined,
      expires_hint: 'Instagram CDN links may expire; re-resolve if download fails.',
      method: 'playwright',
    };

    // Cache the result
    await setCache(cacheKey, result, config.cacheTTL);

    logger.info('Successfully extracted video URL');
    return result;

  } catch (error) {
    logger.error('Error extracting Instagram video:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw new Error('Timeout while loading Instagram page. The post may be private or unavailable.');
      }
      if (error.message.includes('net::ERR')) {
        throw new Error('Network error while accessing Instagram. Please try again.');
      }
    }

    throw new Error('Failed to extract video. The post may be private, deleted, or unavailable.');
  } finally {
    if (page) {
      await page.close().catch((err) => logger.error('Error closing page:', err));
    }
  }
}

// Cleanup function
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
    logger.info('Browser closed');
  }
}

// Cleanup on process exit
process.on('SIGINT', closeBrowser);
process.on('SIGTERM', closeBrowser);

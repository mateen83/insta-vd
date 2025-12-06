import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  proxyUrl: process.env.PROXY_URL,
  headless: process.env.HEADLESS !== 'false',
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '10', 10),
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10),
  cacheTTL: parseInt(process.env.CACHE_TTL || '600', 10),
  maxVideoSizeMB: parseInt(process.env.MAX_VIDEO_SIZE_MB || '500', 10),
  ffmpegTimeout: parseInt(process.env.FFMPEG_TIMEOUT || '300000', 10),
};

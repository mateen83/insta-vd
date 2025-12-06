import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { config } from './config';
import { logger } from './utils/logger';
import resolveRoute from './routes/resolve';
import downloadRoute from './routes/download';

// Try to use Redis, fallback to memory cache if not available
let redisClient: any = null;
let useMemoryCache = false;

try {
  const redis = require('./utils/redis');
  redisClient = redis.redisClient;
} catch (error) {
  logger.warn('Redis not available, using in-memory cache');
  useMemoryCache = true;
}

const server = Fastify({
  logger: logger,
  trustProxy: true,
  bodyLimit: 1048576, // 1MB
});

async function start() {
  try {
    // Register CORS
    await server.register(cors, {
      origin: true,
      credentials: true,
    });

    // Register rate limiting (only if Redis is available)
    if (!useMemoryCache && redisClient) {
      await server.register(rateLimit, {
        max: config.rateLimitMax,
        timeWindow: config.rateLimitWindow,
        redis: redisClient,
        skipOnError: true,
        keyGenerator: (request) => {
          return request.headers['x-forwarded-for'] as string || 
                 request.headers['x-real-ip'] as string || 
                 request.ip;
        },
      });
    } else {
      // Simple in-memory rate limiting
      await server.register(rateLimit, {
        max: config.rateLimitMax,
        timeWindow: config.rateLimitWindow,
        skipOnError: true,
      });
    }

    // Health check endpoint
    server.get('/health', async () => {
      const redisHealthy = redisClient ? (redisClient.status === 'ready') : false;
      return {
        status: 'ok',
        redis: useMemoryCache ? 'memory-cache' : (redisHealthy ? 'connected' : 'disconnected'),
        cache: useMemoryCache ? 'in-memory' : 'redis',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      };
    });

    // Register routes
    await server.register(resolveRoute, { prefix: '/api' });
    await server.register(downloadRoute, { prefix: '/api' });

    // 404 handler
    server.setNotFoundHandler((request, reply) => {
      reply.code(404).send({
        success: false,
        error: 'Route not found',
        path: request.url,
      });
    });

    // Error handler
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error);
      
      const statusCode = error.statusCode || 500;
      const message = statusCode === 500 ? 'Internal server error' : error.message;

      reply.code(statusCode).send({
        success: false,
        error: message,
      });
    });

    // Start server
    await server.listen({
      port: config.port,
      host: '0.0.0.0',
    });

    server.log.info(`Server listening on port ${config.port}`);
    server.log.info(`Environment: ${config.nodeEnv}`);
    server.log.info(`Cache: ${useMemoryCache ? 'in-memory' : 'redis'}`);

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`Received ${signal}, closing server...`);
    
    await server.close();
    if (redisClient && !useMemoryCache) {
      await redisClient.quit();
    }
    
    process.exit(0);
  });
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  server.log.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  server.log.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

start();

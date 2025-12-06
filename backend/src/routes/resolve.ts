import { FastifyPluginAsync } from 'fastify';
import { validateInstagramUrl } from '../utils/validate';
import { extractInstagramVideo } from '../services/instagram';

interface ResolveBody {
  url: string;
}

const resolveRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: ResolveBody }>('/resolve', {
    schema: {
      body: {
        type: 'object',
        required: ['url'],
        properties: {
          url: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            source_type: { type: 'string' },
            video_direct_url: { type: 'string' },
            thumbnail_url: { type: 'string' },
            expires_hint: { type: 'string' },
            method: { type: 'string' },
          },
        },
        400: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { url } = request.body;

      // Validate URL
      const validation = validateInstagramUrl(url);
      if (!validation.valid) {
        return reply.code(400).send({
          success: false,
          error: validation.error || 'Invalid Instagram URL',
        });
      }

      try {
        // Extract video data
        const videoData = await extractInstagramVideo(url, validation.type!);

        return reply.code(200).send(videoData);

      } catch (error) {
        fastify.log.error('Error in resolve route:', error);

        const message = error instanceof Error ? error.message : 'Failed to resolve Instagram video';

        return reply.code(500).send({
          success: false,
          error: message,
        });
      }
    },
  });
};

export default resolveRoute;

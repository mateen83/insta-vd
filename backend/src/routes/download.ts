import { FastifyPluginAsync } from 'fastify';
import { validateFormat, sanitizeFilename } from '../utils/validate';
import { streamVideo, convertToMP3, getContentType, getFileExtension } from '../services/transcode';

interface DownloadQuery {
  url: string;
  format: string;
}

const downloadRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: DownloadQuery }>('/download', {
    schema: {
      querystring: {
        type: 'object',
        required: ['url', 'format'],
        properties: {
          url: { type: 'string' },
          format: { type: 'string', enum: ['mp4', 'mp3'] },
        },
      },
    },
    handler: async (request, reply) => {
      const { url, format } = request.query;

      // Validate format
      if (!validateFormat(format)) {
        return reply.code(400).send({
          success: false,
          error: 'Invalid format. Must be mp4 or mp3',
        });
      }

      // Validate URL (basic check)
      if (!url || !url.startsWith('http')) {
        return reply.code(400).send({
          success: false,
          error: 'Invalid video URL',
        });
      }

      try {
        const timestamp = Date.now();
        const filename = `instagram_${timestamp}.${getFileExtension(format)}`;
        const contentType = getContentType(format);

        // Set headers
        reply.header('Content-Type', contentType);
        reply.header('Content-Disposition', `attachment; filename="${sanitizeFilename(filename)}"`);
        reply.header('Cache-Control', 'no-cache');
        reply.header('X-Content-Type-Options', 'nosniff');

        if (format === 'mp4') {
          // Stream MP4 directly
          fastify.log.info('Streaming MP4:', url);
          
          const videoStream = await streamVideo(url);
          
          // Pipe video stream to response
          return reply.send(videoStream);

        } else {
          // Convert to MP3 and stream
          fastify.log.info('Converting to MP3:', url);
          
          const mp3Stream = await convertToMP3(url);
          
          // Handle stream errors
          mp3Stream.on('error', (error) => {
            fastify.log.error('MP3 stream error:', error);
            if (!reply.sent) {
              reply.code(500).send({
                success: false,
                error: 'Conversion failed',
              });
            }
          });

          // Pipe MP3 stream to response
          return reply.send(mp3Stream);
        }

      } catch (error) {
        fastify.log.error('Error in download route:', error);

        const message = error instanceof Error ? error.message : 'Download failed';

        if (!reply.sent) {
          return reply.code(500).send({
            success: false,
            error: message,
          });
        }
      }
    },
  });
};

export default downloadRoute;

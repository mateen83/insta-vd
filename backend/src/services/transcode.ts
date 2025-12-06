import ffmpeg from 'fluent-ffmpeg';
import { PassThrough, Readable } from 'stream';
import { logger } from '../utils/logger';
import { config } from '../config';
import https from 'https';
import http from 'http';

export async function streamVideo(videoUrl: string): Promise<Readable> {
  return new Promise((resolve, reject) => {
    const protocol = videoUrl.startsWith('https') ? https : http;
    
    const request = protocol.get(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
      },
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch video: HTTP ${response.statusCode}`));
        return;
      }

      // Check content length
      const contentLength = parseInt(response.headers['content-length'] || '0', 10);
      const maxSize = config.maxVideoSizeMB * 1024 * 1024;
      
      if (contentLength > maxSize) {
        reject(new Error(`Video size exceeds maximum allowed (${config.maxVideoSizeMB}MB)`));
        return;
      }

      resolve(response);
    });

    request.on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

export async function convertToMP3(videoUrl: string): Promise<PassThrough> {
  const outputStream = new PassThrough();

  try {
    logger.info('Starting MP3 conversion for:', videoUrl);

    const command = ffmpeg()
      .input(videoUrl)
      .inputOptions([
        '-headers', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ])
      .noVideo()
      .audioCodec('libmp3lame')
      .audioBitrate('192k')
      .audioQuality(2) // VBR quality
      .format('mp3')
      .on('start', (commandLine) => {
        logger.debug('FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          logger.debug(`Conversion progress: ${progress.percent.toFixed(2)}%`);
        }
      })
      .on('error', (error, stdout, stderr) => {
        logger.error('FFmpeg error:', error.message);
        logger.error('FFmpeg stderr:', stderr);
        
        if (!outputStream.destroyed) {
          outputStream.destroy(new Error(`Conversion failed: ${error.message}`));
        }
      })
      .on('end', () => {
        logger.info('MP3 conversion completed');
        outputStream.end();
      });

    // Set timeout
    const timeout = setTimeout(() => {
      command.kill('SIGKILL');
      if (!outputStream.destroyed) {
        outputStream.destroy(new Error('Conversion timeout'));
      }
    }, config.ffmpegTimeout);

    outputStream.on('close', () => {
      clearTimeout(timeout);
    });

    // Pipe to output stream
    command.pipe(outputStream, { end: true });

    return outputStream;

  } catch (error) {
    logger.error('Error setting up MP3 conversion:', error);
    throw new Error('Failed to initialize MP3 conversion');
  }
}

export function getContentType(format: 'mp4' | 'mp3'): string {
  return format === 'mp4' ? 'video/mp4' : 'audio/mpeg';
}

export function getFileExtension(format: 'mp4' | 'mp3'): string {
  return format;
}

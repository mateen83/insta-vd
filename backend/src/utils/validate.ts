export function validateInstagramUrl(url: string): {
  valid: boolean;
  type?: 'reel' | 'post' | 'tv';
  shortcode?: string;
  error?: string;
} {
  try {
    const urlObj = new URL(url);
    
    if (!urlObj.hostname.includes('instagram.com')) {
      return { valid: false, error: 'Not an Instagram URL' };
    }

    const patterns = {
      reel: /\/reel\/([\w-]+)/,
      post: /\/p\/([\w-]+)/,
      tv: /\/tv\/([\w-]+)/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      const match = urlObj.pathname.match(pattern);
      if (match) {
        return {
          valid: true,
          type: type as 'reel' | 'post' | 'tv',
          shortcode: match[1],
        };
      }
    }

    return { valid: false, error: 'Invalid Instagram URL format. Must be a reel, post, or TV video.' };
  } catch (error) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9_-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 100);
}

export function validateFormat(format: string): format is 'mp4' | 'mp3' {
  return format === 'mp4' || format === 'mp3';
}

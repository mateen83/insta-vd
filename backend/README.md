# Instagram Video Downloader Backend

Production-ready backend service for downloading Instagram videos (Reels, Posts, TV) in MP4 format and converting to MP3.

## Features

- ✅ Extract video URLs from public Instagram posts, reels, and TV videos
- ✅ Stream MP4 videos directly to clients
- ✅ Convert videos to MP3 using FFmpeg with VBR quality
- ✅ Redis-based caching and rate limiting
- ✅ Headless browser (Playwright) for reliable extraction
- ✅ Docker support with docker-compose
- ✅ Production-ready error handling and logging
- ✅ No permanent data storage
- ✅ Streaming architecture (no full file buffering)

## Prerequisites

- Node.js 20+
- Redis 7+
- FFmpeg (with libmp3lame support)
- Docker & Docker Compose (for containerized deployment)

## Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npx playwright install chromium
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Start Redis:**
```bash
docker run -d -p 6379:6379 redis:7-alpine
```

5. **Run development server:**
```bash
npm run dev
```

Server will start on `http://localhost:3001`

### Docker Deployment

1. **Build and start services:**
```bash
docker-compose up -d
```

2. **Check logs:**
```bash
docker-compose logs -f backend
```

3. **Stop services:**
```bash
docker-compose down
```

## API Documentation

### 1. Resolve Instagram Video

Extract video URL from Instagram post.

**Endpoint:** `POST /api/resolve`

**Request Body:**
```json
{
  "url": "https://www.instagram.com/reel/XXXX/"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "source_type": "reel",
  "video_direct_url": "https://scontent.cdninstagram.com/...",
  "thumbnail_url": "https://scontent.cdninstagram.com/...",
  "expires_hint": "Instagram CDN links may expire; re-resolve if download fails.",
  "method": "playwright"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Example with curl:**
```bash
curl -X POST http://localhost:3001/api/resolve \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/reel/XXXX/"}'
```

### 2. Download Video

Download video in MP4 or convert to MP3.

**Endpoint:** `GET /api/download?url=VIDEO_URL&format=FORMAT`

**Query Parameters:**
- `url` (required): Direct video URL from `/api/resolve`
- `format` (required): `mp4` or `mp3`

**Response:** Binary stream (video/audio file)

**Headers:**
- `Content-Type`: `video/mp4` or `audio/mpeg`
- `Content-Disposition`: `attachment; filename="instagram_TIMESTAMP.mp4"`

**Example with curl (MP4):**
```bash
curl "http://localhost:3001/api/download?url=VIDEO_URL&format=mp4" \
  -o video.mp4
```

**Example with curl (MP3):**
```bash
curl "http://localhost:3001/api/download?url=VIDEO_URL&format=mp3" \
  -o audio.mp3
```

### 3. Health Check

Check service health.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "redis": "connected",
  "uptime": 12345.67,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Complete Workflow Example

```bash
# Step 1: Resolve Instagram video
RESPONSE=$(curl -s -X POST http://localhost:3001/api/resolve \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/reel/XXXX/"}')

# Step 2: Extract video URL
VIDEO_URL=$(echo $RESPONSE | jq -r '.video_direct_url')

# Step 3: Download as MP4
curl "$VIDEO_URL" -o video.mp4

# Or download as MP3
curl "http://localhost:3001/api/download?url=$VIDEO_URL&format=mp3" \
  -o audio.mp3
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL |
| `PROXY_URL` | - | Optional HTTP proxy |
| `HEADLESS` | `true` | Run browser in headless mode |
| `RATE_LIMIT_MAX` | `10` | Max requests per window |
| `RATE_LIMIT_WINDOW` | `60000` | Rate limit window (ms) |
| `CACHE_TTL` | `600` | Cache TTL in seconds |
| `MAX_VIDEO_SIZE_MB` | `500` | Maximum video size |
| `FFMPEG_TIMEOUT` | `300000` | FFmpeg timeout (ms) |

## Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     Fastify Server              │
│  ┌──────────┐  ┌──────────┐   │
│  │ /resolve │  │/download │   │
│  └────┬─────┘  └────┬─────┘   │
│       │             │          │
│  ┌────▼─────────────▼─────┐   │
│  │   Rate Limiting         │   │
│  │   (Redis)               │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
       │             │
       ▼             ▼
┌─────────────┐ ┌──────────┐
│  Playwright │ │  FFmpeg  │
│  (Extract)  │ │(Convert) │
└─────────────┘ └──────────┘
```

## Security & Legal Notes

⚠️ **Important:**

1. **Public Content Only:** This service only works with public Instagram posts. Private posts require authentication and are not supported.

2. **Terms of Service:** Users must comply with Instagram's Terms of Service. This tool is for personal use and authorized content only.

3. **Rate Limiting:** Built-in rate limiting prevents abuse. Default: 10 requests per minute per IP.

4. **No Data Storage:** No user data or videos are stored permanently. All operations are streaming-based.

5. **CDN Link Expiration:** Instagram CDN links expire after some time. If a download fails, re-resolve the URL.

6. **Copyright:** Users are responsible for ensuring they have rights to download content.

## Troubleshooting

### Browser Issues

If Playwright fails to launch:

```bash
# Install system dependencies (Ubuntu/Debian)
sudo apt-get install -y \
  libnss3 \
  libnspr4 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2
```

### FFmpeg Issues

Ensure FFmpeg is installed with MP3 support:

```bash
# Check FFmpeg
ffmpeg -version

# Check for libmp3lame
ffmpeg -codecs | grep mp3
```

### Redis Connection

Test Redis connection:

```bash
redis-cli ping
# Should return: PONG
```

## Performance Tips

1. **Caching:** Results are cached for 10 minutes by default. Adjust `CACHE_TTL` as needed.

2. **Rate Limiting:** Adjust `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW` based on your needs.

3. **Proxy:** Use `PROXY_URL` if Instagram blocks your IP.

4. **Resource Limits:** Set `MAX_VIDEO_SIZE_MB` to prevent memory issues.

## Monitoring

### Health Check

```bash
curl http://localhost:3001/health
```

### Docker Logs

```bash
# Follow logs
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Redis Monitoring

```bash
# Connect to Redis
docker-compose exec redis redis-cli

# Check keys
KEYS *

# Monitor commands
MONITOR
```

## Development

### Build TypeScript

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

### Linting

```bash
npm run lint
```

## License

MIT

## Support

For issues and questions, please open an issue on the repository.

---

**Note:** This is a backend service only. You'll need to integrate it with your Next.js frontend by calling these API endpoints from your existing `/api/download` route.

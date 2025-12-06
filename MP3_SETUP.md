# MP3 Download Feature Setup

The MP3 download feature requires the backend service to be running for audio conversion.

## Quick Setup

### Option 1: Run Backend Locally (Recommended for Development)

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright:**
```bash
npx playwright install chromium
```

4. **Start Redis (using Docker):**
```bash
docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
```

5. **Create .env file:**
```bash
cp .env.example .env
```

6. **Start backend:**
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

7. **Configure Next.js app:**

Create `.env.local` in the root directory:
```bash
BACKEND_URL=http://localhost:3001
```

8. **Restart your Next.js app:**
```bash
npm run dev
```

### Option 2: Docker Deployment (Production)

1. **Navigate to backend:**
```bash
cd backend
```

2. **Start with Docker Compose:**
```bash
docker-compose up -d
```

3. **Configure Next.js:**

In your `.env.local` or `.env.production`:
```bash
BACKEND_URL=http://localhost:3001
# Or use your production URL
# BACKEND_URL=https://api.yourdomain.com
```

## How It Works

1. **MP4 Download:** Direct streaming from Instagram CDN (no backend needed)
2. **MP3 Download:** 
   - Video URL is sent to backend
   - Backend uses FFmpeg to extract audio
   - Converts to MP3 with VBR quality
   - Streams MP3 back to user

## Testing

1. Paste an Instagram reel URL
2. Click "Download Video"
3. You should see two buttons:
   - **Download MP4** (green) - Downloads video
   - **Download MP3 (Audio Only)** (outlined) - Converts and downloads audio

## Troubleshooting

### "MP3 conversion requires backend service"

This means the backend is not running or `BACKEND_URL` is not set.

**Solution:**
1. Make sure backend is running: `cd backend && npm run dev`
2. Set `BACKEND_URL` in `.env.local`
3. Restart Next.js app

### Backend won't start

**Check Redis:**
```bash
docker ps | grep redis
```

If not running:
```bash
docker start instagram-redis
```

**Check FFmpeg:**
```bash
ffmpeg -version
```

If not installed:
- **macOS:** `brew install ffmpeg`
- **Ubuntu:** `sudo apt-get install ffmpeg`
- **Windows:** Download from https://ffmpeg.org/download.html

### MP3 download is slow

This is normal! MP3 conversion happens in real-time:
- Small videos (< 1 min): ~5-10 seconds
- Medium videos (1-3 min): ~15-30 seconds
- Large videos (> 3 min): ~30-60 seconds

## Architecture

```
User clicks "Download MP3"
        ↓
Next.js Frontend (/api/proxy-download)
        ↓
Backend Service (localhost:3001/api/download?format=mp3)
        ↓
FFmpeg converts video → MP3
        ↓
Streams MP3 to user
```

## Production Deployment

For production, deploy the backend separately:

1. **Deploy backend** to a VPS/cloud service
2. **Set environment variable** in your Next.js deployment:
   ```
   BACKEND_URL=https://your-backend-api.com
   ```
3. **Ensure backend has:**
   - FFmpeg installed
   - Redis running
   - Sufficient resources for conversion

## Without Backend

If you don't want to run the backend:
- MP4 downloads will work fine
- MP3 button will show an error message
- You can hide the MP3 button by modifying `components/video-result.tsx`

To hide MP3 button, remove this section from `video-result.tsx`:
```tsx
<Button
  onClick={() => handleDownload('mp3')}
  disabled={downloadingMp3 || !data.video_url}
  variant="outline"
  className="w-full border-primary/50 hover:bg-primary/10 text-foreground"
>
  {downloadingMp3 ? (
    "Converting & Downloading..."
  ) : (
    <>
      <Music className="w-4 h-4 mr-2" />
      Download MP3 (Audio Only)
    </>
  )}
</Button>
```

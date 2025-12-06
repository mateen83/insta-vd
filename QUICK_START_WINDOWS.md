# Quick Start Guide for Windows

## Enable MP3 Downloads in 3 Steps

### Step 1: Install Redis (One-time setup)

**Option A: Using Docker (Recommended)**

If you have Docker Desktop installed:

```cmd
docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
```

**Option B: Redis for Windows**

1. Download Redis from: https://github.com/microsoftarchive/redis/releases
2. Install and start the Redis service

### Step 2: Setup Backend

Open Command Prompt or PowerShell in the project root:

```cmd
cd backend
setup-windows.bat
```

This will:
- Install all dependencies
- Install Playwright browser
- Create .env file

### Step 3: Start Backend

```cmd
cd backend
start-backend.bat
```

You should see:
```
Server listening on port 3001
Environment: development
Redis: ready
```

### Step 4: Configure Next.js App

Create `.env.local` in the root directory (not in backend folder):

```
BACKEND_URL=http://localhost:3001
```

### Step 5: Restart Next.js

Stop your Next.js dev server (Ctrl+C) and restart:

```cmd
npm run dev
```

## ✅ Test It

1. Go to http://localhost:3000
2. Paste an Instagram reel URL
3. Click "Download Video"
4. You should now see both:
   - **Download MP4** button
   - **Download MP3 (Audio Only)** button

## Troubleshooting

### "MP3 conversion requires backend service"

**Check if backend is running:**

Open http://localhost:3001/health in your browser.

You should see:
```json
{
  "status": "ok",
  "redis": "connected",
  "uptime": 123.45
}
```

If you get an error:
1. Make sure you ran `start-backend.bat`
2. Check if Redis is running: `docker ps | findstr redis`

**Check .env.local:**

Make sure you have `.env.local` in the ROOT directory (not backend):

```
BACKEND_URL=http://localhost:3001
```

**Restart Next.js:**

After creating `.env.local`, restart your Next.js server.

### Redis Connection Error

If backend shows "Redis client error":

```cmd
# Check if Redis container is running
docker ps

# If not running, start it
docker start instagram-redis

# Or create new one
docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
```

### Port 3001 Already in Use

If you see "Port 3001 is in use":

```cmd
# Find what's using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

Or change the port in `backend/.env`:
```
PORT=3002
```

Then update `.env.local`:
```
BACKEND_URL=http://localhost:3002
```

### FFmpeg Not Found

The backend needs FFmpeg for MP3 conversion.

**Install FFmpeg:**

1. Download from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to `C:\ffmpeg`
3. Add to PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add `C:\ffmpeg\bin`
4. Restart Command Prompt
5. Test: `ffmpeg -version`

## Keep Backend Running

The backend needs to stay running for MP3 downloads to work.

**Option 1: Keep terminal open**
- Just leave the `start-backend.bat` terminal window open

**Option 2: Run as background service (Advanced)**
- Use PM2: `npm install -g pm2`
- Start: `pm2 start npm --name "instagram-backend" -- run dev`
- Stop: `pm2 stop instagram-backend`

## Production Deployment

For production, deploy the backend to a cloud service:

1. **Deploy backend** to Heroku, Railway, or any VPS
2. **Set environment variable** in Vercel/Netlify:
   ```
   BACKEND_URL=https://your-backend-url.com
   ```

## Architecture

```
┌─────────────────┐
│  Next.js App    │  (localhost:3000)
│  (Frontend)     │
└────────┬────────┘
         │
         │ MP4: Direct download
         │ MP3: Calls backend ↓
         │
┌────────▼────────┐
│  Backend API    │  (localhost:3001)
│  + Redis        │
│  + FFmpeg       │
└─────────────────┘
```

## Need Help?

1. Check backend logs in the terminal
2. Check browser console (F12)
3. Visit http://localhost:3001/health to verify backend is running
4. Make sure `.env.local` exists in root directory with `BACKEND_URL=http://localhost:3001`

# 🚀 Enable MP3 Downloads - Quick Guide

## Current Status
❌ MP3 downloads are **NOT working** because backend is not running.

## Fix in 3 Commands

### 1️⃣ Start Redis
```cmd
docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
```

### 2️⃣ Setup & Start Backend
```cmd
cd backend
setup-windows.bat
start-backend.bat
```

### 3️⃣ Restart Next.js
Press `Ctrl+C` in your Next.js terminal, then:
```cmd
npm run dev
```

## ✅ Verify It's Working

Run this script:
```cmd
check-backend.bat
```

You should see:
- ✓ Backend is RUNNING
- ✓ Redis container is running  
- ✓ .env.local exists

## 🎵 Test MP3 Download

1. Go to http://localhost:3000
2. Paste Instagram reel URL
3. Click "Download Video"
4. Click "Download MP3 (Audio Only)" button

## 📁 Important Files

- `.env.local` - Already created with `BACKEND_URL=http://localhost:3001`
- `backend/` - Backend service for MP3 conversion
- `check-backend.bat` - Check if everything is running

## Need Help?

See `QUICK_START_WINDOWS.md` for detailed troubleshooting.

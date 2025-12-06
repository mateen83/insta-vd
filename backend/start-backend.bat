@echo off
echo ========================================
echo Starting Instagram Downloader Backend
echo ========================================
echo.

REM Check if Redis is running
echo Checking Redis connection...
curl -s http://localhost:6379 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo WARNING: Redis might not be running!
    echo Please start Redis first:
    echo   docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
    echo.
    echo Press any key to continue anyway, or Ctrl+C to exit...
    pause >nul
)

echo.
echo Starting backend server on http://localhost:3001
echo Press Ctrl+C to stop
echo.

npm run dev

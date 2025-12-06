@echo off
echo ========================================
echo Backend Status Checker
echo ========================================
echo.

echo [1] Checking if backend is running...
curl -s http://localhost:3001/health >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Backend is RUNNING
    echo.
    echo Backend Health:
    curl -s http://localhost:3001/health
    echo.
) else (
    echo ✗ Backend is NOT running
    echo.
    echo To start backend:
    echo   cd backend
    echo   start-backend.bat
    echo.
)

echo.
echo [2] Checking Redis...
docker ps | findstr instagram-redis >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Redis container is running
) else (
    echo ✗ Redis is NOT running
    echo.
    echo To start Redis:
    echo   docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
    echo.
)

echo.
echo [3] Checking .env.local...
if exist .env.local (
    echo ✓ .env.local exists
    type .env.local
) else (
    echo ✗ .env.local NOT found
    echo.
    echo Create .env.local with:
    echo   BACKEND_URL=http://localhost:3001
    echo.
)

echo.
echo ========================================
pause

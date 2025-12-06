@echo off
echo ========================================
echo Instagram Downloader Backend Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Node.js found: 
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)

echo [2/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [3/5] Installing Playwright Chromium...
call npx playwright install chromium
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Playwright installation had issues, but continuing...
)
echo.

echo [4/5] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created!
) else (
    echo .env file already exists, skipping...
)
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo IMPORTANT: You need Redis running!
echo ========================================
echo.
echo Option 1 - Using Docker (Recommended):
echo   docker run -d -p 6379:6379 --name instagram-redis redis:7-alpine
echo.
echo Option 2 - Install Redis for Windows:
echo   Download from: https://github.com/microsoftarchive/redis/releases
echo.
echo ========================================
echo To start the backend server, run:
echo   npm run dev
echo ========================================
echo.
pause

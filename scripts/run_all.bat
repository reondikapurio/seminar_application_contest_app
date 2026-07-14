@echo off
title Central IoT Server Launcher

echo ====================================================
echo   Starting Central IoT Platform (FastAPI + Next.js)...
echo ====================================================

:: バッチファイルの親ディレクトリにカレントフォルダを移動
cd /d "%~dp0"

:: 1. バックエンドを別ウィンドウでバックグラウンド起動 (Port 8000)
echo [1/3] Starting Backend (FastAPI)...
start "IoT-Backend (FastAPI)" cmd /k "cd /d backend && uvicorn main:app --host 127.0.0.1 --port 8000"

:: 2. フロントエンド（Next.js）を開発モードで起動 (Port 3000)
echo [2/3] Starting Frontend (Next.js)...
start "IoT-Frontend (Next.js)" cmd /k "cd /d frontend && npm run dev"

:: 3. 2秒待ってから、既定のブラウザでNext.jsを開く
timeout /t 2 >nul
echo [3/3] Launching Web Dashboard...
start http://localhost:3000

exit
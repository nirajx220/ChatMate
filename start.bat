@echo off
echo Starting ChatMate Application...
echo.

echo Starting Backend Server...
start cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Client...
start cmd /k "cd client && npm run dev"

echo.
echo Application started!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
pause


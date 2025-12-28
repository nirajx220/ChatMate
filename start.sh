#!/bin/bash

echo "Starting ChatMate Application..."
echo ""

echo "Starting Backend Server..."
cd server && npm start &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend Client..."
cd ../client && npm run dev &
FRONTEND_PID=$!

echo ""
echo "Application started!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

wait $BACKEND_PID $FRONTEND_PID


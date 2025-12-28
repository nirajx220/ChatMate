# Quick Setup Guide

## Step 1: Install Dependencies

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd client
npm install
```

## Step 2: Start the Application

### Option 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Server will run on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on: http://localhost:5173

### Option 2: Using Startup Scripts

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

## Step 3: Access the Application

1. Open your browser
2. Navigate to: http://localhost:5173
3. You'll see the login page
4. Use any demo user email (e.g., `test1@greatstack.dev`) with any password
5. Or click the quick login buttons

## Testing Real-Time Chat

1. Open two browser windows/tabs
2. Login as different users in each:
   - Tab 1: `test1@greatstack.dev` (Alison Martin)
   - Tab 2: `test2@greatstack.dev` (Martin Johnson)
3. In Tab 1, click on "Martin Johnson" in the sidebar
4. Send a message - you should see it appear in real-time in Tab 2
5. Send a message from Tab 2 - it will appear in Tab 1

## Troubleshooting

### Backend won't start
- Make sure port 3001 is not already in use
- Check that all dependencies are installed: `cd server && npm install`

### Frontend won't start
- Make sure port 5173 is not already in use
- Check that all dependencies are installed: `cd client && npm install`
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

### Messages not sending/receiving
- Ensure both backend and frontend servers are running
- Check browser console for errors
- Verify Socket.io connection in browser DevTools Network tab

### CORS Errors
- Make sure backend server is running before frontend
- Check that backend CORS is configured for `http://localhost:5173`

## Development Tips

- Backend uses auto-reload with `npm run dev` (if configured)
- Frontend uses Vite's Hot Module Replacement (HMR)
- Check browser console and terminal for debugging information
- Socket.io events are logged in the backend terminal


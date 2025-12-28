# ChatMate - Real-Time Chat Application

A modern, real-time chat application built with React, Socket.io, and Express.

## Features

- 🔄 **Real-time messaging** using Socket.io
- 👥 **User management** with online/offline status
- 🖼️ **Image sharing** support
- 💬 **Multiple chat conversations**
- 🔍 **User search** functionality
- 📱 **Responsive design** with Tailwind CSS
- 🎨 **Modern UI** with smooth animations

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Socket.io Client
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Socket.io
- CORS

## Project Structure

```
ChatMate/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Socket)
│   │   └── assets/         # Images and assets
│   └── package.json
└── server/                 # Node.js backend server
    ├── server.js           # Express & Socket.io server
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:3001`

2. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

### Quick Login

The application includes demo users for quick testing. You can:
- Use the login form with any email from the demo users
- Click on the quick login buttons on the login page

Demo users:
- test1@greatstack.dev (Alison Martin)
- test2@greatstack.dev (Martin Johnson)
- test3@greatstack.dev (Enrique Martinez)
- test4@greatstack.dev (Marco Jones)
- test5@greatstack.dev (Richard Smith)

## Usage

1. **Login**: 
   - Use the login page to authenticate (demo mode - no password required)
   - Or use the quick login buttons with demo users
   - Example: `test1@greatstack.dev` (any password works in demo mode)

2. **Select a User**: 
   - Click on any user in the sidebar to start chatting
   - Users with a green dot are online

3. **Send Messages**: 
   - Type your message in the input field
   - Click send button or press Enter to send

4. **Share Images**: 
   - Click the gallery icon in the chat header
   - Select an image to upload and share

5. **View Profile**: 
   - Click on a user to view their profile in the right sidebar
   - View shared media and user information

6. **Search Users**: 
   - Use the search bar in the sidebar to find users quickly

## Development

### Backend API

The server provides the following Socket.io events:

- `user:join` - Join with user ID
- `message:send` - Send a message
- `message:receive` - Receive a message
- `messages:get` - Get all messages for a chat
- `messages:seen` - Mark messages as seen
- `users:online` - Get list of online users

### Frontend Components

- **Sidebar**: Displays list of users and search functionality
- **ChatContainer**: Main chat interface with messages and input
- **RightSidebar**: User profile and media gallery
- **LoginPage**: Authentication interface
- **ProfilePage**: User profile management

## Notes

- The current implementation uses in-memory storage for messages and users
- For production use, consider integrating a database (MongoDB, PostgreSQL, etc.)
- Add proper authentication and authorization
- Implement message persistence
- Add file upload handling for images





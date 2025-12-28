# ChatMate Server

Backend server for the ChatMate real-time chat application.

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3001.

## Environment Variables

- `PORT` - Server port (default: 3001)

## API Endpoints

### REST API
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Socket.io Events

#### Client → Server
- `user:join` - Join with user ID
  ```javascript
  socket.emit('user:join', userId)
  ```

- `message:send` - Send a message
  ```javascript
  socket.emit('message:send', {
    senderId: 'user1',
    receiverId: 'user2',
    text: 'Hello!',
    image: null // optional
  })
  ```

- `messages:get` - Get messages for a chat
  ```javascript
  socket.emit('messages:get', {
    userId1: 'user1',
    userId2: 'user2'
  })
  ```

- `messages:seen` - Mark messages as seen
  ```javascript
  socket.emit('messages:seen', {
    userId1: 'user1',
    userId2: 'user2'
  })
  ```

#### Server → Client
- `message:receive` - Receive a new message
- `message:sent` - Confirm message was sent
- `messages:list` - Receive list of messages
- `users:online` - Receive list of online users


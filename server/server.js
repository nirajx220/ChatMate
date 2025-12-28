import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage (in production, use a database like MongoDB)
const users = new Map();
const messages = new Map(); // Map<chatId, messages[]>
const activeUsers = new Set();

// Helper function to generate chat ID
const getChatId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins with their ID
  socket.on('user:join', (userId) => {
    socket.userId = userId;
    activeUsers.add(userId);
    socket.join(userId);
    io.emit('users:online', Array.from(activeUsers));
  });

  // Send message
  socket.on('message:send', (data) => {
    const { senderId, receiverId, text, image } = data;
    const chatId = getChatId(senderId, receiverId);
    
    const message = {
      _id: Date.now().toString(),
      senderId,
      receiverId,
      text,
      image,
      seen: false,
      createdAt: new Date().toISOString()
    };

    // Store message
    if (!messages.has(chatId)) {
      messages.set(chatId, []);
    }
    messages.get(chatId).push(message);

    // Emit to receiver
    socket.to(receiverId).emit('message:receive', message);
    // Also emit back to sender for confirmation
    socket.emit('message:sent', message);
  });

  // Get messages for a chat
  socket.on('messages:get', (data) => {
    const { userId1, userId2 } = data;
    const chatId = getChatId(userId1, userId2);
    const chatMessages = messages.get(chatId) || [];
    socket.emit('messages:list', chatMessages);
  });

  // Mark messages as seen
  socket.on('messages:seen', (data) => {
    const { userId1, userId2 } = data;
    const chatId = getChatId(userId1, userId2);
    const chatMessages = messages.get(chatId) || [];
    
    chatMessages.forEach(msg => {
      if (msg.receiverId === socket.userId) {
        msg.seen = true;
      }
    });

    socket.to(userId1 === socket.userId ? userId2 : userId1).emit('messages:seen', { chatId });
  });

  // User disconnect
  socket.on('disconnect', () => {
    if (socket.userId) {
      activeUsers.delete(socket.userId);
      io.emit('users:online', Array.from(activeUsers));
    }
    console.log('User disconnected:', socket.id);
  });
});

// REST API routes
app.get('/api/users', (req, res) => {
  res.json(Array.from(users.values()));
});

app.post('/api/users', (req, res) => {
  const { email, fullName, profilePic, bio } = req.body;
  const userId = Date.now().toString();
  const user = { _id: userId, email, fullName, profilePic, bio };
  users.set(userId, user);
  res.json(user);
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


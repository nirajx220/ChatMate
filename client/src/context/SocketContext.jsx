
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('chatmate_currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Persist currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('chatmate_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('chatmate_currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    // Initialize socket connection
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && currentUser) {
      socket.emit('user:join', currentUser._id);
      
      socket.on('users:online', (users) => {
        setOnlineUsers(users);
      });
    }
  }, [socket, currentUser]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('chatmate_currentUser');
  };

  const value = {
    socket,
    currentUser,
    setCurrentUser,
    onlineUsers,
    logout
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};


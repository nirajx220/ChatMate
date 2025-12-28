import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import assets from '../assets/assets.js';

const ChatContainer = () => {
  const { socket, currentUser } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleUserSelected = (event) => {
      setSelectedUser(event.detail);
    };

    window.addEventListener('user:selected', handleUserSelected);
    return () => window.removeEventListener('user:selected', handleUserSelected);
  }, []);

  const loadMessages = React.useCallback((user) => {
    if (socket && currentUser && user) {
      socket.emit('messages:get', {
        userId1: currentUser._id,
        userId2: user._id
      });
    }
  }, [socket, currentUser]);

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser);
    }
  }, [selectedUser, loadMessages]);

  useEffect(() => {
    if (socket) {
      const handleMessageReceive = (message) => {
        if (
          (message.senderId === selectedUser?._id && message.receiverId === currentUser?._id) ||
          (message.receiverId === selectedUser?._id && message.senderId === currentUser?._id)
        ) {
          setMessages((prev) => {
            // Check if message already exists to avoid duplicates
            if (prev.some(m => m._id === message._id)) {
              return prev;
            }
            return [...prev, message];
          });
        }
      };

      const handleMessageSent = (message) => {
        setMessages((prev) => {
          // Check if message already exists to avoid duplicates
          if (prev.some(m => m._id === message._id)) {
            return prev;
          }
          return [...prev, message];
        });
      };

      const handleMessagesList = (messageList) => {
        setMessages(messageList);
      };

      socket.on('message:receive', handleMessageReceive);
      socket.on('message:sent', handleMessageSent);
      socket.on('messages:list', handleMessagesList);

      return () => {
        socket.off('message:receive', handleMessageReceive);
        socket.off('message:sent', handleMessageSent);
        socket.off('messages:list', handleMessagesList);
      };
    }
  }, [socket, selectedUser, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedUser || !currentUser || !socket) return;

    socket.emit('message:send', {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      text: inputMessage.trim()
    });

    setInputMessage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedUser || !currentUser || !socket) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      socket.emit('message:send', {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <img src={assets.logo_big} alt="ChatMate" className="w-32 h-32 mx-auto mb-4 opacity-50" />
          <p className="text-gray-500 text-lg">Select a user to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.profilePic}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{selectedUser.fullName}</h3>
              <p className="text-sm text-gray-500">{selectedUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={assets.gallery_icon}
              alt="Gallery"
              className="w-6 h-6 cursor-pointer hover:opacity-70"
              onClick={() => fileInputRef.current?.click()}
            />
            <img
              src={assets.help_icon}
              alt="Help"
              className="w-6 h-6 cursor-pointer hover:opacity-70"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => {
          const isSent = message.senderId === currentUser?._id;
          
          return (
            <div
              key={message._id}
              className={`flex mb-4 ${isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isSent ? 'order-2' : 'order-1'}`}>
                {!isSent && (
                  <img
                    src={selectedUser.profilePic}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover mb-1"
                  />
                )}
                <div
                  className={`rounded-lg p-3 ${
                    isSent
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared"
                      className="max-w-full rounded-lg mb-2"
                    />
                  )}
                  {message.text && <p className="break-words">{message.text}</p>}
                  <span
                    className={`text-xs mt-1 block ${
                      isSent ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.createdAt)}
                    {isSent && message.seen && (
                      <span className="ml-1">✓✓</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-300 bg-white">
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
          >
            <img src={assets.send_button} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;

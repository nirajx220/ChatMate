
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import assets, { userDummyData } from '../assets/assets.js';

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, onlineUsers, logout } = useSocket();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Initialize with dummy data
    setUsers(userDummyData);
    
    // Set first user as current user if not set
    if (!currentUser && userDummyData.length > 0) {
      setCurrentUser(userDummyData[0]);
    }
  }, [currentUser, setCurrentUser]);

  const filteredUsers = users.filter(user => 
    user._id !== currentUser?._id && 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUserId(user._id);
    // Emit event to parent or use context to update selected user
    window.dispatchEvent(new CustomEvent('user:selected', { detail: user }));
  };

  const getLastMessage = (userId) => {
    // This would typically come from your message store
    return '';
  };

  return (
    <div className="bg-[#f0f2f5] border-r border-gray-300 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={assets.logo_icon} alt="Logo" className="w-10 h-10" />
            <h2 className="text-xl font-semibold">ChatMate</h2>
          </div>
          <img 
            src={assets.menu_icon} 
            alt="Menu" 
            className="w-6 h-6 cursor-pointer hover:opacity-70" 
          />
        </div>
        
        {/* Search */}
        <div className="relative">
          <img 
            src={assets.search_icon} 
            alt="Search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" 
          />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUserId === user._id;
          
          return (
            <div
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
                isSelected ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {user.fullName}
                    </h3>
                    <span className="text-xs text-gray-500">12:00</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {getLastMessage(user._id) || 'Click to start chatting'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* Current User Profile */}
      {currentUser && (
        <div className="p-4 bg-white border-t border-gray-300">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.profilePic}
              alt={currentUser.fullName}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => navigate('/profile')}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate cursor-pointer" onClick={() => navigate('/profile')}>
                {currentUser.fullName}
              </h3>
              <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

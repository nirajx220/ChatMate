import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import assets, { imagesDummyData } from '../assets/assets.js';

const RightSidebar = () => {
  const { currentUser } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);

  React.useEffect(() => {
    const handleUserSelected = (event) => {
      setSelectedUser(event.detail);
    };

    window.addEventListener('user:selected', handleUserSelected);
    return () => window.removeEventListener('user:selected', handleUserSelected);
  }, []);

  const user = selectedUser || currentUser;

  if (!user) {
    return (
      <div className="hidden md:block bg-[#f0f2f5] border-l border-gray-300 p-6">
        <div className="text-center text-gray-500">
          <p>Select a user to view profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-[#f0f2f5] border-l border-gray-300 h-full overflow-y-auto">
      <div className="p-6">
        {/* User Profile */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="text-center">
            <img
              src={user.profilePic}
              alt={user.fullName}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.fullName}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <p className="text-gray-600">{user.bio || 'No bio available'}</p>
          </div>
        </div>

        {/* Media Shared */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Media, Links and Docs</h3>
          <div className="grid grid-cols-3 gap-2">
            {imagesDummyData.slice(0, 9).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Media ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Common Groups */}
        <div className="bg-white rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Groups</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                G
              </div>
              <div>
                <p className="font-medium text-gray-800">Group Chat</p>
                <p className="text-sm text-gray-500">5 members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700">
              Mute Notifications
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700">
              Disappearing Messages
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-red-600">
              Block User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

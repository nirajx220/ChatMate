import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <SocketProvider>
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
    </SocketProvider>
  )
}
export default App
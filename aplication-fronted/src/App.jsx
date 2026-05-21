import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'

export default function App(){
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/3 bg-gradient-to-b from-primary to-slate-700 p-8 text-white">
            <h1 className="text-2xl font-bold">Gestor Canchas</h1>
            <p className="mt-4 text-sm opacity-90">Panel de demostración - Frontend</p>
            <nav className="mt-8 space-y-2">
              <Link to="/" className="block py-2 px-3 rounded hover:bg-white/10">Login</Link>
              <Link to="/forgot-password" className="block py-2 px-3 rounded hover:bg-white/10">Forgot Password</Link>
              <Link to="/profile" className="block py-2 px-3 rounded hover:bg-white/10">Profile</Link>
              <Link to="/profile_update" className="block py-2 px-3 rounded hover:bg-white/10">Update Profile</Link>
            </nav>
          </div>
          <div className="w-2/3 p-8">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile_update" element={<UpdateProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

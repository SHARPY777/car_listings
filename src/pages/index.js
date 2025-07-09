'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaCarSide } from 'react-icons/fa';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1e1e1e] via-yellow-500 to-[#1e1e1e]">
      <div className="absolute top-0 left-0 p-6">

        <h1 className="text-white text-xl font-bold flex items-center gap-2">
          <FaCarSide className="text-3xl text-orange-400" />
          CarOneX
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-[400px] space-y-6"
      >
        <div className="text-white text-center text-xl font-semibold mb-4">LOGIN</div>

        <div className="relative">
          <FaUser className="absolute left-4 top-4.5 text-white opacity-80" />
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-4 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-4 top-4.5 text-white opacity-80" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-4 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-400 text-white py-4 rounded-full font-semibold hover:bg-orange-500 transition"
        >
          GET STARTED
        </button>
      </form>

    </div>
  );
}

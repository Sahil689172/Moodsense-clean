import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Mood Tracker' },
  { name: 'Journal' },
  { name: 'Chat' },
];

export default function Navbar() {
  const [active, setActive] = useState('Mood Tracker');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload(); // This will force the app to re-check auth and show the login page
  };

  // Navigation mapping
  const navRoutes = {
    'Mood Tracker': '/',
    'Journal': '/journal',
    'Chat': '/chatbot',
  };

  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md shadow-md rounded-b-2xl" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Home Button only on /chatbot */}
      {location.pathname === '/chatbot' && (
        <button
          onClick={() => navigate(-1)}
          className="mr-4 bg-gray-200 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-md font-semibold"
        >
          ← Home
        </button>
      )}
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-extrabold text-indigo-300">
        <span className="inline-block w-8 h-8 bg-gradient-to-tr from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-2xl">🧠</span>
        </span>
        MoodSense
      </div>
      {/* Nav Links */}
      <div className="flex-1 flex gap-12 items-center justify-center">
        {navLinks.map(link => (
          <button
            key={link.name}
            onClick={() => {
              setActive(link.name);
              if (navRoutes[link.name]) navigate(navRoutes[link.name]);
            }}
            className="relative px-2 py-1 text-lg font-semibold text-slate-200 hover:text-indigo-300 transition-colors focus:outline-none"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {link.name}
            {active === link.name && (
              <span className="absolute left-0 right-0 -bottom-1 mx-auto h-1 w-6 rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
      {/* Profile */}
      <div className="flex items-center gap-2">
        <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
          <span role="img" aria-label="profile">👤</span>
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-moodPurple px-4 py-2 rounded hover:bg-gray-200 transition font-semibold"
      >
        Logout
      </button>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatBot from './components/ChatBot';
import Journal from './components/Journal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { auth } from './firebase'; // adjust the path if needed
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Login />;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/journal" element={<Journal />} />
    </Routes>
  );
}

// This App component serves as the main entry point for the MoodSense application. It integrates the Header, MoodTracker, and ChatBot components to create a cohesive user interface. The layout is designed to be responsive and user-friendly, providing a seamless experience for users seeking mental wellness support.
// The application uses Tailwind CSS for styling, ensuring a modern and visually appealing design. The Header component provides branding and navigation, while the MoodTracker and ChatBot components offer interactive features for users to engage with the app. This structure promotes user engagement and enhances the overall mental wellness experience of the MoodSense application.
import React from 'react';
import AuthForm from './Authform';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black" style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}>
      {/* Banner Image */}
      <div className="w-full max-w-3xl mt-8 mb-4 flex justify-center">
        <div
          className="rounded-2xl w-full h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')`
          }}
        />
      </div>
      {/* Card */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center bg-black rounded-2xl shadow-lg p-8 pt-4">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome to MoodSense</h2>
        <AuthForm googleButtonTight={true} />
      </div>
    </div>
  );
}

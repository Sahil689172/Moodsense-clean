import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function AuthForm({ onAuth, googleButtonTight }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onAuth) onAuth();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (onAuth) onAuth();
    } catch (err) {
      setError(err.message);
    }
    setGoogleLoading(false);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="mb-4 text-xl font-bold text-center text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-black text-white placeholder-[#adadad] border-[#363636]"
            type="email"
            placeholder="Username or Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-black text-white placeholder-[#adadad] border-[#363636] pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye open SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
              ) : (
                // Eye closed SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M3 3l18 18M1 12s4-7 11-7c2.5 0 4.5.7 6.1 1.7M23 12s-4 7-11 7c-2.5 0-4.5-.7-6.1-1.7"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
              )}
            </button>
          </div>
        </div>
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2"
          type="submit"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={handleGoogle}
          className={`${googleButtonTight ? 'mt-1' : 'mt-3'} bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center gap-2`}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <span className="animate-spin mr-2">🔄</span>
          ) : (
            <span style={{ fontSize: '1.2em' }}>🌐</span>
          )}
          {googleLoading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        <div className="mt-2 text-center text-white">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-400 underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function HomePage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // This will show the Login page due to your App.js logic
  };
  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans overflow-x-hidden" style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}>
      <div className="flex h-full grow flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between border-b border-[#363636] px-10 py-3 bg-black">
          <div className="flex items-center gap-4 text-white">
            <div className="w-5 h-5">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">MoodSense</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <button className="text-white text-base font-medium leading-normal bg-transparent hover:underline" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        {/* Hero Section */}
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5 bg-black">
          <div className="flex flex-col max-w-[960px] w-full">
            <div className="flex flex-col gap-6 md:gap-8 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 min-h-[320px] md:min-h-[480px] bg-black"
              style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 100%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuBrV3SxGGwF4-wwphtkpzOJNR-_igVngF9Okm2T2GJytsdK_natIYjSB3CpcZKp0R8IoVc91JRJ0EAHMVElE5JZbX_K_QwBCk8LDWNgzJmPsCyFZzlC4KxK1iMMvhvDxer9rMmJpNJ8-_rMhT7IfIhLifgQxdy7PwGRXVcGc8SifI2d3jAQ36f-sBTafIVDU2OEDfnXJJmK6yfs90EK84HtUi6jqlHfqwRIvIgpf9_r6IA02duf-_inBpn61ATUc6oBq0566UBqKqdx)', minHeight: '420px', height: '38vw', maxHeight: '600px' }}>
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Your AI Psychologist</h1>
                <h2 className="text-white text-lg md:text-xl font-normal leading-normal">MoodSense is your personal AI psychologist, providing insights into your emotional well-being and offering support whenever you need it.</h2>
              </div>
            </div>
            {/* Features Section */}
            <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-12 justify-center items-center py-12">
              {/* Journal Entry Card */}
              <div
                className="bg-transparent border border-white rounded-xl p-8 flex-1 min-w-0 max-w-full flex flex-col items-start text-left cursor-pointer transition hover:bg-white/10"
                onClick={() => navigate('/journal')}
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/journal'); }}
              >
                <div className="mb-4">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="2"/><path d="M7 8h10M7 12h6" stroke="white" strokeWidth="2" strokeLinecap="round"/><rect x="4" y="2" width="2" height="4" rx="1" fill="white"/></svg>
                </div>
                <div>
                  <span className="font-bold text-xl text-white">Journal Entry</span>
                  <p className="text-white text-lg font-normal mt-2">Reflect on your thoughts and feelings with a private journal.</p>
                </div>
              </div>
              {/* Chatbot Card */}
              <div
                className="bg-transparent border border-white rounded-xl p-8 flex-1 min-w-0 max-w-full flex flex-col items-start text-left cursor-pointer transition hover:bg-white/10"
                onClick={() => navigate('/chatbot')}
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/chatbot'); }}
              >
                <div className="mb-4">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="2"/><circle cx="8" cy="12" r="1.5" fill="white"/><circle cx="12" cy="12" r="1.5" fill="white"/><circle cx="16" cy="12" r="1.5" fill="white"/></svg>
                </div>
                <div>
                  <span className="font-bold text-xl text-white">Chatbot</span>
                  <p className="text-white text-lg font-normal mt-2">Engage in supportive conversations with our AI chatbot.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Footer */}
        <footer className="flex justify-center mt-8 bg-black">
          <div className="flex max-w-[960px] w-full flex-col">
            <div className="flex flex-wrap items-center justify-center gap-6 px-5 py-10">
              <a className="text-[#adadad] text-base font-normal min-w-40" href="#">Privacy Policy</a>
              <a className="text-[#adadad] text-base font-normal min-w-40" href="#">Terms of Service</a>
              <a className="text-[#adadad] text-base font-normal min-w-40" href="#">Contact Us</a>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><div className="text-[#adadad]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" /></svg></div></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><div className="text-[#adadad]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" /></svg></div></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><div className="text-[#adadad]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" /></svg></div></a>
            </div>
            <p className="text-[#adadad] text-base font-normal text-center mt-4">© 2024 MoodSense. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
} 
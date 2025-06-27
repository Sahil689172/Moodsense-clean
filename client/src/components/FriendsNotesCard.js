import React from 'react';

const friendsNotes = [
  { name: 'Alex', note: 'Stay positive! 😊', avatar: '🧑‍🦱' },
  { name: 'Sam', note: 'You got this! 💪', avatar: '🧑‍🎤' },
  { name: 'Jamie', note: 'Breathe and smile 🌱', avatar: '🧑‍🦰' },
  { name: 'Taylor', note: 'Sending good vibes ✨', avatar: '🧑‍🦳' },
];

export default function FriendsNotesCard() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-6 w-full md:w-80 min-w-[260px] max-w-xs flex flex-col items-center animate-fadeIn">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Friends & Notes
        </h3>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow transition">
          + Add Friend
        </button>
      </div>
      <div className="w-full overflow-x-auto flex gap-4 pb-2">
        {friendsNotes.map((f, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white/80 dark:bg-gray-800/80 rounded-xl px-3 py-2 min-w-[110px] shadow hover:scale-105 transition-transform">
            <div className="text-3xl mb-1">{f.avatar}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-1">{f.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">{f.note}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-full text-center text-xs text-gray-400 dark:text-gray-500">
        Add friends to share and receive uplifting notes!
      </div>
    </section>
  );
} 
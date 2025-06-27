import { useState } from 'react';
import '../animations.css';
import { auth } from '../firebase';

export default function MoodTracker({ className = "" }) {
  const [mood, setMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const moods = [
    { name: 'Happy', emoji: '😊', color: '#FFB347', catchphrase: ",You're glowing — joy suits you!" },
    { name: 'Sad', emoji: '😔', color: '#88B7B5', catchphrase: "It's okay to feel low — I'm here with you." },
    { name: 'Anxious', emoji: '😨', color: '#FF6B6B', catchphrase: "Deep breaths — you've got this." },
    { name: 'Calm', emoji: '😌', color: '#6B5B95', catchphrase: "Peace looks good on you." },
    { name: 'Excited', emoji: '🤩', color: '#FFD700', catchphrase: "The spark's real — ride the wave!" }
  ];

  const handleMoodSelect = async (selectedMood) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in!');
        setIsLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const response = await fetch('https://moodsense-backend.onrender.com/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mood: selectedMood.name,
          note: selectedMood.catchphrase // or let user enter a note
        })
      });
      if (response.ok) {
        setMood(selectedMood);
      } else {
        const data = await response.json();
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <section className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-2 animate-fadeIn transition-colors duration-300 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        How are you feeling today?
      </h2>
      
      {isLoading ? (
        <div className="mood-loading w-40 h-40 rounded-full mx-auto my-8"></div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {moods.map((m) => (
            <button
              key={m.name}
              onClick={() => handleMoodSelect(m)}
              className={`group px-8 py-4 text-lg rounded-full font-medium transition-colors duration-300 flex flex-col items-center gap-3 ${
                mood?.name === m.name
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-indigo-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-indigo-600 dark:hover:text-white'
              }`}
              style={{ borderColor: m.color }}
            >
              <span className="mood-icon text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                {m.emoji}
              </span>
              {m.name}
            </button>
          ))}
        </div>
      )}

      {mood && (
        <div className="mood-result mt-5 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="mood-icon ml-2 text-2xl">{mood.emoji}</span>
            <span className="font-semibold text-lg">{mood.name}</span>
          </div>
          <p className="text-indigo-600 dark:text-indigo-300 text-center text-xl font-medium italic">{mood.catchphrase}</p>
        </div>
      )}
    </section>
  );
}

// This component allows users to select their mood from a predefined list. It uses React's state management to track the selected mood and applies conditional styling based on the user's selection. The component is designed to be visually appealing and user-friendly, enhancing the overall user experience of the MoodSense application.
// The mood tracker is styled with Tailwind CSS, ensuring a modern and responsive design. It includes a section header, a list of mood options presented as buttons, and feedback on the selected mood. This component serves as an interactive element in the MoodSense application, promoting user engagement and self-reflection on mental wellness.
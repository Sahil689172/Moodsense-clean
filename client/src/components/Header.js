export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 text-center shadow-md animate-fadeIn">
      <h1
        className="text-6xl md:text-7xl font-extrabold tracking-tight font-['Poppins','Montserrat','Inter','sans-serif'] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3"
        style={{ fontFamily: 'Poppins, Montserrat, Inter, sans-serif' }}
      >
        MoodSense
      </h1>
      <p className="text-slate-500 dark:text-blue-300 text-2xl mt-2 font-semibold font-['Poppins','Montserrat','Inter','sans-serif']">
        Your mental health companion
      </p>
    </header>
  );
}

// This Header component is part of the MoodSense application, designed to provide a clear and engaging introduction to the app. It features a prominent title and a subtitle that encapsulates the app's purpose as a mental health companion. The use of Tailwind CSS classes ensures that the header is visually appealing and responsive, adapting well to different screen sizes.
// This component serves as the header for the MoodSense application, providing a consistent branding and navigation point across the app. It uses Tailwind CSS for styling, ensuring a modern and responsive design. The header includes the app's name and a brief tagline, enhancing user engagement and clarity of purpose.
// The header is styled with a background color, text color, padding, and shadow to create a visually appealing and functional top section of the application. It is designed to be easily recognizable and accessible, contributing to a positive user experience.
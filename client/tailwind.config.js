/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#18181B',
        darkSurface: '#232323',
        blackBtn: '#111',
        grayBtn: '#333',
        borderGray: '#888',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


// This Tailwind CSS configuration file extends the default theme with custom colors and font families.
// It specifies the content paths to scan for class names, ensuring that Tailwind generates the necessary styles. The custom colors `moodPurple`, `moodBlue`, `moodAccent`, `darkBg`, and `darkSurface` can be used throughout the application to maintain a consistent branding theme. The font family is set to "Inter", providing a modern and clean typography style for the MoodSense application.
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use 'class' strategy for dark mode toggling
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {     // Tailwind blue-500
        darkBg: '#000000',      // Gray-800 for dark background
        lightBg: '#f9fafb',     // Gray-50 for light background
      },
    },
  },
  plugins: [],
}

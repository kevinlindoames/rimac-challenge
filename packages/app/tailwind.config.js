export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../shared/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#00ADEF',
        secondary: '#1E2A3E',
      },
    },
  },
  plugins: [],
};
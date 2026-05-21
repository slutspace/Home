/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          blue: '#0095f6',
          purple: '#833ab4',
          pink: '#c13584',
          orange: '#e1306c',
          yellow: '#f77737',
        },
        'youtube-red': '#FF0000',
        'youtube-black': '#0F0F0F',
        'youtube-dark': '#0F0F0F',
        'youtube-light': '#272727',
        'youtube-lightest': '#383838',
        'gray-650': '#374151',
        'gray-750': '#1f2937',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.touch-action-manipulation': {
          'touch-action': 'manipulation',
        },
        '.ios-tap-highlight-transparent': {
          '-webkit-tap-highlight-color': 'transparent',
        },
      })
    },
  ],
} 
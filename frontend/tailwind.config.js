/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Drumond
        drumond: {
          dark: '#1a3a5c',      // Azul escuro principal
          medium: '#2d5a7b',    // Azul médio
          light: '#4a9ecc',     // Azul claro/ciano
          lighter: '#6bb8dc',   // Azul mais claro
          accent: '#48b5a0',    // Verde/teal do coração
        },
        primary: {
          50: '#e8f4fa',
          100: '#d1e9f5',
          200: '#a3d3eb',
          300: '#6bb8dc',
          400: '#4a9ecc',
          500: '#2d5a7b',
          600: '#1a3a5c',
          700: '#152e4a',
          800: '#102238',
          900: '#0b1726',
        },
        success: {
          500: '#48b5a0',
          600: '#3a9485',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}

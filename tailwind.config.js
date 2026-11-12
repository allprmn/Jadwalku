/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        surface: '#0a0a0a',
        'surface-2': '#141414',
        border: '#262626',
        'border-2': '#3f3f46',
        text: '#ffffff',
        muted: '#a1a1aa',
        dim: '#52525b',
        danger: '#ef4444',
        success: '#22c55e',
      }
    },
  },
  plugins: [],
}


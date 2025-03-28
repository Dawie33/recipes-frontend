import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
        // Ajoutez d'autres familles de polices si nécessaire
      },
      keyframes: {
        scrollRight: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        scrollRight: 'scrollRight 15s linear infinite',
        scrollLeft: 'scrollLeft 15s linear infinite',
      },
    },
  },
  plugins: [],
}

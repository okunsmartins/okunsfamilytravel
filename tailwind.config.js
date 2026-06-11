/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96D',
          dark: '#A07830',
          pale: '#F5E6C0',
        },
        onyx: {
          DEFAULT: '#0D0D0D',
          50: '#1A1A1A',
          100: '#141414',
          200: '#111111',
        },
        charcoal: {
          DEFAULT: '#1E1E1E',
          light: '#2A2A2A',
          mid: '#242424',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
        accent: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96D 50%, #A07830 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #1a0a00 0%, #2d1200 30%, #0D0D0D 70%)',
        'card-gradient': 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.95) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 60px rgba(201, 168, 76, 0.4)',
        'cinematic': '0 25px 60px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
}

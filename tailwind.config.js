/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1A1A1A',
        surface: '#222222',
        surfaceHover: '#2A2A2A',
        appBg: '#8A8D83', // Outer edge color
        neon: '#D4F64D',  // Exact match from image
        textPrimary: '#ffffff',
        textSecondary: '#A1A1AA',
        borderLight: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(212,246,77,0.15), transparent 60%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}

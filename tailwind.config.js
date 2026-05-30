/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        ink: {
          950: '#0a0b10',
          900: '#0e1018',
          850: '#121521',
          800: '#171a26',
          750: '#1c2030',
          700: '#252a3d',
        },
        slateText: {
          DEFAULT: '#e7e8ee',
          dim: '#a3a8b8',
          mute: '#6f7588',
        },
        accent: {
          violet: '#a78bfa',
          cyan: '#67e8f9',
          amber: '#fcd34d',
          pink: '#f472b6',
        },
      },
      boxShadow: {
        soft: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 30px rgba(0,0,0,0.35)',
      },
      keyframes: {
        spinBlink: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        spinBlink: 'spinBlink 1.2s ease-in-out infinite',
        fadeIn: 'fadeIn 240ms ease-out',
      },
    },
  },
  plugins: [],
}

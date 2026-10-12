/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { 950: '#030c33', 900: '#06144d', 800: '#0a1f73', 700: '#0d2a9c' },
        royal: { 600: '#1440d6', 500: '#1f55ff', 400: '#4d7bff' },
        gold: { 300: '#ffe27a', 400: '#ffd23f', 500: '#f5b800', 600: '#d99a00', 700: '#a87400' },
        paper: '#f3f5fb',
        sky: { 100: '#e6ecff', 200: '#cdd9ff' },
        // Rangi za mandhari (zinabadilika light/dark kupitia CSS variables)
        ink: 'rgb(var(--ink) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Unbounded Variable"', 'Unbounded', 'system-ui', 'sans-serif'],
        script: ['"Unbounded Variable"', 'Unbounded', 'system-ui', 'sans-serif'],
        sans: ['"Figtree Variable"', 'Figtree', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: { '0%': { transform: 'scale(1.05) translate(0,0)' }, '100%': { transform: 'scale(1.18) translate(-2%,-2%)' } },
        shine: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        floaty: { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-14px) rotate(var(--r,0deg))' } },
        spinslow: { to: { transform: 'rotate(360deg)' } },
        sweep: { '0%': { transform: 'translateX(-100%)' }, '60%,100%': { transform: 'translateX(100%)' } },
        marqueeRev: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-rev': 'marqueeRev 60s linear infinite',
        kenburns: 'kenburns 22s ease-in-out infinite alternate',
        shine: 'shine 4s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        spinslow: 'spinslow 40s linear infinite',
      },
    },
  },
  plugins: [],
}

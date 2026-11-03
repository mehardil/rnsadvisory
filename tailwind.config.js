/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1A3A',
        deepblue: '#12306B',
        royal: '#1F4FD8',
        gold: '#C9A24B',
        softgold: '#E8D6A0',
        ivory: '#F7F5EF',
        slate: '#5B6B86',
        success: '#1E9E6A',
        error: '#D64545',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        headline: '-0.03em',
        label: '0.18em',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 4px rgba(10,26,58,0.04), 0 18px 40px -18px rgba(10,26,58,0.18)',
        lift: '0 4px 10px rgba(10,26,58,0.06), 0 30px 60px -24px rgba(10,26,58,0.28)',
        glow: '0 0 0 1px rgba(201,162,75,0.35), 0 18px 60px -20px rgba(201,162,75,0.35)',
      },
      maxWidth: { shell: '1440px' },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 9s ease-in-out infinite',
        'spin-slow': 'spin 38s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

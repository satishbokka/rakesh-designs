import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#0D0D0D',
        'dark-surface': '#181818',
        'dark-card': '#1F1F1F',
        'dark-border': '#2E2E2E',
        'dark-light': '#262626',
        'warm-orange': '#F28C28',
        'orange-light': '#FFAA54',
        'orange-dark': '#D67414',
        'light-bg': '#F7F5F2',
        'offwhite-muted': '#A39F97',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'premium-hover': '0 30px 60px -15px rgba(242, 140, 40, 0.25)',
        'orange-glow': '0 10px 30px -5px rgba(242, 140, 40, 0.45)',
        'dark-glow': '0 10px 30px -5px rgba(13, 13, 13, 0.7)',
      },
    },
  },
  plugins: [],
};

export default config;

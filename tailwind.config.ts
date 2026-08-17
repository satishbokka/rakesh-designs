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
        'indigo-navy': '#1B1F3B',
        'navy-dark': '#13162B',
        'navy-card': '#24294C',
        'navy-border': '#373E6D',
        'navy-light': '#2D345F',
        'warm-coral': '#FF6B4A',
        'coral-light': '#FF856B',
        'coral-dark': '#D84C2C',
        'soft-cream': '#F7F3EC',
        'cream-muted': '#D8D4CC',
        'charcoal-dark': '#0E101D',
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
        'premium': '0 20px 40px -15px rgba(19, 22, 43, 0.5)',
        'premium-hover': '0 30px 60px -15px rgba(255, 107, 74, 0.2)',
        'coral-glow': '0 10px 30px -5px rgba(255, 107, 74, 0.35)',
        'navy-glow': '0 10px 30px -5px rgba(27, 31, 59, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;

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
        'charcoal-navy': '#12151C',
        'navy-surface': '#1A1E29',
        'navy-card': '#1E2330',
        'navy-border': '#2E3547',
        'navy-light': '#252C3D',
        'vivid-teal': '#2FE6C9',
        'teal-light': '#5BF3DB',
        'teal-dark': '#1EC2A8',
        'warm-offwhite': '#F1EEE7',
        'offwhite-muted': '#C7C3BB',
        'dark-bg': '#0D0F14',
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
        'premium': '0 20px 40px -15px rgba(13, 15, 20, 0.6)',
        'premium-hover': '0 30px 60px -15px rgba(47, 230, 201, 0.25)',
        'teal-glow': '0 10px 30px -5px rgba(47, 230, 201, 0.4)',
        'navy-glow': '0 10px 30px -5px rgba(18, 21, 28, 0.6)',
      },
    },
  },
  plugins: [],
};

export default config;

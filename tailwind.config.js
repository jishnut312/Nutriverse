/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#E23744',
          50: '#FDF2F3',
          100: '#FCE7E8',
          200: '#F9D2D5',
          300: '#F4A8AE',
          400: '#ED7481',
          500: '#E23744',
          600: '#D01B2A',
          700: '#B01621',
          800: '#92141F',
          900: '#7A1520',
        },
        secondary: {
          DEFAULT: '#FF6B35',
          50: '#FFF4F0',
          100: '#FFE6DB',
          200: '#FFCDB7',
          300: '#FFA888',
          400: '#FF7A51',
          500: '#FF6B35',
          600: '#F04A1A',
          700: '#C73A14',
          800: '#A03018',
          900: '#832B19',
        },
        accent: {
          DEFAULT: '#0A84FF',
          50: '#F0F8FF',
          100: '#E0F0FF',
          200: '#B8E0FF',
          300: '#7AC7FF',
          400: '#33ABFF',
          500: '#0A84FF',
          600: '#0066CC',
          700: '#0052A3',
          800: '#004785',
          900: '#003D6E',
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        }
      }
    },
  },
  plugins: [],
}

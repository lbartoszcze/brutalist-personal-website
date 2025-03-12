/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mindaro: {
          DEFAULT: '#cff27e',
          100: '#314307',
          200: '#62860d',
          300: '#92c814',
          400: '#b6ec3a',
          500: '#cff27e',
          600: '#d9f597',
          700: '#e2f7b1',
          800: '#ecfacb',
          900: '#f5fce5'
        },
        arylide: {
          DEFAULT: '#f2dd6e',
          100: '#413706',
          200: '#816e0b',
          300: '#c2a511',
          400: '#edcd2d',
          500: '#f2dd6e',
          600: '#f5e38b',
          700: '#f7eaa8',
          800: '#faf1c5',
          900: '#fcf8e2'
        },
        hunyadi: {
          DEFAULT: '#e5b25d',
          100: '#372609',
          200: '#6f4b12',
          300: '#a6711b',
          400: '#dc9625',
          500: '#e5b25d',
          600: '#eac07d',
          700: '#efd09e',
          800: '#f4e0be',
          900: '#faefdf'
        },
        copper: {
          DEFAULT: '#b87d4b',
          100: '#25190f',
          200: '#4a331e',
          300: '#704c2c',
          400: '#95653b',
          500: '#b87d4b',
          600: '#c69870',
          700: '#d4b294',
          800: '#e3ccb8',
          900: '#f1e5db'
        },
        vandyke: {
          DEFAULT: '#523a34',
          100: '#100c0a',
          200: '#201715',
          300: '#31231f',
          400: '#412e29',
          500: '#523a34',
          600: '#7f5a51',
          700: '#a77f75',
          800: '#c4aaa3',
          900: '#e2d4d1'
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-slow': 'reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 25s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blink-fast': 'blink 0.8s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #b87d4b 0%, #e5b25d 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #cff27e 0%, #f2dd6e 100%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--color-text-primary)',
            a: {
              color: 'var(--color-copper)',
              '&:hover': {
                color: 'var(--color-hunyadi-yellow)',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'var(--color-van-dyke)',
              fontFamily: 'var(--font-heading)',
            },
            strong: {
              color: 'var(--color-van-dyke)',
            },
            blockquote: {
              borderLeftColor: 'var(--color-arylide-yellow)',
              backgroundColor: 'rgba(242, 221, 110, 0.1)',
              color: 'var(--color-van-dyke)',
              fontStyle: 'normal',
              padding: theme('spacing.6'),
              borderRadius: theme('borderRadius.lg'),
            },
            code: {
              color: 'var(--color-copper)',
              backgroundColor: 'rgba(229, 178, 93, 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontFamily: 'var(--font-mono)',
            },
          },
        },
      }),
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
} 
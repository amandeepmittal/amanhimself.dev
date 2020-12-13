module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    typography: theme => ({
      default: {
        css: {
          a: {
            'word-break': 'break-word',
            textDecoration: 'none',
            color: theme('colors.purple.500'),
            '&:hover': {
              color: theme('colors.purple.600')
            },
            '&:visited': {
              color: theme('colors.purple.800')
            }
          }
        }
      }
    }),
    extend: {
      fontFamily: {
        'open-sans': 'Open Sans, sans-serif'
      },
      colors: {
        prose: '#374151',
        twitter: {
          100: '#E8F6FE',
          200: '#C7E8FC',
          300: '#A5D9FA',
          400: '#61BDF6',
          500: '#1DA1F2',
          600: '#1A91DA',
          700: '#116191',
          800: '#0D486D',
          900: '#093049'
        },
        rss: {
          100: '#FEF4ED',
          200: '#FEE3D1',
          300: '#FDD2B6',
          400: '#FBB17F',
          500: '#F98F48',
          600: '#E08141',
          700: '#95562B',
          800: '#704020',
          900: '#4B2B16'
        },
        coffee: {
          100: '#F9E8ED',
          200: '#F0C6D2',
          300: '#E7A4B7',
          400: '#D56080',
          500: '#C31C4A',
          600: '#B01943',
          700: '#75112C',
          800: '#580D21',
          900: '#3B0816'
        },
        github: {
          100: '#E9EAEA',
          200: '#C9CACB',
          300: '#A8AAAB',
          400: '#666A6D',
          500: '#252A2E',
          600: '#212629',
          700: '#16191C',
          800: '#111315',
          900: '#0B0D0E'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

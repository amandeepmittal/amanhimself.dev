module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
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
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

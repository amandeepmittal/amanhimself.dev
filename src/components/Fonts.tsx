import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    @font-face {
      font-family: 'Cal Sans';
      src: url('/fonts/CalSans-SemiBold.ttf');
      src: url('/fonts/CalSans-SemiBold.woff');
      src: url('/fonts/CalSans-SemiBold.woff2');
      font-style: oblique;
      font-weight: 600;
      font-display: swap;
    }
  `}
  />
);
export default Fonts;

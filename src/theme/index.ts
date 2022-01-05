import { extendTheme, theme as base, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('#f3f3f3', '#202023')(props)
    }
  })
};

const colors = {
  twitter: '#1EA1F1'
};

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  }
};

const fonts = {
  heading: `Cal Sans, ${base.fonts.heading}`,
  body: `Inter, ${base.fonts.body}`
};

const theme = extendTheme({ config, styles, components, fonts, colors });

export default theme;

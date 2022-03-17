import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../src/theme';
import { Fonts, MainLayout } from '../src/components';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
};

export default App;

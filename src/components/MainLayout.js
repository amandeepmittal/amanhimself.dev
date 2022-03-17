import { Box, Container, VStack } from '@chakra-ui/react';

import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Navbar />
      <Container
        maxW="container.md"
        minH={{ base: 'auto', md: '100vh' }}
        px={{ base: 4, lg: 0 }}
      >
        <VStack spacing={16} flex={1} w="full" as="main" mb={16}>
          {children}
        </VStack>
        <Footer />
      </Container>
    </Box>
  );
};

export default MainLayout;

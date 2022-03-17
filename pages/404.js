import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react';

import { DocumentHead } from '../src/components';

const NotFound = () => {
  return (
    <>
      <DocumentHead pageTitle="404 - Page Not Found - Aman Mittal" />
      <Box pt={20}>
        <Container>
          <Heading as="h1">Not found</Heading>
          <Text>The page you&apos;re looking for was not found.</Text>
          <Divider my={6} />
          <Box my={6} align="center">
            <NextLink href="/">
              <Button bg="#9788a7" color="#fff">
                Return to home
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;

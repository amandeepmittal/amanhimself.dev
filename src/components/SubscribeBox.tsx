import {
  Text, VStack, Button, Heading, Link, Stack
} from '@chakra-ui/react';

const SubscribeBox = () => {
  return (
    <>
      <VStack alignItems="stetch"  as="section" pt={2}>
          <Heading size="xl">Enjoyed this post? Sign up to my newsletter!
            
</Heading>
<Text lineHeight="175%" as="h2" fontSize="lg">
A periodic update about my recent blog posts and tutorials. <strong>Join 1300+ devs!</strong>
</Text>
<Text lineHeight="175%" as="h2" fontSize="lg">
No spam, unsubscribe at any time!
</Text>
<Stack spacing={3}>
  <Button
                
                as={Link}
                variant='outline'
                color='purple.500'
                href='https://www.getrevue.co/profile/amanhimself'
                target="_blank"
                px={2}
                justifyContent={{ base: 'flex-start', md: 'center' }}
                fontSize='xl'
              >
                Subscribe on Revue
              </Button>
</Stack>
        </VStack>
    </>
  )
}

export default SubscribeBox;
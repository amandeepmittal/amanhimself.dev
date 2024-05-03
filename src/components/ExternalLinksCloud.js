import { HStack, Text } from '@chakra-ui/react';

import ExternalLink from './ExternalLink';

const ExternalLinksCloud = () => {
  return (
    <HStack>
      <Text fontWeight="semibold">Social links:</Text>
      <Text>
        <ExternalLink href="https://x.com/amanhimself">🐦 X</ExternalLink>
      </Text>
      <Text>
        <ExternalLink href="https://github.com/amandeepmittal">
          🐙 GitHub
        </ExternalLink>
      </Text>
      <Text>
        <ExternalLink href="mailto:amanmittal.work@gmail.com">
          ✉️ Email
        </ExternalLink>
      </Text>
    </HStack>
  );
};

export default ExternalLinksCloud;

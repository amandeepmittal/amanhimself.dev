import { HStack, Text } from '@chakra-ui/react';

import ExternalLink from './ExternalLink';

const ExternalLinksCloud = () => {
  return (
    <HStack>
      <Text>
        <ExternalLink href="https://amanhimself.dev/about">
          🤙 More about me
        </ExternalLink>
      </Text>
      <Text>
        <ExternalLink href="https://www.getrevue.co/profile/amanhimself">
          📧 Newsletter
        </ExternalLink>
      </Text>
      <Text>
        <ExternalLink href="https://twitter.com/amanhimself">
          🐦 Twitter
        </ExternalLink>
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

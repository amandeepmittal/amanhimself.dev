import {
  VStack,
  Stack,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { SiExpo, SiGithub } from 'react-icons/si';

import ExternalLink from './ExternalLink';

const ProjectInfoCard = ({
  id,
  title,
  description,
  href,
  expoIcon,
  githubIcon
}) => {
  const bgColorStack = useColorModeValue('gray.200', 'purple.700');
  const iconColor = useColorModeValue('gray.700', 'white');
  return (
    <LinkBox as="article">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={6}
        spacing={{ base: 8, md: 5 }}
        bg={bgColorStack}
        rounded="md"
        alignItems="center"
        transitionProperty="transform"
        transitionDuration="slow"
        transitionTimingFunction="ease-out"
        _hover={{ transform: 'scale(1.025, 1.025)' }}
      >
        {expoIcon && (
          <Icon as={SiExpo} w={8} h={8} color={iconColor} display="inline" />
        )}
        {githubIcon && (
          <Icon as={SiGithub} w={8} h={8} color={iconColor} display="inline" />
        )}
        <VStack spacing={3}>
          <VStack w="full" spacing={1}>
            <Stack
              w="full"
              direction={{ base: 'column', md: 'row' }}
              justifyContent={{ base: 'flex-start', md: 'space-between' }}
              alignItems={{ base: 'flex-start', md: 'center' }}
            >
              <Heading size="md" weight="semibold">
                {title}
              </Heading>
              <LinkOverlay as={ExternalLink} href={href} />
            </Stack>
          </VStack>
          <Text fontSize="sm">{description}</Text>
        </VStack>
      </Stack>
    </LinkBox>
  );
};

export default ProjectInfoCard;

import { Box } from '@chakra-ui/react';

import TagsSummary from '../TagSummary';

const Tag = ({ tag }) => {
  if (tag === 'expo') {
    return (
      <Box bg="#000" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'nodejs') {
    return (
      <Box bg="#4cae4c" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'react-native') {
    return (
      <Box bg="#4E91DF" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'react') {
    return (
      <Box bg="#61dafb" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'nextjs') {
    return (
      <Box bg="#333" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'gatsby') {
    return (
      <Box bg="#a456f0" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'firebase') {
    return (
      <Box bg="#ff6900" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'git') {
    return (
      <Box bg="#ee4e3a" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'ionic') {
    return (
      <Box bg="#2aabee" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'writing') {
    return (
      <Box bg="#526D82" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'devrel') {
    return (
      <Box bg="orange" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'year-review') {
    return (
      <Box bg="#B590CA" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'tools') {
    return (
      <Box bg="#B799FF" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'xcode') {
    return (
      <Box bg="#4D77FF" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'vscode') {
    return (
      <Box bg="#000D6B" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'typescript') {
    return (
      <Box bg="#408ef5" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  } else if (tag === 'obsidian') {
    return (
      <Box bg="#8158FC" p={1} borderRadius={4}>
        <TagsSummary tag={tag} />
      </Box>
    );
  }

  return (
    <Box bg="purple.500" p={1} borderRadius={4}>
      <TagsSummary tag={tag} />
    </Box>
  );
};

export default Tag;

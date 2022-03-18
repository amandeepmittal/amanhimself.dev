import { HStack, Box, Text } from '@chakra-ui/react';

import TAGS_ARRAY from '../../data/tagsArray';
import TagsSummary from '../TagSummary';

const TagsCloud = () => {
  return (
    <HStack spacing={3} pt={4} flexWrap="wrap">
      <Text fontSize="lg" fontWeight="700">
        Common tags:
      </Text>
      {TAGS_ARRAY.map(tag => (
        <HStack key={tag} flexDirection="row" py={2}>
          <Box bg={tag.color} p={1} borderRadius={4}>
            <TagsSummary tag={tag.name} />
          </Box>
        </HStack>
      ))}
    </HStack>
  );
};

export default TagsCloud;

import React from 'react';
import { Flex } from '@chakra-ui/react';

import Tag from './Tag';

const TagsSummary = ({ tag }) => {
  return (
    <Flex fontSize="smaller" direction="row" flexWrap="wrap">
      <Tag key={`tag-${tag}`} url={`/tags/${tag}`}>
        {tag}
      </Tag>
    </Flex>
  );
};

export default TagsSummary;

import React from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/core';
import styled from '@emotion/styled';

const UnderlinedLink = styled(Link)`
  text-decoration: none;
  border-bottom: #9f7aea 0.1em solid;
  &:hover {
    text-decoration: none;
    border-bottom: 0;
  }
`;

const CustomLink = props => {
  const color = 'purple.400';

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <UnderlinedLink color={color} {...props} />
      </NextLink>
    );
  }

  return <UnderlinedLink color={color} isExternal {...props} />;
};

export default CustomLink;

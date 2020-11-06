import {
  Box,
  Callout,
  Code,
  Heading,
  Kbd,
  PseudoBox,
  Text,
  Divider
} from '@chakra-ui/core';

import CustomLink from './CustomLink';

const Table = props => (
  <Box overflowX="scroll" w="full">
    <Box as="table" textAlign="left" mt="32px" w="full" {...props} />
  </Box>
);

const THead = props => {
  const bg = 'gray.50';

  return (
    <Box as="th" bg={bg} fontWeight="semibold" p={2} fontSize="sm" {...props} />
  );
};

const TData = props => (
  <Box
    as="td"
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const Quote = props => {
  const bgColor = 'blue.50';

  return (
    <Callout
      mt={4}
      w="98%"
      bg={bgColor}
      variant="left-accent"
      status="info"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8
        }
      }}
      {...props}
    />
  );
};

const DocsHeading = props => (
  <Heading
    css={{
      scrollMarginTop: '100px',
      scrollSnapMargin: '100px', // Safari
      '&[id]': {
        pointerEvents: 'none'
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`
      },
      '&[id]:hover a': { opacity: 1 }
    }}
    {...props}
    mb="1em"
    mt="1em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <PseudoBox
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: 'outline'
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </PseudoBox>
      )}
    </Box>
  </Heading>
);

const Hr = () => {
  const borderColor = 'gray.200';

  return <Divider borderColor={borderColor} my={4} w="100%" />;
};

const MDXComponents = {
  h1: props => <Heading as="h1" size="xl" my={2} {...props} />,
  h2: props => <DocsHeading as="h2" fontWeight="bold" size="lg" {...props} />,
  h3: props => <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />,
  inlineCode: props => (
    <Code variantColor="purple" fontSize="0.84em" {...props} my={0.5} />
  ),
  kbd: Kbd,
  br: props => <Box height="24px" {...props} />,
  hr: Hr,
  table: Table,
  th: THead,
  td: TData,
  a: CustomLink,
  p: props => <Text as="p" mt={0.75} lineHeight="tall" {...props} />,
  ul: props => <Box as="ul" pt={1} pl={4} ml={2} {...props} />,
  ol: props => <Box as="ol" pt={1} pl={4} ml={2} {...props} />,
  li: props => <Box as="li" pb={1} {...props} />,
  blockquote: Quote
};

export default MDXComponents;

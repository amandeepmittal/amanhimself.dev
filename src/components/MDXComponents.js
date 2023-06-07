import {
  Alert,
  Box,
  chakra,
  Link,
  Kbd,
  useColorModeValue,
  useColorMode,
  HStack,
  useClipboard
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import NextImage from 'next/image';
import slugify from 'slugify';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import { DiJsBadge } from 'react-icons/di';
import { IoTerminal } from 'react-icons/io5';
import { FaGitAlt } from 'react-icons/fa';
import {
  SiReact,
  SiHtml5,
  SiCsswizardry,
  SiPrisma,
  SiTypescript,
  SiGraphql
} from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';

const ChakraHighlight = chakra(Highlight, {
  shouldForwardProp: prop =>
    ['Prism', 'theme', 'code', 'language', 'children'].includes(prop)
});

const Pre = props => <chakra.div my="2em" borderRadius="sm" {...props} />;

const Table = props => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
);

const THead = props => (
  <chakra.th
    bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
);

const TData = props => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const CopyButton = ({ value }) => {
  const { onCopy, hasCopied } = useClipboard(value);
  return (
    <chakra.button
      color="white"
      aria-label="Copy text"
      textTransform="uppercase"
      role="button"
      onClick={onCopy}
      fontSize="sm"
      bgColor="white"
      paddingX={1}
      paddingY={0.5}
      borderRadius="sm"
    >
      <chakra.p fontSize="xs" color="#202020" fontWeight="bold">
        {hasCopied ? 'Copied' : 'Copy'}
      </chakra.p>
    </chakra.button>
  );
};

const CodeHighlight = ({ children: codeString, className: language }) => {
  language = language.replace('language-', '');
  const size = 18;
  const showLanguage = () => {
    switch (language) {
      case 'typescript':
        return <SiTypescript size={size} color="#408ef5" />;
      case 'tsx':
        return <SiTypescript size={size} color="#408ef5" />;
      case 'ts':
        return <SiTypescript size={size} color="#408ef5" />;
      case 'javascript':
        return <DiJsBadge size={size} color="#f7df1e" />;
      case 'js':
        return <DiJsBadge size={size} color="#f7df1e" />;
      case 'bash':
        return <IoTerminal size={size} color="#57cc99" />;
      case 'git':
        return <FaGitAlt size={size} color="#57cc99" />;
      case 'shell':
        return <IoTerminal size={size} color="#57cc99" />;
      case 'diff':
        return <FaGitAlt size={size} color="#57cc99" />;
      case 'jsx':
        return <SiReact size={size} color="#61dafb" />;
      case 'html':
        return <SiHtml5 size={size} color="#ff9800" />;
      case 'css':
        return <SiCsswizardry size={size} color="#610094" />;
      case 'json':
        return <VscJson size={size} color="#e6ffed" />;
      case 'prisma':
        return <SiPrisma size={size} color="#57cc99" />;
      case 'graphql':
        return <SiGraphql size={size} color="#e10098" />;
      default:
        break;
    }
  };
  const theme = dracula;
  const lineNumberColor = 'whiteAlpha.500';
  const preBackground = 'gray.900';
  const showLineNumbers = !['shell', 'text'].includes(language);

  return (
    <ChakraHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        tokens.pop();
        return (
          <div data-language={className}>
            <chakra.pre
              className={className}
              sx={{ ...style, backgroundColor: preBackground }}
              overflowX="auto"
              borderRadius="md"
              p={2}
              mx={-4}
              fontSize="sm"
            >
              <HStack justifyContent="flex-end" pb={2}>
                <CopyButton value={codeString.trim()} />
                {showLanguage()}
              </HStack>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <chakra.div {...lineProps} display="table-row" key={i}>
                    {showLineNumbers && (
                      <chakra.span
                        w={8}
                        display="table-cell"
                        textAlign="right"
                        userSelect="none"
                        color={lineNumberColor}
                        pr={3}
                      >
                        {i + 1}
                      </chakra.span>
                    )}
                    {line.map((token, key) => {
                      return (
                        <chakra.span
                          {...getTokenProps({ token, key })}
                          key={`${i}.${key}`}
                        />
                      );
                    })}
                  </chakra.div>
                );
              })}
            </chakra.pre>
          </div>
        );
      }}
    </ChakraHighlight>
  );
};

const InlineCode = props => (
  <chakra.code
    apply="mdx.code"
    color={useColorModeValue('purple.500', 'purple.200')}
    bg={useColorModeValue('purple.50', 'purple.900')}
    px={1}
    py={0.5}
    rounded={{ base: 'none', md: 'md' }}
    {...props}
  />
);

const LinkedHeading = props => {
  const slug = slugify(props.children, { lower: true });
  return (
    <Link href={`#${slug}`} name={slug} role="group">
      <Box
        {...props}
        display="inline"
        fontFamily="heading"
        color={useColorModeValue('gray.700', 'white')}
        fontSize={props.fontSize}
      >
        {props.children}
      </Box>
      <chakra.span
        aria-label="anchor"
        color="purple.500"
        userSelect="none"
        fontWeight="normal"
        fontSize="1rem"
        outline="none"
        _focus={{ opacity: 1, boxShadow: 'outline' }}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        ml="0.35rem"
      >
        🔗
      </chakra.span>
    </Link>
  );
};

const Image = props => {
  if (!props.blurDataURL) {
    // eslint-disable-next-line
    return <img src={props.src} width={300} height={300} />;
  }
  return (
    <NextImage
      {...props}
      width={props.width}
      height={props.height}
      loading="lazy"
      quality={100}
    />
  );
};

const Anchor = props => {
  const { colorMode } = useColorMode();
  return (
    <chakra.a
      color={mode('purple.500', 'purple.300')({ colorMode })}
      _hover={{ textDecoration: 'underline' }}
      {...props}
    />
  );
};

const MDXComponents = {
  code: CodeHighlight,
  inlineCode: InlineCode,
  h1: props => (
    <LinkedHeading as="h1" apply="mdx.h1" fontSize="3xl" {...props} />
  ),
  h2: props => (
    <LinkedHeading as="h2" apply="mdx.h2" fontSize="2xl" {...props} />
  ),
  h3: props => (
    <LinkedHeading as="h3" apply="mdx.h3" fontSize="xl" {...props} />
  ),
  h4: props => (
    <LinkedHeading as="h4" apply="mdx.h4" fontSize="xl" {...props} />
  ),
  hr: props => <chakra.hr apply="mdx.hr" {...props} />,
  strong: props => <Box as="strong" fontWeight="semibold" {...props} />,
  pre: Pre,
  kbd: Kbd,
  img: Image,
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? 'br' : undefined}
      height={reset ? undefined : '24px'}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: props => <chakra.p apply="mdx.p" fontSize="lg" {...props} />,
  ul: props => <chakra.ul px={{ base: 4, md: 8 }} apply="mdx.ul" {...props} />,
  ol: props => <chakra.ol apply="mdx.ul" {...props} />,
  li: props => <chakra.li pb="4px" fontSize="lg" {...props} />,
  blockquote: props => (
    <Box>
      <Alert
        role="none"
        status="info"
        variant="left-accent"
        as="blockquote"
        rounded="4px"
        {...props}
        mx={-4}
        w="unset"
      />
    </Box>
  )
};

export default MDXComponents;

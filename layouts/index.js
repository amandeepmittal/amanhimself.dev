import React from 'react';
import { parseISO, format } from 'date-fns';
import {
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
  Box,
  Divider
} from '@chakra-ui/core';

import Container from '../components/Container';
import BlogSeo from '../components/BlogSeo';
import ReadingProgress from '../components/ReadingProgress';
import CustomLink from '../components/CustomLink';

import TWContainer from '../components/ui/TWContainer';
import { TWHeading } from '../components/ui/Heading';
import Tags from '../components/ui/Tags';
import TWButton from '../components/ui/TWButton';
import TWBlogFooterBanner from '../components/ui/TWBlogFooterBanner';

const Layout = ({ frontMatter, children }) => {
  const slug = frontMatter.__resourcePath
    .replace('blog/', '')
    .replace('.mdx', '');

  const shareOnTwitter = (slug, frontMatter) =>
    `http://twitter.com/share?text=${encodeURIComponent(
      frontMatter.title
    )}&url=https://amanhimself.dev/blog/${slug}/&via=amanhimself`;

  const handleSocialShare = React.useCallback(
    (url, name, windowSize) => e => {
      e.preventDefault();
      window.open(url, name, windowSize);
    },
    []
  );

  return (
    <>
      <TWContainer as="main">
        <BlogSeo
          url={`https://amanhimself.dev/blog/${slug}`}
          {...frontMatter}
        />
        <ReadingProgress />
        <article className="relative flex flex-col md:px-4 xl:grid xl:grid-cols-4 xl:col-gap-6">
          <div className="pb-4 md:mr-8 xl:pb-0 xl:mb-8 xl:col-span-4">
            <TWHeading noMargin>{frontMatter.title}</TWHeading>
          </div>
          <div className="flex flex-wrap order-1 space-y-8 md:mr-8 xl:order-none xl:col-span-3">
            <img src={frontMatter.image} />
            <div className="flex flex-col">
                <Box>{children}</Box>              
            </div>
            <TWBlogFooterBanner />
          </div>
          <aside className="pb-10">
            <div className="sticky top-0 flex flex-col items-start pt-4 border-t border-gray-200 xl:pl-4 sm:flex-row xl:border-l xl:border-t-0 xl:space-y-8 xl:block">
              <img
                src={frontMatter.thumbnail}
                height="48px"
                width="48px"
                className="inline-block w-12 h-12 mt-4 mr-8 xl:block xl:self-center self-justify-center xl:mt-0 xl:mr-0"
                alt={frontMatter.title}
              />
              <div className="flex flex-wrap xl:block xl:space-y-8">
                <dl className="p-2 mt-4 mr-8 xl:mt-0 xl:mr-0">
                  <dt className="font-semibold font-source-sans-pro">
                    Published on
                  </dt>
                  <dd className="text-base font-medium leading-6 text-time">
                    {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                  </dd>
                </dl>
                <dl className="p-2 mt-4 md:mr-8 xl:mt-0 xl:mr-0">
                  <dt className="font-semibold font-source-sans-pro">
                    Reading time
                  </dt>
                  <dd className="text-base font-medium leading-6 text-time">
                    {frontMatter.readingTime.text}
                  </dd>
                </dl>
                {/* <dl className="mt-4 md:mr-8 xl:mt-0 xl:mr-0">
                  <dt className="font-semibold font-source-sans-pro">
                    Word Count
                  </dt>
                  <dd className="text-base font-medium leading-6 text-time">
                    {frontMatter.wordCount} words
                  </dd>
                </dl> */}
                <dl className="p-2 w-full mt-4 md:mr-8 md:w-auto xl:mt-0 xl:mr-0">
                  <dt className="font-semibold font-source-sans-pro">Tags</dt>
                  <dd className="text-base font-medium leading-6 text-time">
                    <Tags tags={frontMatter.tags}></Tags>
                  </dd>
                </dl>
                <dl className="w-full mt-4 lg:mr-8 sm:mt-2 xl:space-y-2 xl:mt-0 xl:mr-0">
                  <dd className="mt-2 text-base font-medium leading-6 xl:mt-0 text-time">
                    <ul className="space-y-2 sm:items-start sm:space-x-2 sm:space-y-0 xl:space-y-2 sm:flex xl:space-x-0 xl:block">
                      <li className="w-full">
                        <TWButton
                          onClick={handleSocialShare(
                            shareOnTwitter(slug, frontMatter)
                          )}
                          variant="twitter">
                          Share on Twitter
                        </TWButton>
                      </li>
                      <li className="w-full">
                        <TWButton
                          onClick={handleSocialShare(
                            `https://ko-fi.com/amanhimself`
                          )}
                          variant="coffee">
                          Buy me coffee
                        </TWButton>
                      </li>
                      <li className="w-full">
                        <TWButton
                          onClick={handleSocialShare(
                            `https://amanhimself.substack.com/`
                          )}
                          variant="primary">
                          Join Newsletter
                        </TWButton>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </aside>
        </article>
      </TWContainer>

      {/* <Container> */}
      {/* <BlogSeo
          url={`https://amanhimself.dev/blog/${slug}`}
          {...frontMatter}
        /> */}
      {/* <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
          w="100%"> */}
      {/* <ReadingProgress /> */}
      {/* <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            w="100%">
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              {frontMatter.title}
            </Heading>
            <Flex
              justify="space-between"
              align={['initial', 'center']}
              direction={['column', 'row']}
              mt={2}
              w="100%"
              mb={4}>
              <Flex align="center">
                <Avatar
                  size="xs"
                  name="Aman Mittal"
                  src="https://avatars3.githubusercontent.com/u/10234615?s=460&u=766dec2f37fe330f9d12722074a6fbee326eac78&v=4"
                  mr={2}
                />
                <Text fontSize="sm" color="gray.500">
                  {frontMatter.by}
                  {'Aman Mittal'}
                  {` • `}
                  {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
                {frontMatter.readingTime.text}
                {` • `}
                {frontMatter.wordCount} words
              </Text>
            </Flex>
          </Flex>
          <Box>
            <img src={frontMatter.image} />
          </Box>
          {children}
          <Box>
            <Divider borderColor="purple.400" />
            <CustomLink
              href={shareOnTwitter(slug, frontMatter)}
              isExternal
              color="gray.900"
              fontSize="xl"
              style={{ borderBottom: 0 }}>
              {'🐦  Share on Twitter'}
            </CustomLink>
            {` • `}
            <CustomLink
              href="https://ko-fi.com/amanhimself"
              isExternal
              color="gray.900"
              fontSize="xl"
              style={{ borderBottom: 0 }}>
              {'☕  Buy me a Coffee'}
            </CustomLink>
            {` • `}
            <CustomLink
              href="https://amanhimself.substack.com/"
              isExternal
              color="gray.900"
              fontSize="xl"
              style={{ borderBottom: 0 }}>
              {'💌  Subscribe Newsletter'}
            </CustomLink>
          </Box>
          <Box>
            <FooterBanner />
          </Box> */}
      {/* <Box>
            <AuthorCard />
          </Box> */}
      {/* </Stack>
      </Container> */}
    </>
  );
};

export default Layout;

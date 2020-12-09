import React from 'react';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import allTags from '../../components/ui/helpers/allTags';
import { TWHeading } from '../../components/ui/Heading';
import TWBlogCard from '../../components/ui/TWBlogCard';
import TWContainer from '../../components/ui/TWContainer';
import TWCustomLink from '../../components/ui/TWCustomLink';
import { frontMatter as blogPosts } from '../blog/**/*.mdx';

const url = 'https://amanhimself.dev/';
const title = 'Blog – Aman Mittal';
const description = 'Software developer and React Native enthusiast.';

const TagDetails = () => {
  const router = useRouter();

  // console.log(router.query);

  const filteredBlogPosts = blogPosts
    .filter(frontMatter => frontMatter.tags.includes(router.query.slug))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  const count = blogPosts.length;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <TWContainer as="main" noMargin className="md:px-4 space-y-14">
        <div className="flex flex-col max-w-screen-lg mx-8 items-center justify-center">
          <div className="flex flex-wrap m-4">
            {allTags.map(tag => (
              <TWCustomLink
                key={tag.name}
                scroll={false}
                to={`/tag/${tag.slug}`}
                className={classNames(
                  'pointer-events-auto inline-block rounded-lg px-2 py-1 text-xs font-semibold transition-colors duration-200 ease-in-out mx-2 my-2',
                  tag.bgColor,
                  tag.fontColor
                )}>
                #{tag.name}
              </TWCustomLink>
            ))}
          </div>
          <TWHeading size="h1">
            Tag: #{router.query.slug} - {filteredBlogPosts.length}
          </TWHeading>
          {!filteredBlogPosts.length && 'No posts found.'}
          {filteredBlogPosts.map(frontMatter => {
            return <TWBlogCard key={frontMatter.title} {...frontMatter} />;
          })}
        </div>
      </TWContainer>
    </>
  );
};

export default TagDetails;

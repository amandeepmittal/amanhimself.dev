import React from 'react';
import NextLink from 'next/link';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

import Heading from './Heading';

const BlogCard = frontMatter => {
  const { title, thumbnail } = frontMatter;

  const slug = frontMatter.__resourcePath
    .replace('blog/', '')
    .replace('.mdx', '');

  return (
    <article className="relative w-3/4 my-4 inline-block p-4 text-gray-700 rounded-md outline-none post-item hover:bg-purple-100 hover:text-gray-700 focus:bg-gray-100 focus:shadow-sm focus:text-gray-700 transition duration-500 ease focus:outline-none focus:shadow-outline">
      <NextLink href={`blog/${slug}`} passHref>
        <a
          className="absolute top-0 bottom-0 left-0 right-0"
          aria-label={`link to blog post "${title}" detail page`}></a>
      </NextLink>
      <div className="relative z-10 space-y-4 pointer-events-none xl:space-y-0 xl:grid xl:grid-cols-4 xl:col-gap-6">
        <div className="flex items-center pr-4 xl:space-x-6 xl:pb-0 xl:col-span-3">
          <div className="flex-shrink-0 hidden w-12 h-12 xl:inline-block">
            <Image
              src={thumbnail}
              height={48}
              width={48}
              alt={title}
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <Heading size="h3" noMargin>
              {title}
            </Heading>
          </div>
        </div>
        <div className="flex items-center pt-4 space-x-6 border-t border-gray-200 xl:pl-4 xl:pt-0 xl:space-x-0 xl:border-l xl:border-t-0">
          <div className="inline-block w-12 h-12 xl:hidden">
            <Image
              src={thumbnail}
              height={48}
              width={48}
              alt={title}
              className="object-cover"
            />
          </div>
          <div>
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-time font-source-sans-pro">
                {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                {` • `}
                {frontMatter.readingTime.text}
              </dd>
            </dl>
            {/* <Tags tags={tags}></Tags> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

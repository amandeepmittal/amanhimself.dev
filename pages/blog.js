import React, { useState } from 'react';
import { NextSeo } from 'next-seo';

import {TWHeading} from '../components/ui/Heading';
import TWBlogCard from '../components/ui/TWBlogCard';
import TWContainer from '../components/ui/TWContainer';

import { frontMatter as blogPosts } from './blog/**/*.mdx';

const url = 'https://amanhimself.dev/';
const title = 'Blog – Aman Mittal';
const description = 'Software developer and React Native enthusiast.';

const Blog = () => {
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = blogPosts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter(frontMatter =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
    );

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
          <TWHeading size="h1">Blog Posts - {blogPosts.length}</TWHeading>
          <p className="text-lg text-gray-500 my-4">A collection of articles, tutorials, and writings.</p>
          <input class="bg-white rounded border-0 p-3 focus:outline-none focus:shadow-outline border border-purple-200 rounded-lg py-2 px-4 block w-3/4 appearance-none leading-normal" type="search" onChange={e => setSearchValue(e.target.value)}
          placeholder="Search a post here... " />
          
        {!filteredBlogPosts.length && 'No posts found.'}
            {filteredBlogPosts.map(frontMatter => (
              <TWBlogCard key={frontMatter.title} {...frontMatter} />
            ))}          
        </div>      
      </TWContainer>
    </>
  );
};

export default Blog;

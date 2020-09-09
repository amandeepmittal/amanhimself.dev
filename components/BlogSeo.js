import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, publishedAt, url, image }) => {
  const date = new Date(publishedAt).toISOString();
  const featuredImage = {
    url: `https://amanhimself.dev${image}`,
    alt: title
  };

  return (
    <>
      <NextSeo
        title={`${title} – Aman Mittal`}
        description={title}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date
          },
          url,
          title,
          description: title,
          images: [featuredImage]
        }}
      />
      <ArticleJsonLd
        authorName="Aman Mittal"
        dateModified={date}
        datePublished={date}
        description={title}
        images={[featuredImage]}
        publisherLogo="/favicons.ico"
        publisherName="Aman Mittal"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;

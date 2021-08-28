import * as React from 'react';
import { Helmet } from 'react-helmet';

import siteOG from '../../images/og.jpg';
import { config } from '../../helpers';

const SEO = ({ postNode, postPath, postSEO, customDescription }) => {
  let title;
  let description;
  let image = siteOG;
  let postURL;
  let canonicalURL;

  if (postSEO) {
    const postMeta = postNode.frontmatter;
    title = postMeta.title;
    description = postNode.excerpt;

    if (postMeta.thumbnail) {
      image = postMeta.thumbnail.childImageSharp.fixed.src;
    }
    postURL = `${config.siteUrl}${postPath}`;
    canonicalURL = `${config.siteUrl}${postPath}`;
  } else {
    title = config.siteTitle;
    description = customDescription || config.description;
    canonicalURL = `https://amanhimself.dev/`;
  }

  image = `${config.siteUrl}${image}`;

  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: title,
      alternateName: title
    }
  ];

  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image
            }
          }
        ]
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: config.siteUrl,
        name: title,
        alternateName: title,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description
      }
    );
  }

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="canonical" href={canonicalURL} />

      <meta content="#c792ea" name="theme-color" />
      <meta content="#c792ea" name="msapplication-TileColor" />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <meta
        name="robots"
        content="index,follow,max-video-preview:-1,max-snippet:-1,max-image-preview:large, max-video-preview:-1, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      <meta property="og:url" content={postSEO ? postURL : config.siteUrl} />
      {postSEO && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;

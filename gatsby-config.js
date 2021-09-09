module.exports = {
  siteMetadata: {
    title: `Aman Mittal`,
    author: `Aman Mittal`,
    description: `Software engineer and technical writer.`,
    siteUrl: `https://amanhimself.dev`,
    pathPrefix: `/`,
    keywords: ['gatsby', 'react', 'scss', 'amanhimself', 'blog', 'portfolio'],
    email: `amanmittal.work@gmail.com`,
    twitter: `@amanhimself`,
    siteLanguage: `en-GB`,
    siteLocale: `en_gb`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700
            }
          },
          // {
          //   resolve: 'gatsby-remark-autolink-headers',
          //   options: {
          //     offsetY: `100`,
          //     icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
          //     className: `custom-class`,
          //     maintainCase: true,
          //     removeAccents: true,
          //     isIconAfterHeader: true,
          //     elements: [`h1`, `h4`]
          //   }
          // },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false
              },
              escapeEntities: {}
            }
          },
          // {
          //   resolve: 'gatsby-remark-embedder',
          //   options: {
          //     customTransformers: [twitch, youtube]
          //   }
          // },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'noopener noreferrer'
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'UA-143759180-1' // Google Analytics / GA
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Aman Mittal',
        short_name: '@amanhimself',
        description: 'Software engineer and technical writer.',
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#c792ea`,
        display: `minimal-ui`,
        icon: `src/images/reactfavi.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title                
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { author: 'amanmittal.work@gmail.com' }
                  ]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 30,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                      }
                      frontmatter {
                        title
                        date
                        template
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Aman Mittal | RSS Feed'
          }
        ]
      }
    },
    `gatsby-plugin-gatsby-cloud`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};

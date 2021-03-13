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
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [
            `Righteous:400`,
            `Montserrat:400,500,600,700,800,900`,
            `Open Sans:400,500,600,700,800,900`
          ]
        }
      }
    },
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
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false,
              removeAccents: true
            }
          },
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
        icon: `src/images/avatar.jpg` // This path is relative to the root of the site.
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

module.exports = {
  siteMetadata: {
    title: `Aman Mittal`,
    author: {
      name: 'Aman Mittal'
    },
    pathPrefix: '/',
    siteUrl: 'https://amanhimself.dev',
    description: 'Software engineer and technical writer.'
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Aman Mittal',
        short_name: 'Aman Mittal',
        description: 'Software engineer and technical writer.',
        start_url: '/',
        background_color: 'white',
        theme_color: '#8B5CF6',
        display: 'minimal-ui',
        icon: `content/assets/avatar.jpg`
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

    // ===================================================================================
    // Images and static
    // ===================================================================================

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`
      }
    },

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 650
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true
              }
            }
          }
        ]
      }
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: 'speed',
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")                  
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            date: node.frontmatter.date
          }))
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'UA-143759180-1' // Google Analytics / GA
        ]
      }
    }
  ]
};

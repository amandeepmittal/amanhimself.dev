const config = require('./src/config/siteMetaData')

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    twitterHandle: config.twitterHandle,
    image: config.siteLogo,
    author: config.author,
    canonicalUrl: config.siteUrl,
    lang: config.siteLanguage,
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo
    },
    social: {
      twitter: config.twitterHandle
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        // defaultLayouts: {
        //   default: require.resolve('./src/components/layout.js'),
        // },
        extensions: ['.mdx', '.md', '.markdown'],

        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1800,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: 'eager'
            }
          }
        ],
        plugins: [{ resolve: 'gatsby-remark-images' }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/tutorials/`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: `src/images/logo.jpg` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsID
      }
    }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}

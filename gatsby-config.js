module.exports = {
  siteMetadata: {
    title: `Aman Mittal`,
    description: `Aman Mittal - Developer, Technical Writer`,
    titleTemplate: `%s | Aman Mittal`,
    url: `https://amanhimself.dev`,
    image: `cover-image.png`,
    twitterUsername: `@amanhimself`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 400
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500
            }
          }
        ],
        plugins: [`gatsby-remark-images`]
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-143759180-1`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aman Mittal - Developer, Technical Writer`,
        short_name: `Aman Mittal`,
        start_url: `/`,
        background_color: `#5E3AC8`,
        theme_color: `#5E3AC8`,
        display: `minimal-ui`,
        icon: `static/cover-image.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};

const _ = require('lodash')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      pages: allMdx(filter: { fileAbsolutePath: { regex: "//pages//" } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      tutorials: allMdx(
        filter: { fileAbsolutePath: { regex: "/tutorials//" } }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      tagsGroup: allMdx(
        filter: { fileAbsolutePath: { regex: "//tutorials//" } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('failed to create pages', result.errors)
  }
  // renders pages for lessons
  const pages = result.data.pages.nodes
  pages.forEach(page => {
    actions.createPage({
      path: `/${page.frontmatter.slug}/`,
      component: require.resolve('./src/templates/page.js'),
      context: {
        slug: page.frontmatter.slug
      }
    })
  })

  // renders pages for tutorials
  const tutorials = result.data.tutorials.nodes
  tutorials.forEach(tutorial => {
    actions.createPage({
      path: `/tutorials/${tutorial.frontmatter.slug}/`,
      component: require.resolve('./src/templates/tutorial.js'),
      context: {
        slug: tutorial.frontmatter.slug
      }
    })
  })

  // renders pages for courses, based from tutorials tags
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: require.resolve('./src/templates/tag.js'),
      context: {
        tag: tag.fieldValue
      }
    })
  })
}

import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Card from '../components/Card'
// import Secondary from '../components/secondary'
// import SEO from '../components/seo'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges: tutorials } = data.allMdx

  return (
    <Layout>
      {/* <SEO title={`Tutorials tagged as ${tag}`} />
      <Secondary>
        <h1>{`${tag}`}</h1>
        <p>Tutorials tagged as {`${tag}`}</p>
      </Secondary> */}

      <Grid>
        {tutorials.map(({ node: tutorial }) => (
          <Link
            key={tutorial.id}
            to={`/tutorials/${tutorial.frontmatter.slug}`}
          >
            <Card
              tutorialIcon={tutorial.frontmatter.icon.sharp.fluid}
              tutorialTags={tutorial.frontmatter.tags}
              tutorialTitle={tutorial.frontmatter.title}
            />
          </Link>
        ))}
      </Grid>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: frontmatter___tutorialID, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            slug
            tags
            tutorialID
            image {
              sharp: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            icon {
              sharp: childImageSharp {
                fluid(maxWidth: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

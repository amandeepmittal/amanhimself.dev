import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
// import Secondary from '../components/secondary'
import Content from '../components/Content'
// import SEO from '../components/seo'

const PagesTemplate = ({ data: { mdx: page } }) => (
  <Layout>
    {/* <SEO
      title={page.frontmatter.title}
      description={page.excerpt}
      image={page.frontmatter.image.sharp.fluid}
    />
    <Secondary>
      <h1>{page.frontmatter.title}</h1>
      <p>{page.frontmatter.lead}</p>
    </Secondary> */}

    <Content>
      <MDXRenderer>{page.body}</MDXRenderer>
    </Content>
  </Layout>
)

export default PagesTemplate

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        slug
        lead
        image {
          sharp: childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
  }
`

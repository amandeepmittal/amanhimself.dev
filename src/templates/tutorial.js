import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Content from '../components/Content'
import Code from '../components/Code'
// import SEO from '../components/seo'
import BlogPostFooter from '../components/BlogPostFooter'

const Icon = styled.div`
  width: 60px;
  margin: auto;
  margin-bottom: 25px;
  :hover {
    filter: brightness(1.1) saturate(110%);
  }
`

const EmptyDiv = styled.div`
  h1 {
    font-size: 18px;
    @media (max-width: ${props => props.theme.screen.sm}) {
      font-size: 14px;
    }
  }
`

const components = {
  code: Code
}

const _ = require('lodash')

const TutorialTemplate = ({ data: { mdx: tutorial } }) => {
  return (
    <Layout>
      {/* <SEO
        title={tutorial.frontmatter.title}
        description={tutorial.lead}
        image={tutorial.frontmatter.image.sharp.fluid}
      /> */}

      <Hero>
        {tutorial.frontmatter.tags.map((tag, i) => (
          <Link
            to={`/tags/${_.kebabCase(tag)}`}
            key={i}
            aria-label="Tutorial Icon"
          >
            {/* <RotateIcon className={rotateState === true ? 'rotateTrue' : null}> */}
            <Icon>
              <Image
                loading="eager"
                fluid={tutorial.frontmatter.icon.sharp.fluid}
                style={{ width: '50px', height: '50px' }}
              />
            </Icon>
            {/* </RotateIcon> */}
          </Link>
        ))}
        <EmptyDiv>
          <h1>{tutorial.frontmatter.title}</h1>
          <p>{tutorial.frontmatter.lead}</p>
        </EmptyDiv>
      </Hero>
      <Image
        style={{ marginTop: '20px' }}
        fluid={tutorial.frontmatter.image.sharp.fluid}
      />
      <Content>
        <MDXProvider components={components}>
          <MDXRenderer components={components}>{tutorial.body}</MDXRenderer>
        </MDXProvider>
      </Content>
      <BlogPostFooter />
    </Layout>
  )
}

export default TutorialTemplate

export const query = graphql`
  query data($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        tags
        tutorialID
        lead
        image {
          sharp: childImageSharp {
            fluid(maxWidth: 1200) {
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
      body
    }
  }
`

import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'

const Hero = () => {
  const theme = useTheme()
  return (
    <section
      css={css`
        color: ${theme.colors.white};
        width: 100%;
        background: ${theme.colors.primary};
        padding: 5px 0 0 0;
        display: flex;
      `}
    >
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        {/* <h1
          css={css`
            color: ${theme.colors.white};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin: 0;
            max-width: ${rhythm(15)};
          `}
        >
          All Articles
        </h1> */}
        <p
          css={css`
            margin-top: 15px;
          `}
        >
          A list of all posts I have written on Nodejs, Reactjs, GraphQL, React
          Native and other libraries or frameworks.
        </p>
        <h3
          css={css`
            margin: 0px;
            background-color: #52b351;
            border: 0px;
            padding: 10px;
            text-align: center;
            display: inline-block;
            font-size: 18px;
            border-radius: 8px;
          `}
        >
          <span role="img" aria-label="newsletter">
            💌{' '}
          </span>
          <a
            href="https://tinyletter.com/amanhimself"
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              color: white;
              &:hover {
                text-decoration: none;
                color: #503d81;
              }
            `}
          >
            Join 800+ devs for a weekly newsletter
          </a>
        </h3>
        {/* <p
          css={css`
            margin-top: 15px;
          `}
        >
          If you enjoy my articles, and want help me create more and keep them
          free to read on the internet, please consider supporting what I do.
          Thank you{' '}
          <span role="img" aria-label="thanks">
            🙏
          </span>
        </p>
        <a
          href="https://ko-fi.com/A611K61"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            css={css`
              height: 40px;
              margin-bottom: -20px;
            `}
            src={SUPPORT_IMAGE}
            alt="Support at ko-fi.com"
          />
        </a> */}
      </Container>
    </section>
  )
}

export default function Blog({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        {allMdx.edges.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
              display: inline;
            `}
          >
            <p
              css={css({
                marginBottom: rhythm(0.3),
                transition: 'all 150ms ease',
                ':hover': {
                  color: theme.colors.secondary
                },
                fontSize: 22
              })}
            >
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}{' '}
              </Link>
              -{' '}
              <small
                css={css`
                  color: white;
                  border-radius: 10px;
                  border: 1px solid #503d81;
                  background: #503d81;
                  padding: 2px;
                `}
              >
                {post.frontmatter.categories}
              </small>
            </p>
          </div>
        ))}
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
            categories
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
            categories
          }
        }
      }
    }
  }
`

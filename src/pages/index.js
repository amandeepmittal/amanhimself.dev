import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import {
  FaGithub,
  FaTwitter,
  FaMedium,
  FaEnvelope,
  FaDev,
  FaPatreon
} from 'react-icons/fa'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'
import Avatar from '../../assets/avatar.jpg'
import SocialIcon from 'components/SocialIcon'
import Intro from 'components/Intro'

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
        <h1
          css={css`
            color: ${theme.colors.white};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin: 0;
            max-width: ${rhythm(15)};
          `}
        >
          <p>
            <span role="img" aria-label="wave">
              👋
            </span>{' '}
            Hi, I'm Aman Mittal
          </p>
        </h1>
        <img
          src={Avatar}
          css={css`
            width: 150px;
            height: 150px;
            border-radius: 75px;
            box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
            color: ${theme.colors.white};
          `}
          alt="amanhimself"
        />
        <div>
          <SocialIcon href="https://twitter.com/amanhimself">
            <FaTwitter
              css={css`
                color: ${theme.colors.white};
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="mailto:amanmittal.work@gmail.com">
            <FaEnvelope
              css={css`
                color: ${theme.colors.white};
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://medium.com/@amanhimself">
            <FaMedium
              css={css`
                color: ${theme.colors.white};
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://github.com/amandeepmittal">
            <FaGithub
              css={css`
                color: ${theme.colors.white};
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://dev.to/amanhimself">
            <FaDev
              css={css`
                color: ${theme.colors.white};
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://patreon.com/amanhimself">
            <FaPatreon
              css={css`
                color: ${theme.colors.white};
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
        </div>
      </Container>
      {/* <div
        css={css`
          height: 150px;
          overflow: hidden;
        `}
      /> */}
    </section>
  )
}

// const Description = styled.p`
//   margin-bottom: 10px;
//   display: inline-block;
// `

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <h2
          css={css`
            color: #503d81;
          `}
        >
          <span role="img" aria-label="work">
            📝{' '}
          </span>
          Latest Posts
        </h2>
        {allMdx.edges.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <p
              css={css({
                marginBottom: rhythm(0.3),
                transition: 'all 150ms ease',
                ':hover': {
                  color: theme.colors.primary
                }
              })}
            >
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}
              </Link>
            </p>
            {/* <Description>
              {post.excerpt}{' '}
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                Read Article →
              </Link>
            </Description> */}
          </div>
        ))}
        <h4
          css={css`
            margin: 0px;
            background-color: #f3993e;
            border: 0px;
            padding: 10px;
            text-align: center;
            display: inline-block;
            font-size: 18px;
            border-radius: 8px;
          `}
        >
          <span role="img" aria-label="right">
            👉{' '}
          </span>
          <Link
            to="/blog"
            aria-label="go to all posts"
            css={css`
              color: white;
              &:hover {
                text-decoration: none;
                color: #503d81;
              }
            `}
          >
            All Blog Posts{' '}
          </Link>
        </h4>
        <hr
          css={css({
            borderTop: '1px dotted #000'
          })}
        />
        <Intro />
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
      limit: 10
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
          }
        }
      }
    }
  }
`

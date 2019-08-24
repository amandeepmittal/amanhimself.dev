import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { useTheme } from './Theming'
import ThemeToggler from './ThemeToggler'
import KofiImage from '../../assets/kofi.png'

import Container from './Container'

const Header = ({ siteTitle }) => {
  const theme = useTheme()
  return (
    <header
      css={css`
        width: 100%;
        flex-shrink: 0;
        background: none;
        padding: 20px 0;
        background: ${theme.colors.headerBg};
      `}
    >
      <Container noVerticalPadding>
        <nav
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Link
            to="/"
            aria-label="go to homepage"
            css={css`
              color: white;
              &:hover {
                color: yellow;
                text-decoration: none;
              }
            `}
          >
            About
          </Link>
          <Link
            to="/blog"
            aria-label="go to homepage"
            css={css`
              color: white;
              &:hover {
                color: yellow;
                text-decoration: none;
              }
            `}
          >
            Blog
          </Link>
          {/* <Link
            to="/published"
            aria-label="go to all published links"
            css={css`
              color: white;
              &:hover {
                color: yellow;
                text-decoration: none;
              }
            `}
          >
            Published Content
          </Link> */}
          <a
            href="https://tinyletter.com/amanhimself"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="go to newsletter"
            css={css`
              color: white;
              &:hover {
                color: yellow;
                text-decoration: none;
              }
            `}
          >
            Newsletter
          </a>
          <a
            href="https://ko-fi.com/amanhimself"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="go to newsletter"
            css={css`
              color: white;
              &:hover {
                color: yellow;
                text-decoration: none;
              }
            `}
          >
            <img
              src={KofiImage}
              css={css`
                margin: 0;
                height: 40px;
                width: 40px;
              `}
              alt="buy-me-coffee"
            />
          </a>
          <div
            css={css`
              font-size: 16px;
              line-height: 1.25;
              display: flex;
              align-items: center;
              a {
                text-decoration: none;
                & + a {
                  margin-left: 32px;
                }
              }
              .active {
                display: none;
                visibility: hidden;
              }
            `}
          >
            {/* <Link
              to="/blog"
              activeClassName="active"
              aria-label="View blog page"
            >
              Blog
            </Link> */}

            <ThemeToggler
              css={{}}
              toggleTheme={theme.toggleTheme}
              themeName={theme.themeName}
            />
          </div>
        </nav>
      </Container>
    </header>
  )
}

const ConnectedHeader = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Header siteTitle={data.site.siteMetadata.title} {...props} />
    )}
  />
)

export default ConnectedHeader

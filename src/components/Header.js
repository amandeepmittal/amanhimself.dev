import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import KofiImage from '../images/kofi.png'

export const HeaderWrapper = styled.div`
  flex-shrink: 0;
  background: none;
  margin: auto;
  padding: 20px 0;
  background: ${props => props.theme.color.primary.purple};
  a {
    color: ${props => props.theme.color.light.accent100};
    text-decoration: none;
    font-weight: 300;
    &:hover {
      color: ${props => props.theme.color.primary.yellow};
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    padding: 15px 5px;
  }
`

export const HeaderGroup = styled.div`
  max-width: 700px;
  margin: auto;
`

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const KofiLogo = styled.img`
  margin: 0;
  height: 40px;
  width: 40px;
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderGroup>
      <Navbar>
        <Link to="/" aria-label="go to home page">
          About
        </Link>
        <Link to="/tutorials" aria-label="go to blog page">
          Blog
        </Link>
        <a
          href="https://tinyletter.com/amanhimself"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="go to newsletter"
        >
          Newsletter
        </a>
        <a
          href="https://ko-fi.com/amanhimself"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="go to newsletter"
        >
          <KofiLogo src={KofiImage} alt="buy me a coffee" />
        </a>
      </Navbar>
    </HeaderGroup>
  </HeaderWrapper>
)

export default Header

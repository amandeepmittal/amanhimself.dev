import React from 'react'
import styled from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const FooterWrapper = styled.div`
  background: ${props => props.theme.color.light.accent100};
  padding: 20px;
  @media (max-width: ${props => props.theme.screen.sm}) {
    padding: 15px 5px;
  }
`

const FooterGroup = styled.div`
  max-width: ${props => props.theme.screen.sm};
  margin: auto;
  color: ${props => props.theme.color.light.accent200};
`

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: ${props => props.theme.screen.sm}) {
    display: flex;
    /* flex-grow: 1; */
    p {
      font-size: 8px;
      margin-right: 5px;
    }
  }
`

const FooterLink = props => (
  <OutboundLink href={props.href} target="_blank" rel="noopener noreferrer">
    <span style={{ marginRight: '5px' }}>{props.children}</span>
  </OutboundLink>
)

const Footer = () => (
  <FooterWrapper>
    <FooterGroup>
      <Navbar>
        <p
          style={{
            color: '#9a9a9b',
            fontSize: '14px',
            fontWeight: '400',
            paddingBottom: '16px'
          }}
        >
          Aman Mittal © {new Date().getFullYear()} - version 5
        </p>
        <FooterLink href="https://twitter.com/amanhimself">
          <p style={{ color: '#9a9a9b', fontSize: '14px', fontWeight: '400' }}>
            Twitter
          </p>
        </FooterLink>
        <FooterLink href="https://tinyletter.com/amanhimself">
          <p style={{ color: '#9a9a9b', fontSize: '14px', fontWeight: '400' }}>
            Newsletter
          </p>
        </FooterLink>
        <FooterLink href="https://ko-fi.com/amanhimself">
          <p style={{ color: '#9a9a9b', fontSize: '14px', fontWeight: '400' }}>
            Ko-fi
          </p>
        </FooterLink>
      </Navbar>
    </FooterGroup>
  </FooterWrapper>
)

export default Footer

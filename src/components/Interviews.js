import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    font-size: 16px;
  }
  ul {
    font-size: 18px;
  }
  li {
    font-size: 16px;
    line-height: 1em;
    margin-top: -10px;
  }
  a {
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`

const Interviews = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="newsletter">
        🎧{' '}
      </span>
      Guest Podcast Appearance
    </h3>
    <p>
      {' '}
      <span role="img" aria-label="right">
        👉{' '}
      </span>
      <a
        href="https://devchat.tv/react-round-up/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal/"
        target="_blank"
        rel="noopener noreferrer"
      >
        React Round Up 006:{' '}
      </a>
      Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory House,
      Tara Manicsic and Kent C Dodds
    </p>
  </Wrapper>
)

export default Interviews

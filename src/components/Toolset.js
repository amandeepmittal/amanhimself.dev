import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    font-size: 16px;
  }
  h4 {
    line-height: 0.5em;
  }
  li {
    line-height: 1em;
    margin-top: -15px;
  }
  a {
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`

const Toolset = () => (
  <Wrapper>
    <h3>
      {' '}
      <span role="img" aria-label="toolbox">
        🧰{' '}
      </span>
      Currently Using
    </h3>
    <ul>
      <li>
        <p>
          <span style={{ fontWeight: 'bold' }}>Computer:</span> MacBook Air 2017
        </p>
      </li>
      <li>
        <p>
          <span style={{ fontWeight: 'bold' }}>Editor:</span> Visual Studio Code
        </p>
      </li>
      <li>
        <p>
          {' '}
          <span style={{ fontWeight: 'bold' }}>
            Static Site Generator:
          </span>{' '}
          <a
            href="https://www.gatsbyjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GatsbyJS
          </a>
        </p>
      </li>
      <li>
        <p>
          <span style={{ fontWeight: 'bold' }}>Hosting:</span>{' '}
          <a
            href="https://www.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
        </p>
      </li>
      <li>
        <p>
          <span style={{ fontWeight: 'bold' }}>Syntax Highlighting:</span>{' '}
          <a
            href="http://prismjs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PrismJS
          </a>
        </p>
      </li>
      <li>
        <p>
          <span style={{ fontWeight: 'bold' }}>Code Syntax Theme:</span>{' '}
          <a
            href="https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss"
            target="_blank"
            rel="noopener noreferrer"
          >
            fairyfloss
          </a>
          , Dracula
        </p>
      </li>
      <li>
        <p>
          <span style={{ fontWeight: 'bold' }}>Newsletter:</span>{' '}
          <a
            href="https://tinyletter.com/amanhimself"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tinyletter
          </a>
        </p>
      </li>
    </ul>
  </Wrapper>
)

export default Toolset

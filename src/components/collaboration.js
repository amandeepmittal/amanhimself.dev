import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    font-size: 16px;
  }
  a {
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`

const Collaboration = () => (
  <Wrapper>
    <h3>
      {' '}
      <span role="img" aria-label="newsletter">
        🤝{' '}
      </span>
      Want to collaborate?
    </h3>
    <p>
      Would you like to collaborate on a project, app, hire me as a technical
      writer or create new course material for JavaScript ecosystem?
    </p>
    <span role="img" aria-label="email">
      📧
    </span>
    <a
      href="mailto:amanmittal.work@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Please drop me an email here.{' '}
    </a>
  </Wrapper>
)

export default Collaboration

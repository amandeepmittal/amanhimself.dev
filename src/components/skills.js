import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    font-size: 16px;
  }
  h4 {
    line-height: 0.5em;
  }
`

const TechSkills = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="newsletter">
        🛠{' '}
      </span>
      Technical Skills
    </h3>
    <h4>My Current Stack</h4>
    <p>
      Node.js, Reactjs, React Native, Firebase, Express, GatsbyJS, Expo,
      GraphQL, MongoDB
    </p>
    <h4>Frameworks/Libraries I'm familiar with</h4>
    <p>
      Angular, Meteorjs, Ionic, SASS, Bulma, Semantic UI, Material, Bootstrap
    </p>
    <h4>Education</h4>
    <p>Bachelor of Engineering (B.Tech.) in Computer Science</p>
  </Wrapper>
)

export default TechSkills

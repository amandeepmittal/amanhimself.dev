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
`

const WorkHistory = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="work">
        👨‍💻{' '}
      </span>
      Work History
    </h3>
    <p>
      Currently, I am working as freelance/contract developer on web
      applications and as a Technical Writer.
    </p>
    <ul>
      <p style={{ fontWeight: '600' }}>Freelance/Contract (2017- present)</p>
      <li>
        <p>Crowdbotics (Full-Stack role, Technical Writer, 2018 - Present)</p>
      </li>
      <li>
        <p>Hearbeat (Technical Writer, 2019 - Present)</p>
      </li>
      <li>
        <p>JSCrambler (Technical Writer, 2018 - Present)</p>
      </li>
      <li>
        <p>Danco Solutions (Full-Stack role)</p>
      </li>
      <li>
        <p>Zeolearn (Node.js Course Curriculum Creator)</p>
      </li>
      <li>
        <p>Huksa Private Networks (Node.js dev role)</p>
      </li>
      <li>
        <p>JBL Technologies (Node.js dev role)</p>
      </li>
    </ul>
    <ul>
      <p>Unique Touch Solutions (2016 - 2017)</p>
      <li>
        <p>Associate Software Engineer/Node.js Developer</p>
      </li>
    </ul>
  </Wrapper>
)

export default WorkHistory

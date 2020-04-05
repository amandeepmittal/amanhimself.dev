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
`

const OpenSource = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="newsletter">
        ⚙️{' '}
      </span>
      Open Source
    </h3>
    <h4>Projects</h4>
    <ul>
      <li>
        <p>
          <a
            href="https://github.com/expo-community/expo-firebase-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            expo-firebase:
          </a>{' '}
          based on latest Expo SDK, provides a quicker way to start with Expo +
          Firebase projects.
        </p>
      </li>
      <li>
        <p>
          <a
            href="https://github.com/amandeepmittal/gatsby-bulma-quickstart"
            target="_blank"
            rel="noopener noreferrer"
          >
            gatsby-bulma-quickstart:
          </a>{' '}
          a quick Way to bootstrap your next Gatsby + Bulma site.
        </p>
      </li>
      <li>
        <p>
          <a
            href="https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            100DaysOfCode:
          </a>{' '}
          Twitter bot for{' '}
          <a
            href="https://twitter.com/_100DaysOfCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            #100DaysOfCode community
          </a>{' '}
          hosted by freeCodeCamp.
        </p>
      </li>
      <li>
        <p>
          <a
            href="https://github.com/amandeepmittal/projectEuler100-twitter-bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            ProjectEuler100:
          </a>{' '}
          Twitter bot for{' '}
          <a
            href="https://twitter.com/ProjectEuler100"
            target="_blank"
            rel="noopener noreferrer"
          >
            #ProjectEuler100 community
          </a>{' '}
          hosted by freeCodeCamp.
        </p>
      </li>
      <li>
        <p>
          <a
            href="https://github.com/amandeepmittal/awscertified-twitter-bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWSCertifiedBot:
          </a>{' '}
          Twitter bot for{' '}
          <a
            href="https://twitter.com/AWSCertifiedBot"
            target="_blank"
            rel="noopener noreferrer"
          >
            #AWSCertified community
          </a>{' '}
          hosted by freeCodeCamp.
        </p>
      </li>
    </ul>
    <h4>Contributions</h4>
    <ul>
      <p style={{ fontWeight: '600' }}>freeCodeCamp (2017- present)</p>
      <li>
        <p>
          Creator/Maintainer of{' '}
          <a
            href="https://twitter.com/_100DaysOfCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            #100DaysOfCode
          </a>{' '}
          Twitter bot followed by more than{' '}
          <span style={{ fontWeight: 'bold' }}>70k+ developers.</span>
        </p>
      </li>
      <p style={{ fontWeight: '600' }}>GatsbyJS</p>
      <li>
        <p>Creator of 4 starter/theme kits.</p>
      </li>
      <p style={{ fontWeight: '600' }}>Node.js</p>
      <li>
        <p>Contributor/Maintainer of NodeJS.org website.</p>
      </li>
    </ul>
  </Wrapper>
)

export default OpenSource

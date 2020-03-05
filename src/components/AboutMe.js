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

const AboutMe = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="work">
        👋{' '}
      </span>
      About me
    </h3>
    <h4>What I am up to</h4>
    <p>
      I am a software developer with a background in Computer Science and
      specializing in web and mobile technologies using the JavaScript ecosystem
      for past three years and currently working as a contract developer.
    </p>
    <p>
      These days I am enthusiastic about the world around React Native and Expo.
      {/* keen to learn new things and looking for opportunities in the same space
      (relocate or remote). */}
    </p>
    <h4>Me & Technical Writing</h4>
    <p>
      I started my blogging journey as tech writer at{' '}
      <a
        href="https://medium.com/@amanhimself"
        target="_blank"
        rel="noopener noreferrer"
      >
        Medium
      </a>{' '}
      where I've got over{' '}
      <a
        href="https://twitter.com/amanhimself/status/1142868697402318848"
        target="_blank"
        rel="noopener noreferrer"
      >
        1 Million views{' '}
        <span role="img" aria-label="tada">
          🎉
        </span>
        .
      </a>{' '}
      I love writing about code and specifically on modern JavaScript frameworks
      including Node.js, React, React Native and GraphQL.
    </p>
    <p>
      I've written over 100 articles and tutorials for{' '}
      <span style={{ fontWeight: 'bold' }}>
        25 developer publications and organizational blogs
      </span>
      . I have also been responsible to create a curriculum for an online
      educative learning platform known as Zeolearn on Nodejs.
    </p>
    <h4>Me & Open Source</h4>
    <p>
      I frequently contribute to Open Source community and have been active in
      #100DaysOfCode, freeCodeCamp, Node.js, and GatsbyJS.
    </p>
    <p>
      I've been awarded among{' '}
      <a
        href="https://medium.freecodecamp.org/announcing-our-freecodecamp-2018-top-contributor-award-winners-861da08a77e1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Top 200 Open Source Contributors
      </a>{' '}
      by freeCodeCamp.org in 2018.
    </p>

    <h4>Other stuff I am passionate about</h4>
    <p>
      When I am not writing code, or writing about code, I like to spend my time
      with books{' '}
      <a
        href="https://www.goodreads.com/author/show/17657541.Aman_Mittal"
        target="_blank"
        rel="noopener noreferrer"
      >
        (I'm on Goodreads
        <span role="img" aria-label="work">
          😬{' '}
        </span>
        ){' '}
      </a>{' '}
      , travel to places I've never been, meet new people and talk nerdy{' '}
      <span role="img" aria-label="work">
        🤓
      </span>
      .
    </p>
    <p>
      I am travelling since 2019, majorly to satisfy my wander lust and to
      attend tech conferences on{' '}
      <a
        href="https://twitter.com/amanhimself/status/1113687949860675584/photo/1"
        target="_blank"
        rel="noopener noreferrer"
      >
        React Native{' '}
      </a>
      &{' '}
      <a
        href="https://twitter.com/amanhimself/status/1203078103788068864/photo/2"
        target="_blank"
        rel="noopener noreferrer"
      >
        ReactJS{' '}
      </a>
      and it seems like I've got the travel bug{' '}
      <span role="img" aria-label="work">
        🐛
      </span>
      .
    </p>
  </Wrapper>
)

export default AboutMe

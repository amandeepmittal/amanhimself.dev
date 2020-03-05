import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    font-size: 16px;
  }
`

const Button = styled.div`
  h3 {
    margin: 0px;
    background-color: #52b351;
    border: 0px;
    padding: 5px;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    border-radius: 8px;
  }
  a {
    color: white;
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`

const Newsletter = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="newsletter">
        📨{' '}
      </span>
      My Weekly Newsletter
    </h3>
    <p>
      At least once a week, I roll out a newsletter for fellow developers to
      enhance their skills in Nodejs, Reactjs, React Native, Firebase, and
      GraphQL.
    </p>
    <p>
      I publish new articles every week and and you can stay up to date by
      joining <span style={{ fontWeight: ' bold' }}>950+ developers.</span>
    </p>
    <Button>
      <h3>
        <span role="img" aria-label="right">
          👉{' '}
        </span>
        <a
          href="https://tinyletter.com/amanhimself"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the newsletter here
        </a>
      </h3>
    </Button>
    <p style={{ marginTop: '10px' }}>
      As a <span style={{ fontWeight: 'bold' }}>Technical Writer</span> I've
      written for: freeCodeCamp, Hackernoon, Rising Stack, Codeburst.io,
      ZeoLearn.com, Art + Marketing, 42hire.com, ITNext, Eduonix, The Startup,
      JavaBeginnersTutorial.com, Crowdbotics, Alligator.io, Expo.io
      (Exposition), Heartbeat (Fritz.ai), Pusher, LevelUp Gitconnected, Better
      Programming, JScrambler, React Native Training, Instamobile, Sitepoint,
      Newline.co (by Fullstack.io), & LogRocket.
    </p>
    {/* <h4
      css={css`
        margin: 0px;
        background-color: #f3993e;
        border: 0px;
        padding: 10px;
        text-align: center;
        display: inline-block;
        font-size: 18px;
        border-radius: 8px;
      `}
    >
      <span role="img" aria-label="right">
        👉{' '}
      </span>
      <Link
        to="/blog"
        aria-label="go to all blog posts"
        css={css`
          color: white;
          &:hover {
            text-decoration: none;
            color: #503d81;
          }
        `}
      >
        All Blog Posts{' '}
      </Link>
    </h4> */}
  </Wrapper>
)

export default Newsletter

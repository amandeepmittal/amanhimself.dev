import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

// const Donation = () => (
//   <div>
//     <p>If you enjoy what I do</p>
//     <a href="https://ko-fi.com/amahimself" target="_blank">
//       <img
//         css={css`
//           border: 0px;
//           height: 36px;
//         `}
//         src="https://az743702.vo.msecnd.net/cdn/kofi2.png?v=2"
//         alt="Buy Me a Coffee at ko-fi.com"
//       />
//     </a>
//     <a href="https://patreon.com/amanhimself" target="_blank">
//       <img
//         css={css`
//           border: 0px;
//           height: 36px;
//         `}
//         src="https://az743702.vo.msecnd.net/cdn/kofi2.png?v=2"
//         alt="Buy Me a Coffee at ko-fi.com"
//       />
//     </a>
//   </div>
// )

const HireMe = () => (
  <div>
    <h2>
      {' '}
      <span role="img" aria-label="newsletter">
        🤝{' '}
      </span>
      Want to collaborate?
    </h2>
    <p>
      Would you like to collaborate on a project, app or work together in
      creating new course material for JavaScript ecosystem?
    </p>
    <a
      href="mailto:amanmittal.work@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        &:hover {
          color: green;
        }
      `}
    >
      Please drop me an email here.
    </a>
  </div>
)

const OpenSourceContributions = () => (
  <div>
    <h2>
      <span role="img" aria-label="newsletter">
        ⚙️{' '}
      </span>
      Open Source Contributions
    </h2>
    <ul>
      freeCodeCamp (2017- present)
      <li>
        Creator/Maintainer of{' '}
        <a
          href="https://twitter.com/_100DaysOfCode"
          target="_blank"
          rel="noopener noreferrer"
          css={css`
            &:hover {
              color: green;
            }
          `}
        >
          #100DaysOfCode
        </a>{' '}
        Twitter bot followed by more than{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          45k+ developers.
        </span>
      </li>
      GatsbyJS
      <li>Creator of 4 starter/theme kits.</li>
      Node.js
      <li>Contributor/Maintainer of NodeJS.org website.</li>
    </ul>
  </div>
)

const Appearances = () => (
  <div>
    <h2>
      <span role="img" aria-label="newsletter">
        🎧{' '}
      </span>
      Podcast Appearance
    </h2>
    <p>
      {' '}
      <span role="img" aria-label="right">
        👉{' '}
      </span>
      <a
        href="https://devchat.tv/react-round-up/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal/"
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          &:hover {
            color: green;
          }
        `}
      >
        React Round Up 006: Setting Up and Getting Used to Gatsby with Aman
        Mittal
      </a>
    </p>
  </div>
)

const TechnicalSkills = () => (
  <div
    css={css`
      h4 {
        line-height: 0.5em;
      }
    `}
  >
    <h2>
      <span role="img" aria-label="newsletter">
        🛠{' '}
      </span>
      Technical Skills
    </h2>
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
  </div>
)

const Newsletter = () => (
  <div>
    <h2>
      <span role="img" aria-label="newsletter">
        📨{' '}
      </span>
      My Weekly Newsletter
    </h2>
    <p>
      At least once a week, I roll out a newsletter for fellow developers to
      enahnce their skills in Nodejs, Reactjs, React Native, Firebase, and
      GraphQL.
    </p>
    <p>
      I publish new articles every week and and you can stay up to date by
      joining{' '}
      <span
        css={css`
          font-weight: bold;
        `}
      >
        750+ developers.
      </span>
    </p>
    <h3
      css={css`
        margin: 0px;
        background-color: #52b351;
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
      <a
        href="https://tinyletter.com/amanhimself"
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          color: white;
          &:hover {
            text-decoration: none;
            color: #503d81;
          }
        `}
      >
        Join the newsletter here
      </a>
    </h3>
    <p
      css={css`
        margin-top: 10px;
      `}
    >
      As a <span style={{ fontWeight: 'bold' }}>Technical Writer</span> I've
      written for: freeCodeCamp, Hackernoon, Rising Stack, Codeburst.io,
      ZeoLearn.com, Art + Marketing, 42hire.com, ITNext, Eduonix, The Startup,
      JavaBeginnersTutorial.com, Crowdbotics, Alligator.io, Expo.io
      (Exposition), Heartbeat (Fritz.ai), Pusher, LevelUp Gitconnected, Better
      Programming, JSCrambler & React Native Training.
    </p>
    <h4
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
    </h4>
  </div>
)

const WorkHistory = () => (
  <div>
    <h2>
      <span role="img" aria-label="work">
        👨‍💻{' '}
      </span>
      Work History
    </h2>
    <p>
      Currently, I am working as freelance/contract developer for 2 years on web
      applications.
    </p>
    <ul>
      Freelance/Contract (2017- present)
      <li>Crowdbotics (Full-Stack role, Technical Writer)</li>
      <li>Hearbeat (Technical Writer)</li>
      <li>Danco Solutions (Full-Stack role)</li>
      <li>Zeolearn (Node.js Course Curriculum Creator)</li>
      <li>Huksa Private Networks (Node.js dev role)</li>
      <li>JBL Technologies (Node.js dev role)</li>
    </ul>
    <ul>
      Unique Touch Solutions (2016 - 2017)
      <li>Associate Software Engineer/Node.js Developer</li>
    </ul>
  </div>
)

const Intro = () => (
  <div
    css={css`
      p {
        font-size: 16px;
        line-height: 1.8em;
        margin-bottom: 15px;
      }
      a {
        font-weight: bold;
      }
      h2 {
        color: #503d81;
      }
      ul {
        font-size: 18px;
      }
      li {
        font-size: 16px;
        line-height: 1.8em;
      }
    `}
  >
    <h2>
      <span role="img" aria-label="work">
        👋{' '}
      </span>
      About me
    </h2>
    <p>
      I am a software developer with a background in Computer Science and
      specializing in web and mobile technologies using the JavaScript
      ecosystem.
    </p>
    <p>
      I started my blogging journey in tech at{' '}
      <a
        href="https://medium.com/@amanhimself"
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          &:hover {
            color: green;
          }
        `}
      >
        Medium
      </a>{' '}
      where I've got over{' '}
      <a
        href="https://twitter.com/amanhimself/status/1142868697402318848"
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          &:hover {
            color: green;
          }
        `}
      >
        1 Million views{' '}
        <span role="img" aria-label="tada">
          🎉
        </span>
        .
      </a>{' '}
      I love writing about code and specifically on modern JavaScript frameworks
      including Node.js, React, React Native and GraphQL and share what I know.
    </p>
    <p>
      I've written over 100 articles and tutorials for{' '}
      <span
        css={css`
          font-weight: bold;
        `}
      >
        more than 20 online publications and organizational blogs
      </span>
      . I have also been responsible to create a curriculum for an online
      educative learning platform known as Zeolearn on Nodejs.
    </p>
    <p>
      I frequently contribute to Open Source community and have been active in
      #100DaysOfCode, freeCodeCamp, Node.js, and GatsbyJS. I've been awarded
      among{' '}
      <a
        href="https://medium.freecodecamp.org/announcing-our-freecodecamp-2018-top-contributor-award-winners-861da08a77e1"
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          &:hover {
            color: green;
          }
        `}
      >
        Top 200 Open Source Contributors
      </a>{' '}
      by freeCodeCamp.org in 2018.
    </p>
    <p>
      When I am not writing code, or writing about code, I love to{' '}
      <a
        href="https://www.goodreads.com/author/show/17657541.Aman_Mittal"
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          &:hover {
            color: green;
          }
        `}
      >
        read books,{' '}
      </a>{' '}
      or travel to places I've never been.
    </p>
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <WorkHistory />
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <TechnicalSkills />
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <OpenSourceContributions />
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <Appearances />
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <HireMe />
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <Newsletter />
  </div>
)

export default Intro

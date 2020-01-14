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

const TravelBug = () => (
  <div>
    <h2>
      {' '}
      <span role="img" aria-label="toolbox">
        ✈{' '}
      </span>
      My travels so far...
    </h2>
    <span role="img" aria-label="flags">
      {' '}
      🇦🇪🇵🇱🇨🇿🇦🇹🇸🇰🇧🇪🇳🇱🇩🇪{' '}
    </span>
  </div>
)

const CurrentlyUsing = () => (
  <div>
    <h2>
      {' '}
      <span role="img" aria-label="toolbox">
        🧰{' '}
      </span>
      Currently Using
    </h2>
    <ul>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Computer:
        </span>{' '}
        MacBook Air 2017
      </li>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Editor:
        </span>{' '}
        Visual Studio Code
      </li>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Static Site Generator:
        </span>{' '}
        <a
          href="https://www.gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GatsbyJS
        </a>
      </li>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Hosting:
        </span>{' '}
        <a
          href="https://www.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
      </li>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Syntax Highlighting:
        </span>{' '}
        <a href="http://prismjs.com/" target="_blank" rel="noopener noreferrer">
          PrismJS
        </a>
      </li>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Code Syntax Theme:
        </span>{' '}
        <a
          href="https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss"
          target="_blank"
          rel="noopener noreferrer"
        >
          fairyfloss
        </a>
        , Dracula
      </li>
      <li>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          Newsletter:
        </span>{' '}
        <a
          href="https://tinyletter.com/amanhimself"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tinyletter
        </a>
      </li>
    </ul>
  </div>
)

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
      css={css`
        &:hover {
          color: green;
        }
      `}
    >
      Please drop me an email here.{' '}
    </a>
  </div>
)

const OpenSource = () => (
  <div>
    <h2>
      <span role="img" aria-label="newsletter">
        ⚙️{' '}
      </span>
      Open Source
    </h2>
    <h4>Projects</h4>
    <ul>
      <li>
        <a
          href="https://github.com/amandeepmittal/expo-firebase"
          target="_blank"
          rel="noopener noreferrer"
        >
          expo-firebase:
        </a>{' '}
        based on latest Expo SDK, provides a quicker way to start with Expo +
        Firebase projects.
      </li>
      <li>
        <a
          href="https://github.com/amandeepmittal/gatsby-bulma-quickstart"
          target="_blank"
          rel="noopener noreferrer"
        >
          gatsby-bulma-quickstart:
        </a>{' '}
        a quick Way to bootstrap your next Gatsby + Bulma site.
      </li>
      <li>
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
      </li>
      <li>
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
      </li>
      <li>
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
      </li>
    </ul>
    <h4>Contributions</h4>
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
          59k+ developers.
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
      Guest Podcast Appearance
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
        React Round Up 006: Setting Up and Getting Used to Gatsby with Charles
        Max Wood, Cory House, Tara Manicsic and Kent C Dodds
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
      enhance their skills in Nodejs, Reactjs, React Native, Firebase, and
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
        850+ developers.
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
      Programming, JScrambler, React Native Training, Instamobile, Sitepoint &
      Newline.co (by Fullstack.io).
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
      Currently, I am working as freelance/contract developer on web
      applications and as a Technical Writer.
    </p>
    <ul>
      Freelance/Contract (2017- present)
      <li>Crowdbotics (Full-Stack role, Technical Writer, 2018 - Present)</li>
      <li>Hearbeat (Technical Writer, 2019 - Present)</li>
      <li>JSCrambler (Technical Writer, 2018 - Present)</li>
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
    <h4>What I am up to</h4>
    <p>
      I am a software developer with a background in Computer Science and
      specializing in web and mobile technologies using the JavaScript ecosystem
      for past three years and currently working as a contract developer.
    </p>
    <p>
      These days I am enthusiastic about the world around React Native and Expo,
      keen to learn new things and looking for opportunities in the same space
      (relocate or remote).
    </p>
    <h4>Me & Technical Writing</h4>
    <p>
      I started my blogging journey as tech writer at{' '}
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
      including Node.js, React, React Native and GraphQL.
    </p>
    <p>
      I've written over 100 articles and tutorials for{' '}
      <span
        css={css`
          font-weight: bold;
        `}
      >
        24 developer publications and organizational blogs
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

    <h4>Other stuff I am passionate about</h4>
    <p>
      When I am not writing code, or writing about code, I like to spend my time
      with books{' '}
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
        (I'm on Goodreads 😬){' '}
      </a>{' '}
      , travel to places I've never been, meet new people and talk nerdy 🤓.
    </p>
    <p>
      I am travelling since 2019, majorly, to attend tech conferences on{' '}
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
      and it seems like I've got the travel bug 🐛.
    </p>
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <Newsletter />
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
    <OpenSource />
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
    <CurrentlyUsing />
    <hr
      css={css`
        margin: 10px;
      `}
    />
    <TravelBug />
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
  </div>
)

export default Intro

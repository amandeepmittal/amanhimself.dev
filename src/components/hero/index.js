import React from 'react';
import { Link } from 'gatsby';

import * as styles from './hero.module.scss';

const Hero = () => {
  return (
    <article className={styles.hero}>
      <header>
        <div>
          <h1>
            <span role="img" aria-label="wave emoji">
              👋{' '}
            </span>
            Hey, I'm Aman.
          </h1>
          <p className={styles.subtitle}>
            I'm a <strong>software developer</strong> and a{' '}
            <strong>technical writer</strong>. Right now, I'm working as
            Developer Advocate{' '}
            <span role="img" aria-label="avocado emoji">
              🥑{' '}
            </span>
            at{' '}
            <a
              href="https://draftbit.com/"
              rel="noopener noreferrer"
              aria-label="Draftbit home page"
            >
              Draftbit
            </a>
            .
          </p>
          <p className={styles.subtitle}>
            Here, I share through <Link to="/blog">my writing </Link> my
            experience in software development and everything I learn about
            Node.js, React, React Native and Developer Advocacy.
          </p>
          <p className={styles.subtitle}>
            I've been writing online since 2017, mostly on web and mobile
            development. I've written over{' '}
            <a
              href="https://amanhimself.dev/about#technical-writing"
              rel="noopener noreferrer"
              aria-label="About me page"
            >
              150 articles for more than 20 publications
            </a>{' '}
            and organizations across the internet.
          </p>
          <p className={styles.heroButtons}>
            <a
              href="https://amanhimself.substack.com/subscribe"
              className={styles.button}
              rel="noopener noreferrer"
              aria-label="Substack Newsletter page redirect"
            >
              Newsletter
            </a>
            <a
              href="mailto:amanmittal.work@gmail.com"
              className={styles.button}
              rel="noopener noreferrer"
              aria-label="Email Address"
            >
              Email
            </a>
            <a
              href="https://twitter.com/amanhimself?ref_src=twsrc%5Etfw"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
              className="twitter-follow-button"
              data-size="large"
            >
              Twitter
            </a>
          </p>
        </div>
      </header>
    </article>
  );
};

export default Hero;

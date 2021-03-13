import React from 'react';
import styled from 'styled-components';
import { down } from 'styled-breakpoints';
import { StaticImage } from 'gatsby-plugin-image';

import { config } from '../../helpers';

const HeroWrapper = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  ${down('sm')} {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  ${down('sm')} {
    text-align: center;
  }
`;

const HeroText = styled.div`
  display: grid;
  text-align: center;
  font-size: 1rem;
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 0.75rem;
  font-size: 1.25rem;
  a:not(.anchor) {
    color: rgba(0, 0, 0, 0.8);
    box-shadow: inset 0 -2px ${({ theme }) => theme.colors.primary};
    &:hover {
      box-shadow: inset 0 -25px 0 ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Hero = () => {
  return (
    <>
      <HeroWrapper>
        <ImageWrapper>
          <StaticImage
            src="../../images/avatar.jpg"
            alt="An avatar"
            layout="constrained"
            width={200}
            height={200}
            placeholder="blurred"
            style={{ borderRadius: 100 }}
          />
        </ImageWrapper>
        <HeroText>
          <h2>
            <span role="img" aria-label="wave emoji">
              👋{' '}
            </span>
            Hey, I'm Aman <span>also know as </span>
            <a
              href={config.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Account"
            >
              @amanhimself
            </a>
          </h2>
          <p>
            <span role="img" aria-label="laptop emoji">
              💻{' '}
            </span>
            software developer & technical writer
          </p>
        </HeroText>
      </HeroWrapper>
      <ContentWrapper>
        <p>Thanks for dropping by!</p>
        <p>
          This website is a collection of all posts I've written in my journey
          of learning web and mobile development. You can read the{' '}
          <a
            href="https://amanhimself.dev/blog"
            rel="noopener noreferrer"
            aria-label="Blog Link"
          >
            blog here
          </a>{' '}
          or learn more{' '}
          <a
            href="https://amanhimself.dev/about"
            rel="noopener noreferrer"
            aria-label="About me page"
          >
            about me
          </a>
          .
        </p>
        <p>
          I send out an email when I create something new. For more info check
          out the{' '}
          <a
            href="https://amanhimself.substack.com/"
            rel="noopener noreferrer"
            aria-label="About me page"
          >
            newsletter here
          </a>
          .
        </p>
      </ContentWrapper>
    </>
  );
};

export default Hero;

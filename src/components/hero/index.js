import React from 'react';
import styled from 'styled-components';
import { down } from 'styled-breakpoints';
import { StaticImage } from 'gatsby-plugin-image';

import { config } from '../../helpers';
import { Twitter, GitHub, Devto, Medium, Instagram } from '../social-icons';
import Divider from '../divider';

const HeroWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  border-radius: 4px;
  border: 2px solid palevioletred;
  padding: 10px;
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
    font-size: 1.2rem;
    margin-top: 0.15rem;
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

const SocialIconsWrapper = styled.footer`
  text-align: center;
  svg {
    margin: 0 ${({ theme }) => theme.spacing[2]};
    height: ${({ theme }) => theme.spacing[6]};
    &:hover {
      transform: translateY(-2px);
      transition: transform 0.35s;
    }
  }
  a {
    display: inline-block;
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
            Hey, I'm Aman
          </h2>
          <p>
            <span role="img" aria-label="laptop emoji">
              💻{' '}
            </span>
            software developer,{' '}
            <span role="img" aria-label="avocado emoji">
              🥑{' '}
            </span>
            developer advocate <a href="http://draftbit.com/">@Draftbit</a> &
            tech writer
          </p>
          <SocialIconsWrapper>
            <a
              href={config.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Account"
            >
              <Twitter />
            </a>
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Account"
            >
              <GitHub />
            </a>
            <a
              href={config.devto}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dev.to Account"
            >
              <Devto />
            </a>
            <a
              href={config.medium}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium Account"
            >
              <Medium />
            </a>
            <a
              href={config.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Account"
            >
              <Instagram />
            </a>
          </SocialIconsWrapper>
        </HeroText>
      </HeroWrapper>
      <ContentWrapper>
        <p>
          <span role="img" aria-label="seeding emoji">
            🌱{' '}
          </span>
          This is a personal blog where I write about Node.js, Reactjs, React
          Native and Expo, Developer Advocacy, Tech writing and sometimes just
          share my thoughts.{' '}
        </p>
        <p>
          I've been writing online since 2017, mostly on web and mobile
          development. In total, I've written over{' '}
          <span
            className="posts-number"
            style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
          >
            150
          </span>{' '}
          articles for more than 20+ publications and organizations across the
          internet. This site is a collection of articles I've published here or
          elsewhere.
        </p>
        <p>
          Read the{' '}
          <strong>
            <a
              href="https://amanhimself.dev/blog"
              rel="noopener noreferrer"
              aria-label="Blog Link"
            >
              blog
            </a>
          </strong>{' '}
          here or read more{' '}
          <a
            href="https://amanhimself.dev/about"
            rel="noopener noreferrer"
            aria-label="About me page"
          >
            <strong>about</strong>{' '}
          </a>
          me.
        </p>
        <p>
          <span role="img" aria-label="love letter emoji">
            💌{' '}
          </span>
          I send out an email when I create something new. For more info check
          out the{' '}
          <a
            href="https://amanhimself.substack.com/"
            rel="noopener noreferrer"
            aria-label="About me page"
          >
            <strong>newsletter</strong>
          </a>
          .
        </p>
      </ContentWrapper>
    </>
  );
};

export default Hero;

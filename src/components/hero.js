import React from 'react';
import Image from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaGithubSquare,
  FaMedium,
  FaDev
} from 'react-icons/fa';

import SocialLinkContainer from './social-link-container';

const query = graphql`
  {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const SocialIconsList = () => {
  return (
    <div style={{ justifyContent: 'center', marginTop: '1rem' }}>
      <SocialLinkContainer href="https://twitter.com/amanhimself">
        <FaTwitterSquare style={{ color: '#5E37C8', width: 32, height: 32 }} />
      </SocialLinkContainer>
      <SocialLinkContainer href="https://www.instagram.com/amanhimselfcodes/">
        <FaInstagramSquare
          style={{ color: '#5E37C8', width: 32, height: 32 }}
        />
      </SocialLinkContainer>
      <SocialLinkContainer href="https://github.com/amandeepmittal">
        <FaGithubSquare style={{ color: '#5E37C8', width: 32, height: 32 }} />
      </SocialLinkContainer>
      <SocialLinkContainer href="https://medium.com/@amanhimself">
        <FaMedium style={{ color: '#5E37C8', width: 32, height: 32 }} />
      </SocialLinkContainer>
      <SocialLinkContainer href="https://dev.to/amanhimself">
        <FaDev style={{ color: '#5E37C8', width: 32, height: 32 }} />
      </SocialLinkContainer>
    </div>
  );
};

const Hero = () => {
  const {
    file: {
      childImageSharp: { fluid }
    }
  } = useStaticQuery(query);

  return (
    <header className="hero">
      <div className="hero-center">
        <article className="hero-info">
          <h3>Hi! I'm Aman Mittal</h3>
          <div style={{ marginTop: '1rem' }}>
            <p>{`👨‍💻`} I'm a Software Developer & a Technical Writer.</p>
            <p>
              {`📝`} I mostly write posts and tutorials on Node.js, Reactjs
              <br /> and React Native.
            </p>
          </div>
          <SocialIconsList />
          <button className="btn" style={{ marginTop: '-0.05rem' }}>
            <span role="img" aria-label="love-letter">
              💌
            </span>{' '}
            Join the newsletter
          </button>
        </article>
        <Image
          fluid={fluid}
          className="hero-img"
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
      </div>
    </header>
  );
};

export default Hero;

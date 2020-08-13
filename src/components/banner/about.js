import React from 'react';
import Image from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaGithubSquare,
  FaMedium,
  FaDev
} from 'react-icons/fa';

import SocialLinkContainer from '../social-link-container';
import Title from './title';

const Wrapper = styled.div`
  text-align: center;
  p {
    color: var(--clr-grey-4);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .img {
    border-radius: 50%;
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

const About = () => {
  const data = useStaticQuery(query);
  return (
    <Wrapper>
      <Title title="Written by" />
      <Image fixed={data.person.childImageSharp.fixed} className="img" />
      <div>
        <p>Aman Mittal</p>
        <SocialIconsList />
      </div>
    </Wrapper>
  );
};

const query = graphql`
  {
    person: file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default About;

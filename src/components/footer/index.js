import React from 'react';
import styled from 'styled-components';
import { down } from 'styled-breakpoints';

import { config } from '../../helpers';
import { Twitter, GitHub, Devto, Medium, Instagram } from '../social-icons';

const FooterWrapper = styled.footer`
  text-align: center;
  margin: ${({ theme }) => theme.spacing[8]} 0;
  hr {
    margin: ${({ theme }) => theme.spacing[16]} 0;
    opacity: 0.5;
    color: var(--colour-secondary, ${({ theme }) => theme.colors.gray});
  }
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
  .footer-content {
    color: var(--colour-secondary, ${({ theme }) => theme.colors.darkGray});
    margin-top: ${({ theme }) => theme.spacing[6]};
    margin-bottom: ${({ theme }) => theme.spacing[0]};
    ${down('sm')} {
      margin-bottom: ${({ theme }) => theme.spacing[1]};
      font-size: 12px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
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
      <p className="footer-content">
        &copy;{`${new Date().getFullYear()} Aman Mittal · All Rights Reserved`}
      </p>
    </FooterWrapper>
  );
};

export default Footer;

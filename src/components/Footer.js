import React from 'react';
import GatsbyLogo from '../assets/thumbs/gatsby.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>
          &copy;{new Date().getFullYear()} Aman Mittal v7 - All Rights Reserved
          |{' '}
          <a
            href="https://ko-fi.com/amanhimself"
            target="_blank"
            rel="noreferrer"
          >
            Buy me a Coffee
          </a>{' '}
          |{' '}
          <a
            href="https://tinyletter.com/amanhimself/"
            target="_blank"
            rel="noreferrer"
          >
            Newsletter
          </a>
        </p>
        <p>
          Powered by{' '}
          <img
            alt="gatsby-logo"
            src={GatsbyLogo}
            style={{ width: 15, height: 15, marginTop: '1rem' }}
          />{' '}
          Gatsby
        </p>
      </div>
    </footer>
  );
};

export default Footer;

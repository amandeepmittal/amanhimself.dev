import React from 'react';
import { Link } from 'gatsby';
import kofiIcon from '../../assets/kofi.png';

const NavLinks = ({ styleClass }) => {
  return (
    <ul className={styleClass}>
      <li>
        <Link to="/about" className="page-link">
          About
        </Link>
      </li>
      <li>
        <Link to="/blog" className="page-link">
          Blog
        </Link>
      </li>
      <li>
        <a
          href="https://tinyletter.com/amanhimself/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="page-link">Newsletter</span>
        </a>
      </li>
      <li>
        <a
          href="https://ko-fi.com/amanhimself"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={kofiIcon}
            alt="Buy me a coffee"
            style={{
              marginTop: '5px',
              width: '50px',
              height: '50px'
            }}
          />
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;

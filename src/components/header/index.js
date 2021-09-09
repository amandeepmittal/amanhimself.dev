import React from 'react';
import { Link } from 'gatsby';

import * as styles from './header.module.scss';
import AvatarImg from '../../images/avatar.jpg';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Speaking', path: '/speaking' },
  { name: 'Newsletter', path: 'https://amanhimself.substack.com/' }
  // TODO: Remove Contact page from the navbar and add it to homepage
  // { name: 'Contact', path: '/contact' }
];

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/">
            <a className={styles.logo}>
              <img
                src={AvatarImg}
                width="45"
                height="45"
                alt="Aman Mittal logo"
              />
            </a>
          </Link>
          <nav className={styles.nav}>
            <ol className={styles.links}>
              {links.map(({ name, path }) => (
                <li key={path} className={styles.link}>
                  <Link to={path}>{name}</Link>
                </li>
              ))}
            </ol>
          </nav>
          {/* IF ever add theme, theme changer component will go here */}
        </div>
      </header>
      {/* To add more spacing below header, add the empty component here */}
    </>
  );
};

export default Header;

import React from 'react';

import {
  SiMedium,
  SiTwitter,
  SiGithub,
  SiInstagram,
  SiHashnode,
  SiRss
} from 'react-icons/si';
import { FaDev } from 'react-icons/fa';

import * as styles from './footer.module.scss';
import { config } from '../../helpers';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href={config.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter Account"
      >
        <SiTwitter size={28} color="#1DA1F2" />
      </a>
      <a
        href={config.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Account"
      >
        <SiGithub size={28} color="##14171A" />
      </a>
      <a
        href={config.devto}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Dev.to Account"
      >
        <FaDev size={30} color="##14171A" />
      </a>
      <a
        href={config.medium}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Medium Account"
      >
        <SiMedium size={28} color="##14171A" />
      </a>
      <a
        href="https://amanhimself.hashnode.dev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Account"
      >
        <SiHashnode size={28} color="#405DE6" />
      </a>
      <a
        href={config.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Account"
      >
        <SiInstagram size={28} color="#E1306C" />
      </a>
      <a
        href="https://amanhimself.dev/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RSS feed"
      >
        <SiRss size={28} color="#F77737" />
      </a>
      <p className={styles.footerContent}>
        &copy;&nbsp; 2019-
        {`${new Date().getFullYear()} Aman Mittal · All Rights Reserved`}
      </p>
    </footer>
  );
};

export default Footer;

import React from 'react';

import * as styles from './infocard.module.scss';
import {
  ExpoIcon,
  ReactIcon,
  FirebaseIcon,
  GitHub,
  YoutubeIcon,
  PodcastIcon
} from '../social-icons';

const InfoCard = ({
  title,
  href,
  description = false,
  reactIcon = false,
  expoIcon = false,
  firebaseIcon = false,
  githubIcon = false,
  youtubeIcon = false,
  podcastIcon = false
}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li key={title}>
          <a href={`${href}`}>
            <p
              className={styles.title}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              {' '}
              <span style={{ paddingRight: '12px' }}>
                {expoIcon && <ExpoIcon />}
                {reactIcon && <ReactIcon />}
                {firebaseIcon && <FirebaseIcon />}
                {githubIcon && <GitHub />}
                {youtubeIcon && <YoutubeIcon />}
                {podcastIcon && <PodcastIcon />}
              </span>
              {title}
            </p>
            <p className={styles.summary}>{description}</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default InfoCard;

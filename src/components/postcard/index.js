import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './postcard.module.scss';

const PostCard = ({
  post: {
    id,
    timeToRead,
    fields: { slug },
    frontmatter: { thumbnail, date, title, tags }
  }
}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li key={id}>
          <a href={`${slug}`}>
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
                <GatsbyImage
                  image={thumbnail.childImageSharp.gatsbyImageData}
                  alt="thumbnail"

                  // style={{ display: 'inline-block' }}
                />
              </span>
              {title}
            </p>
            {/* {summary ? <p className={styles.summary}>{summary}</p> : null} */}
            <p className={styles.meta}>
              <p className={styles.datetime}>
                Published on {date} &middot;{' '}
                <span role="img" aria-label="left hand pointer emoji">
                  ☕️
                </span>{' '}
                {timeToRead} min
              </p>
            </p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PostCard;

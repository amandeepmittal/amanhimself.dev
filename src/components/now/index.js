import React from 'react';

import * as styles from './now.module.scss';

const Now = ({ data }) => {
  const { html } = data;
  return (
    <div className={styles.wrapper}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Now;

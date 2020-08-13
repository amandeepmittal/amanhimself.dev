import React from 'react';

const customUl = ({ children }) => {
  return (
    <ul
      style={{
        listStyleType: 'disc',
        listStyleColor: 'var(--clr-grey-3)',
        lineHeight: '2rem',
        margin: '1rem',
        padding: '0 1rem',
        color: 'var(--clr-grey-3)',
        fontSize: '1.1rem'
      }}
    >
      {children}
    </ul>
  );
};

export default customUl;

import React from 'react';

const Code = ({ children }) => {
  return (
    <code
      style={{
        background: 'var(--clr-grey-10)',
        color: 'var(--clr-grey-3)',
        padding: '0.3rem',
        borderRadius: '0.5rem'
      }}
    >
      {children}
    </code>
  );
};

export default Code;

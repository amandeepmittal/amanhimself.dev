import React from 'react';

const myH2 = ({ children }) => {
  return (
    <h2
      style={{
        margin: '2rem 0',
        color: 'var(--clr-grey-5)'
      }}
    >
      {children}
    </h2>
  );
};

const myH4 = props => {
  return (
    <h4 style={{ margin: '2rem 0', color: 'var(--clr-primary-5)' }}>
      {props.children}
    </h4>
  );
};

export { myH2, myH4 };

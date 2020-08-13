import React from 'react';
import styled from 'styled-components';

import Title from './title';

const Wrapper = styled.div`
  /* text-align: center; */
  .category {
    font-size: 1rem;
    color: var(--clr-grey-5);
    text-transform: capitalize;
    display: block;
    padding: 0.5rem 0 0.5rem 1rem;
    letter-spacing: var(--spacing);
    transition: var(--transition);
    border-radius: var(--radius);
  }
  .category:hover {
    background: var(--clr-primary-10);
  }
`;

const StayInTouch = () => {
  return (
    <Wrapper>
      <Title title="Stay in touch" />
      <ul className="categories">
        <li>
          <a
            href="https://tinyletter.com/amanhimself/"
            className="category"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span role="img" aria-label="letter">
              💌
            </span>{' '}
            Newsletter
          </a>
        </li>
        <li>
          <a
            href="https://ko-fi.com/amanhimself"
            className="category"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span role="img" aria-label="letter">
              ☕
            </span>{' '}
            Buy me a Coffee
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default StayInTouch;

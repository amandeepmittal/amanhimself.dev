import React from 'react';
import styled from 'styled-components';
// import { RiTwitterLine } from 'react-icons/ri';

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

const Share = ({ sharePostSlug, postTitle }) => {
  const twitterShare = `http://twitter.com/share?text=${encodeURIComponent(
    postTitle
  )}&url=https://amanhimself.dev/${sharePostSlug}/&via=amanhimself`;

  return (
    <Wrapper>
      <Title title="Share" />
      <ul className="categories">
        <li>
          <a
            href={twitterShare}
            className="category"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Share;

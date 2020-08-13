import React from 'react';
import styled from 'styled-components';

import Categories from '../categories';
import Title from './title';

const Wrapper = styled.div`
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

const BannerCategories = () => {
  return (
    <Wrapper>
      <Title title="categories" />
      <Categories />
    </Wrapper>
  );
};

export default BannerCategories;

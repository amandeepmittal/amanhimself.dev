import React from 'react';
import styled from 'styled-components';

import About from './about';
// import Recent from './recent';
import BannerCategories from './banner-categories';
import StayInTouch from './stay-in-touch';
import Share from './share';

const Banner = ({ sharePostSlug, postTitle }) => {
  return (
    <Wrapper>
      <About />
      <Share sharePostSlug={sharePostSlug} postTitle={postTitle} />
      <BannerCategories />
      <StayInTouch />
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: grid;
  grid-template-columns: 300px;
  justify-content: center;
  row-gap: 1rem;
  margin-top: 5rem;
  background: var(--clr-grey-10);
  padding: 1rem;
  border-radius: 1rem;
  @media (min-width: 576px) {
    & {
      grid-template-columns: repeat(auto-fit, 200px);
      column-gap: 3rem;
    }
  }
`;

export default Banner;

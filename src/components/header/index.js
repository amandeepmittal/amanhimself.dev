import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { down } from 'styled-breakpoints';

import { config } from '../../helpers';
import LinkButton from '../link-button';

const StyledNav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: 0.75rem;
  margin-top: 1rem;
  ${down('sm')} {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    line-height: 1.5rem;
    column-gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${down('sm')} {
    font-size: 14px;
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem;
  a {
    display: inline-block;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LinkButton to="/" gatsby>
        Aman Mittal
      </LinkButton>
      <StyledNav>
        <NavLink to="/blog">Blog</NavLink>
        <span>|</span>
        <NavLink to="/about">About</NavLink>
        <span>|</span>
        <NavLink to="/speaking">Speaking</NavLink>
        <span>|</span>
        <NavLink to="/uses">Uses</NavLink>
        <span>|</span>
        <NavLink to={config.newsletter}>Newsletter</NavLink>
        <span>|</span>
        <NavLink to="/contact">Contact</NavLink>
        {/* <span>|</span>
        <NavLink to={config.kofi}>
          Buy me coffee{' '}
          <span role="img" aria-label="coffee emoji">
            ☕️
          </span>
        </NavLink> */}
      </StyledNav>
    </HeaderWrapper>
  );
};

export default Header;

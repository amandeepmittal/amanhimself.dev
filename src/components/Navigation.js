import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: #503d81;
  box-shadow: 1px 2px 18px rgba(80, 61, 129, 0.5);
`;

const NavContainer = styled.div`
  padding: 0 1.4rem;
  height: 56px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: height 0.3s ease;
  align-items: center;
  justify-content: center;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
`;

const BrandName = styled(Link)`
  margin-right: 1.5rem;

  font-weight: 500;
  color: white;
  text-decoration: none;
  line-height: 1.2;
  text-align: center;
  padding: 0.75rem;
  &:hover {
    border-radius: 0.4rem;
    color: white;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledLink = styled(Link)`
  margin-right: 1.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  line-height: 1.2;
  text-align: center;
  padding: 0.75rem;
  &:hover {
    border-radius: 0.4rem;
    color: white;
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default function Navigation({ menuLinks }) {
  return (
    <NavBar>
      <NavContainer>
        <Brand>
          <BrandName to='/'>Aman Mittal</BrandName>
          <Links>
            {menuLinks.map(link => (
              <StyledLink key={link.name} to={link.link}>
                {link.name}
              </StyledLink>
            ))}
          </Links>
        </Brand>
      </NavContainer>
    </NavBar>
  );
}

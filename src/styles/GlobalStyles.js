import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const GlobalStylesWrapper = createGlobalStyle`

  body {
    background-color: #f9fafb;
    font-family: 'Source Sans Pro', sans-serif;
    ${breakpoint('desktop')`
      font-size: 1.4rem;
    `}

    ${breakpoint('tablet')`
      font-size: 1.2rem;
    `}

    ${breakpoint('mobile')`
      font-size: 0.8rem;
    `}
    
    /* text-align: center; */
  }
`;

export const Container = styled.div`
  max-width: 760px;
  padding: 0 1.5rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Box = styled.div`
  margin-top: 30px;
`;

export const Heading = styled.h1`
  margin-top: 0;
  color: #444;

   ${breakpoint('mobile')`
      font-weight: 500;
      font-size: 1rem;
    `} 
    
    ${breakpoint('tablet')`
      font-weight: 500;
      font-size: 1.6rem;  
  `} 
  
  ${breakpoint('desktop')`
      font-weight: 600;
      font-size: 2.2rem;
    `}
`;

export const SubTitle = styled.p`
  margin-top: 20px;
  color: #718096;
  font-weight: 500;
`;

export const Text = styled.p`
  color: #718096;
  margin-bottom: 1rem;

  a {
    text-decoration: underline;
    text-decoration-color: #503d81;
    color: #503d81;
    font-weight: 700;
    &:hover {
      font-weight: 700;
      text-decoration: underline;
      color: #718096;
      text-decoration-color: #718096;
    }
  }
`;

export const ListLink = styled.a`
  text-decoration: underline;
  text-decoration-color: #503d81;
  color: #503d81;
  font-weight: 700;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    color: #718096;
    text-decoration-color: #718096;
  }
`;

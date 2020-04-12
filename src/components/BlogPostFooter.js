import React from 'react'
import styled from 'styled-components'
import avatar from '../images/logo.jpg'

const FlexAuthor = styled.div`
  display: flex;
  align-items: 'center';
  background: ${props => props.theme.color.primary.purple};
  padding: 10px;
  margin-top: 30px;
`

const FlexAvatar = styled.div``

const Img = styled.img`
  max-width: 150px;
  margin-right: 2rem;
  margin-top: 2rem;
  margin-bottom: 0;
  border-radius: 50%;
  @media (max-width: ${props => props.theme.screen.sm}) {
    max-width: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
`

const FlexText = styled.p`
  font-size: 16px;
  color: ${props => props.theme.color.light.accent100};
`

const ButtonContainer = styled.div`
  background-color: #52b351;
  border: 0px;
  padding: 8px;
  text-align: center;
  display: inline-block;
  border-radius: 8px;
  font-size: 16px;
  @media (max-width: ${props => props.theme.screen.sm}) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`

const ButtonText = styled.a`
  color: ${props => props.theme.color.light.accent100};
  &:hover {
    text-decoration: none;
  }
`

const CoffeeButtonContainer = styled.div`
  background-color: #42abe0;
  border: 0px;
  padding: 8px;
  text-align: center;
  display: inline-block;
  border-radius: 8px;
  font-size: 16px;
  margin-left: 10px;
`

const BlogPostFooter = () => (
  <FlexAuthor>
    <FlexAvatar>
      <Img src={avatar} />
    </FlexAvatar>
    <div>
      <FlexText>
        I'm <strong style={{ color: 'white' }}>Aman</strong>
        {`
           working as an independent fullstack developer with technologies such as Node.js, ReactJS, and React Native.
           I try to document and write tutorials to help JavaScript, Web and Mobile developers.
        `}
      </FlexText>
      <ButtonContainer>
        <ButtonText
          href="https://tinyletter.com/amanhimself"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span role="img" aria-label="letter">
            💌{' '}
          </span>
          Subscribe & join 1000+ devs
        </ButtonText>
      </ButtonContainer>
      <CoffeeButtonContainer>
        <ButtonText
          href="https://ko-fi.com/amanhimself"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span role="img" aria-label="coffee">
            ☕{' '}
          </span>
          Buy me a coffee
        </ButtonText>
      </CoffeeButtonContainer>
    </div>
  </FlexAuthor>
)

export default BlogPostFooter

import React from 'react'
import styled from 'styled-components'
import Avatar from '../images/logo.jpg'
import NewsletterButton from './newsletterButton'
import SocialIcon from './socialIcon'
import {
  FaGithub,
  FaTwitter,
  FaMedium,
  FaDev,
  FaPatreon,
  FaPaypal,
  FaMugHot
} from 'react-icons/fa'

const LeadContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.light.accent100};
  margin-top: 20px;
  margin-left: 20px;
`

const InfoContainer = styled.div`
  flex: 2;
  p {
    color: ${props => props.theme.color.light.accent100};
    max-width: 450px;
    font-size: 18px;
    font-weight: 300;
  }
`

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

const NewsletterContainer = styled.div`
  flex: 2;
  p {
    color: ${props => props.theme.color.light.accent100};
    max-width: 450px;
    font-size: 18px;
    font-weight: 300;
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    display: none;
  }
`

const CenterDiv = styled.div`
  text-align: center;
`

const HeaderIntro = () => (
  <LeadContainer>
    <InfoContainer>
      <h3>
        <span role="img" aria-label="wave">
          👋{' '}
        </span>
        Hi, I'm Aman Mittal
      </h3>
      <p>
        I am a software developer working as a contract developer and writing
        about Node.js, Reactjs and React Native development.
      </p>
      <div>
        <SocialIcon href="https://twitter.com/amanhimself">
          <FaTwitter style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://medium.com/@amanhimself">
          <FaMedium style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://github.com/amandeepmittal">
          <FaGithub style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://dev.to/amanhimself">
          <FaDev style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://patreon.com/amanhimself">
          <FaPatreon style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://paypal.me/amanhimself">
          <FaPaypal style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://ko-fi.com/amanhimself">
          <FaMugHot style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
      </div>
    </InfoContainer>
    <NewsletterContainer>
      <CenterDiv>
        <Img src={Avatar} alt="profile image" />
        <NewsletterButton />
      </CenterDiv>
    </NewsletterContainer>
  </LeadContainer>
)

export default HeaderIntro

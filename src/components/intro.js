import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import {
  FaGithub,
  FaTwitter,
  FaMedium,
  FaDev,
  FaInstagram
} from 'react-icons/fa';

import avatar from '../images/avatar.jpg';
import { Box, Heading, SubTitle, Text } from '../styles/GlobalStyles';
import SocialIcon from './SocialIcon';

const Row = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  ${breakpoint('mobile')`
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 48px;
  `}

  ${breakpoint('desktop')`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 65px;
  `}
`;

const TwitterIcon = styled(FaTwitter)`
  ${breakpoint('mobile')`
  width: 20px;
  height: 20px; 
  color: #fff;   
  padding: 3px;
  border-radius: 4px;
  background-color: #444;
  `}

  ${breakpoint('desktop')`
  width: 26px;
  height: 26px;    
  color: #fff;   
  padding: 6px;
  border-radius: 4px;
  background-color: #444;
  `}
`;

const GithubIcon = styled(FaGithub)`
  ${breakpoint('mobile')`
  width: 20px;
  height: 20px; 
  color: #fff;   
  padding: 3px;
  border-radius: 4px;
  background-color: #444;
  `}

  ${breakpoint('desktop')`
  width: 26px;
  height: 26px;  
  color: #fff;   
  padding: 6px;
  border-radius: 4px;
  background-color: #444;
  `}
`;

const MediumIcon = styled(FaMedium)`
  ${breakpoint('mobile')`
  width: 20px;
  height: 20px; 
  color: #fff;   
  padding: 3px;
  border-radius: 4px;
  background-color: #444;
  `}

  ${breakpoint('desktop')`
  width: 26px;
  height: 26px;   
  color: #fff;   
  padding: 6px;
  border-radius: 4px;
  background-color: #444;
  `}
`;

const DevIcon = styled(FaDev)`
  ${breakpoint('mobile')`
  width: 20px;
  height: 20px; 
  color: #fff;   
  padding: 3px;
  border-radius: 4px;
  background-color: #444;
  `}

  ${breakpoint('desktop')`
  width: 26px;
  height: 26px; 
  color: #fff;   
  padding: 6px;
  border-radius: 4px;
  background-color: #444;
  `}
`;

const InstagramIcon = styled(FaInstagram)`
  ${breakpoint('mobile')`
  width: 20px;
  height: 20px; 
  color: #fff;   
  padding: 3px;
  border-radius: 4px;
  background-color: #444;
  `}

  ${breakpoint('desktop')`
  width: 26px;
  height: 26px; 
  color: #fff;   
  padding: 6px;
  border-radius: 4px;
  background-color: #444;
  `}
`;

export default function Intro() {
  return (
    <Box>
      <Row style={{ flex: 1 }}>
        <Avatar src={avatar} alt='amanhimself' />
        <div style={{ marginLeft: '15px' }}>
          <Heading>{`👋 Hi! I'm Aman Mittal`}</Heading>
          <div style={{ marginLeft: '10px' }}>
            <SocialIcon href='https://twitter.com/amanhimself'>
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href='https://www.instagram.com/amanhimselfcodes/'>
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href='https://github.com/amandeepmittal'>
              <GithubIcon />
            </SocialIcon>
            <SocialIcon href='https://medium.com/@amanhimself'>
              <MediumIcon />
            </SocialIcon>
            <SocialIcon href='https://dev.to/amanhimself'>
              <DevIcon />
            </SocialIcon>
          </div>
        </div>
      </Row>
      <SubTitle>
        Independent Contract Developer and Technical Writer focusing on Node.js,
        React and React Native.
      </SubTitle>
      <Text>
        I've written over 100+ posts on documenting my learning with web and
        mobile technologies. You can read them on my{' '}
        <a href='https://amanhimself.dev/tutorials'>blog</a>.
      </Text>
      <Text>
        If you'd like to know more about me, please visit my personal
        information page <a href='https://amanhimself.dev/about'>here</a> or
        contact me at{' '}
        <strong style={{ color: '#444' }}>amanmittal.work@gmail.com</strong>.
      </Text>
    </Box>
  );
}

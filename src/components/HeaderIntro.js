import React from 'react';
import { Link } from 'gatsby';
import {
  FaGithub,
  FaTwitter,
  FaMedium,
  FaDev,
  FaPatreon,
  FaMugHot
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import SocialIcon from './SocialIcon';
import avatar from '../images/avatar.jpg';

export default function HeaderIntro() {
  return (
    <div className='lead'>
      <div className='elevator'>
        <h1 style={{ fontSize: 32 }}>{`👋 Hi, I'm Aman Mittal`}</h1>
        <p>
          {`I am a software developer and a technical writer who writes on Node.js, Reactjs and React Native. This blog is a collection of documents  I've learn over the years.`}
        </p>
        <div>
          <SocialIcon href='mailto:amanmittal.work@gmail.com'>
            <MdEmail style={{ width: '30px', height: '30px', color: '#fff' }} />
          </SocialIcon>
          <SocialIcon href='https://twitter.com/amanhimself'>
            <FaTwitter
              style={{ width: '30px', height: '30px', color: '#fff' }}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href='https://github.com/amandeepmittal'>
            <FaGithub
              style={{ width: '30px', height: '30px', color: '#fff' }}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href='https://medium.com/@amanhimself'>
            <FaMedium
              style={{ width: '30px', height: '30px', color: '#fff' }}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href='https://dev.to/amanhimself'>
            <FaDev style={{ width: '30px', height: '30px', color: '#fff' }} />
          </SocialIcon>
          &ensp;
          {/* <SocialIcon href='https://patreon.com/amanhimself'>
            <FaPatreon
              style={{ width: '30px', height: '30px', color: '#fff' }}
            />
          </SocialIcon> */}
          {/* &ensp;
          <SocialIcon href='https://paypal.me/amanhimself'>
            <FaPaypal
              style={{ width: '30px', height: '30px', color: '#fff' }}
            />
          </SocialIcon> */}
          &ensp;
          <SocialIcon href='https://ko-fi.com/amanhimself'>
            <FaMugHot
              style={{ width: '30px', height: '30px', color: '#fff' }}
            />
          </SocialIcon>
        </div>
      </div>
      <div className='newsletter-section'>
        <img
          src={avatar}
          className='newsletter-avatar'
          alt='Aman'
          style={{ width: 150, height: 150 }}
        />
        <div>
          <h3>Email Newsletter</h3>
          <p>
            Get an update when my new tutorials are out by signing up the
            newsletter below and join 1k+ developers.
          </p>
          <a className='button' href='https://tinyletter.com/amanhimself'>
            {`💌 Subscribe`}
          </a>
        </div>
      </div>
    </div>
  );
}

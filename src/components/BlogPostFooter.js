import React from 'react';
import avatar from '../images/avatar.jpg';
import { FaGithub, FaTwitter, FaMedium, FaDev } from 'react-icons/fa';
import SocialIcon from './SocialIcon';

export default function BlogPostFooter() {
  return (
    <aside className='note'>
      <div className='container note-container'>
        <div className='flex-author'>
          <div className='flex-avatar'>
            <img className='avatar' src={avatar} alt='Aman Mittal' />
          </div>
          <div>
            <SocialIcon href='https://twitter.com/amanhimself'>
              <FaTwitter
                style={{ width: '20px', height: '20px', color: '#fff' }}
              />
            </SocialIcon>
            <SocialIcon href='https://dev.to/amanhimself'>
              <FaDev style={{ width: '20px', height: '20px', color: '#fff' }} />
            </SocialIcon>
            <SocialIcon href='https://github.com/amandeepmittal'>
              <FaGithub
                style={{ width: '20px', height: '20px', color: '#fff' }}
              />
            </SocialIcon>
            &ensp;
            <SocialIcon href='https://medium.com/@amanhimself'>
              <FaMedium
                style={{ width: '20px', height: '20px', color: '#fff' }}
              />
            </SocialIcon>
            <p>
              I'm <strong style={{ color: 'white' }}>Aman</strong>
              {` who works as an independent developer with technologies such as Node.js, Reactjs, and React Native. I try to document and write tutorials to help JavaScript Web and Mobile developers.
        `}
            </p>
            <div className='flex'>
              {/* <a
                href='https://tinyletter.com/amanhimself'
                className='newsletter-button'
                target='_blank'
                rel='noopener noreferrer'
              >
                💌 Subscribe to newsletter
              </a> */}
              <a
                className='kofi-button'
                href='https://ko-fi.com/amanhimself'
                target='_blank'
                rel='noopener noreferrer'
              >
                ☕ Buy me a coffee
              </a>
              <a
                className='patreon-button'
                href='https://www.patreon.com/amanhimself'
                target='_blank'
                rel='noopener noreferrer'
              >
                Support on Patreon
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

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
            <SocialIcon href='https://medium.com/@amanhimself'>
              <FaMedium
                style={{ width: '20px', height: '20px', color: '#fff' }}
              />
            </SocialIcon>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <a
                className='newsletter-button'
                href='https://tinyletter.com/amanhimself'
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: '#fff', alignItems: 'center' }}
              >
                Get new posts send to your inbox
              </a>
            </div>
            <p>
              I'm <strong style={{ color: 'white' }}>Aman</strong>
              {` who works as an independent developer with technologies such as Node.js, Reactjs, and React Native. I try to document and write tutorials to help JavaScript Web and Mobile developers.`}
            </p>
            {/* <p>
              Support: If you like what I write about and want to support me in
              writing more
            </p> */}
            <div className='flex' style={{ marginTop: 20 }}>
              <a
                className='kofi-button'
                href='https://ko-fi.com/amanhimself'
                target='_blank'
                rel='noopener noreferrer'
              >
                Buy me a coffee
              </a>
              <a
                style={{
                  marginLeft: 15,
                  backgroundColor: 'tomato'
                }}
                className='kofi-button'
                href='https://www.patreon.com/amanhimself'
                target='_blank'
                rel='noopener noreferrer'
              >
                Become a Patreon
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

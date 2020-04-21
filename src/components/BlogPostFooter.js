import React from 'react';
import avatar from '../images/avatar.jpg';
// import patreon from '../../content/thumbnails/patreon.png';
// import kofi from '../../content/thumbnails/kofi.png';

export default function BlogPostFooter() {
  return (
    <aside className='note'>
      <div className='container note-container'>
        <div className='flex-author'>
          <div className='flex-avatar'>
            <img className='avatar' src={avatar} alt='Aman Mittal' />
          </div>
          <div>
            <h3>Author</h3>
            <p>
              I'm <strong style={{ color: 'white' }}>Aman</strong>
              {` working as an independent fullstack developer with technologies such as Node.js, Reactjs, and React Native. I try to document and write tutorials to help JavaScript Web and Mobile developers.
        `}
            </p>
            <div className='flex'>
              <a
                href='https://tinyletter.com/amanhimself'
                className='newsletter-button'
                target='_blank'
                rel='noopener noreferrer'
              >
                💌 Subscribe to newsletter
              </a>
              <a
                className='kofi-button'
                href='https://ko-fi.com/amanhimself'
                target='_blank'
                rel='noopener noreferrer'
              >
                ☕ Buy me a coffee
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

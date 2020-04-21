import React from 'react';

export default function Footer() {
  return (
    <footer className='footer container'>
      <div>
        <a
          href='https://amanhimself.dev'
          target='_blank'
          rel='noopener noreferrer'
        >
          Aman Mittal © 2020 - version 6
        </a>
        {/* <a
          href='https://www.amanhimself.dev/rss.xml'
          target='_blank'
          rel='noopener noreferrer'
        >
          RSS
        </a> */}
      </div>
      <div>
        <a
          href='https://twitter.com/amanhimself'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </a>
        <a
          href='https://tinyletter.com/amanhimself'
          target='_blank'
          rel='noopener noreferrer'
        >
          Newsletter
        </a>
        <a
          href='https://ko-fi.com/amanhimself'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ko-Fi
        </a>
        <a
          href='https://patreon.com/amanhimself'
          target='_blank'
          rel='noopener noreferrer'
        >
          Patreon
        </a>
        <a
          href='https://amanhimself.dev/rss.xml'
          target='_blank'
          rel='noopener noreferrer'
        >
          RSS feed
        </a>
      </div>
    </footer>
  );
}

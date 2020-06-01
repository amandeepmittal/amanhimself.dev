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
            <h3>👋</h3>
            <p>
              I'm <strong style={{ color: 'white' }}>Aman</strong>
              {` who works as an independent fullstack developer with technologies such as Node.js, Reactjs, and React Native. I try to document and write tutorials to help JavaScript Web and Mobile developers.
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
              <a
                className='kofi-button'
                style={{ marginLeft: '10px', backgroundColor: '#EF6753' }}
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

// export default function BlogPostFooter() {
//   return (
//     <div className='single container'>
//       <hr />
//       <div style={{ textAlign: 'center', marginTop: 10 }}>
//         🐦{' '}
//         <a
//           href='https://twitter.com/amanhimself'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           Follow me on Twitter!
//         </a>
//       </div>
//       <div style={{ textAlign: 'center', marginTop: 10 }}>
//         📧 Questions?{' '}
//         <a
//           href='mailto:amanmittal.work@gmail.com'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           Email me
//         </a>
//       </div>
//       <div style={{ textAlign: 'center', marginTop: 10 }}>
//         💌 Get updates on new posts via email?{' '}
//         <a
//           href='https://tinyletter.com/amanhimself'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           Subscribe the newsletter.{' '}
//         </a>
//         <br />
//         Over 1000 people enjoy getting, probably you will too.
//       </div>
//       <div style={{ textAlign: 'center', marginTop: 10 }}>
//         ☕ You can support this blog and allow me to continue to write posts
//         <br />
//         <a
//           href='https://ko-fi.com/amanhimself'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           by Buying me a coffee here.{' '}
//         </a>
//         <br />
//       </div>
//     </div>
//   );
// }

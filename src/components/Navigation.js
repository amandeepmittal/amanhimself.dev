import React from 'react';
import { Link } from 'gatsby';

export default function Navigation({ menuLinks }) {
  return (
    <nav className='nav scroll'>
      <nav className='nav-container'>
        <div className='brand'>
          <span className='text'>Aman Mittal</span>
        </div>
        <div className='links'>
          {menuLinks.map(link => (
            <Link key={link.name} to={link.link} activeClassName='active'>
              {link.name}
            </Link>
          ))}
          <a
            href='https://tinyletter.com/amanhimself'
            target='_blank'
            rel='noopener noreferrer'
          >
            Newsletter
          </a>
        </div>
      </nav>
    </nav>
  );
}

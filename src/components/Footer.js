import React from 'react';
import { Link } from 'gatsby';

import { BlogConfig } from '../../blog-config';

const Footer = () => {
  return (
    <div className='mt-14 mb-6 md:px-4 space-y-14'>
      <div className='flex flex-row items-center justify-center w-11/12'>
        <p className='text-base items-center justify-center px-2 text-gray-500'>
          &copy;{new Date().getFullYear()} Aman Mittal - All rights reserved
        </p>
        <p className='text-base items-center justify-center px-2 text-gray-500'>
          <Link className='hover:text-gray-700' to='/blog'>
            Blog
          </Link>
        </p>
        <p className='text-base items-center justify-center px-2 text-gray-500'>
          <a className='hover:text-gray-700' href={BlogConfig.newsletter}>
            Newsletter
          </a>
        </p>
        <p className='text-base items-center justify-center px-2 text-gray-500'>
          <a className='hover:text-gray-700' href={BlogConfig.twitter}>
            Twitter
          </a>
        </p>
        <p className='text-base items-center justify-center px-2 text-gray-500'>
          <a
            className='hover:text-gray-700'
            href='https://amanhimself.dev/rss.xml'
          >
            RSS
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;

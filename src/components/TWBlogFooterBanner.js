import React from 'react';

import banner from '../../content/assets/dev-apis-banner.png';

const TWBlogFooterBanner = () => {
  return (
    <div className='m-8 md:m-4 flex flex-wrap justify-center items-center'>
      <div className='bg-white-200 border-2 border-purple-500 relative text-gray-600 py-3 px-3 rounded-lg text-center'>
        <p className='font-semibold text-lg'>
          <strong>DEV APIs</strong> is a complete APIs suite for your software
          development, and business to power-up.
        </p>
        <p className='text-base py-2'>Give it a try? Click the banner below.</p>
        <a href='https://nocodeapi.com/devapis' target='_blank'>
          <img src={banner} width='100%' />
        </a>
      </div>
      <small className='text-xs text-purple-500'>
        This is a sponsored link
      </small>
    </div>
  );
};

export default TWBlogFooterBanner;

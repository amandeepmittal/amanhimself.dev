import React from 'react';

const TWBlogFooterBanner = () => {
  return (
    <div className="m-8 md:m-4 flex flex-wrap justify-center items-center">
      <div className="bg-white-200 border-2 border-purple-500 relative text-gray-600 py-3 px-3 rounded-lg">
        <p className="font-semibold text-lg">
          Want to help support this blog and learn some cool things about
          JavaScript at the same time?
        </p>
        <p className="text-base py-2">
          Click the banner below and sign up to Bytes.
        </p>
        <a href="https://ui.dev/bytes/?r=aman" target="_blank">
          <img src="/static/uidev-banner.jpg" width="80%"/>
        </a>
      </div>
      <small className="text-xs text-purple-500">
        This is a sponsored link
      </small>
    </div>
  );
};

export default TWBlogFooterBanner;

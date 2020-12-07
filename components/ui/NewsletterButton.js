import React from 'react';

import { BlogConfig } from '../../blog-config';

const NewsletterButton = () => {
  return (
    <div class="mx-auto">
      <button
        type="button"
        className="text-base border border-purple-500 bg-purple-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-purple-400 hover:border-purple-400 focus:outline-none focus:shadow-outline">
        <a href={BlogConfig.newsletter} target="_blank" rel="noreferrer">
          &#128140;&nbsp; Subscribe Newsletter
        </a>
      </button>
    </div>
  );
};

export default NewsletterButton;

import React from 'react';

import TWCustomLink from './TWCustomLink';
import {BlogConfig} from '../../blog-config'

const TWFooter = () => {
  return (
    <div className="mt-14 mb-6 md:px-4 space-y-14">
      <div className="flex flex-row items-center justify-center w-11/12">
        <p className="text-base items-center justify-center px-2 text-gray-500">
          &copy;{new Date().getFullYear()} Aman Mittal - All rights reserved
        </p>
        <p className="text-base items-center justify-center px-2 text-gray-500">
          <TWCustomLink  className="hover:text-gray-700" to='/blog'>
                Blog
          </TWCustomLink>
          </p>
        <p className="text-base items-center justify-center px-2 text-gray-500">
          <TWCustomLink  className="hover:text-gray-700" to={BlogConfig.newsletter}>
                Newsletter
          </TWCustomLink>
          </p>
        <p className="text-base items-center justify-center px-2 text-gray-500">
          <TWCustomLink  className="hover:text-gray-700" to={BlogConfig.twitter}>
                Twitter
          </TWCustomLink>
        </p>        
       </div> 
    </div>
  )
}

export default TWFooter;
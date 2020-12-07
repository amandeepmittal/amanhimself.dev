import React from 'react';
import NextLink from 'next/link';

import Heading from './Heading';

const TWProjectCard = ({title, description, href, icon, techStack}) => {  
  return (
    <article className="relative w-3/4 my-4 inline-block p-4 text-gray-700 rounded-md outline-none post-item hover:bg-purple-100 hover:text-gray-700 focus:bg-gray-100 focus:shadow-sm focus:text-gray-700 transition duration-500 ease focus:outline-none focus:shadow-outline">
      <NextLink href={href} passHref>
        <a
          className="absolute top-0 bottom-0 left-0 right-0"
          aria-label={`link to blog post "${title}" detail page`}></a>
      </NextLink>
      <div className="relative z-10 space-y-4 pointer-events-none xl:space-y-0 xl:grid xl:grid-cols-4 xl:col-gap-6">
        <div className="flex items-center pr-4 xl:space-x-6 xl:pb-0 xl:col-span-5">
          <div className="flex-shrink-0 hidden w-12 h-12 xl:inline-block">
            <span className="text-4xl">{icon}</span>
          </div>
          <div className="space-y-2">
            <Heading size="h3" noMargin>
              {title}
            </Heading>
            <p className="text-lg tracking-tight text-gray-800">{description}</p>
          </div>
        </div>
        <div className="flex items-center pt-4 space-x-6 border-t border-gray-200 xl:pl-4 xl:pt-0 xl:space-x-0 xl:border-l xl:border-t-0 xl:hidden">
          <div className="inline-block w-12 h-12 xl:hidden">
           {icon}           
          </div>          
        </div>
      </div>
    </article>
  );
};

export default TWProjectCard;

import React from 'react';
import { Link } from 'gatsby';
import { slugify } from '../utils/helpers';

const CustomTags = ({ tags }) => {
  return (
    <ul className='flex flex-wrap'>
      {tags.map(tag => (
        <li key={tag} className='flex-none mt-2 mr-2'>
          <Link
            key={tag}
            to={`/tags/${slugify(tag)}`}
            className='pointer-events-auto inline-block rounded-lg px-2 py-1 text-xs font-semibold transition-colors duration-200 ease-in-out bg-purple-300 text-gray-700 hover:bg-purple-500 hover:text-white'
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CustomTags;

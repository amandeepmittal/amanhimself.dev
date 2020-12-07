import React from 'react';
import classNames from 'classnames';

import TWCustomLink from './TWCustomLink';
import getTagsInfo from './helpers/getTagsInfo';

const Tags = ({tags}) => {
  const tagsArray = tags.split(",").map((tag) => `${tag.trim()}`);
  const tagsInfoArray = getTagsInfo(tagsArray);

  return (    
                <ul className="flex flex-wrap">
              {tagsInfoArray.map((tag) => (
                <li key={tag.slug} className="flex-none mt-2 mr-2">
              <TWCustomLink key={tag.name}
              scroll={false}
                            to={`/tag/${tag.slug}`}
                  className={classNames(
                  'pointer-events-auto inline-block rounded-lg px-2 py-1 text-xs font-semibold transition-colors duration-200 ease-in-out',
                  tag.bgColor,
                  tag.fontColor  
                )}
                >
                  #{tag.name}
                  </TWCustomLink>
                </li>
              ))}
            </ul>          
  );
}

export default Tags;

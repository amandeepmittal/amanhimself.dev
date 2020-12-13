import React from 'react';
import { Link } from 'gatsby';

import TWButton from './TWButton';

export default function Suggested({ previous, next }) {
  return (
    <>
      <div className='my-2'>
        {previous && (
          <TWButton variant='github'>
            <Link to={previous.fields.slug} rel='prev'>
              <span>Previous: </span>
              {previous.frontmatter.title}
            </Link>
          </TWButton>
        )}
      </div>
      {next && (
        <TWButton variant='github'>
          <Link to={next.fields.slug} rel='next'>
            <span>Next: </span>
            {next.frontmatter.title}
          </Link>
        </TWButton>
      )}
    </>
  );
}

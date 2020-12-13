import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import * as queryString from 'query-string';

import Posts from './Posts';

export default function Search({ posts, location, navigate }) {
  const { search } = queryString.parse(location.search);
  const [query, setQuery] = useState(search || '');
  const { localSearchPages } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `);

  const results = useFlexSearch(
    query,
    localSearchPages.index,
    localSearchPages.store
  );

  return (
    <>
      <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
        <input
          id='search'
          type='search'
          className='bg-white border p-3 focus:outline-none focus:shadow-outline border-purple-200 rounded-lg py-2 px-12 block appearance-none leading-normal'
          placeholder='Search a post here... '
          value={query}
          onChange={e => {
            navigate(e.target.value ? `/blog/?search=${e.target.value}` : '');
            setQuery(e.target.value);
          }}
        />
        <section>
          {query ? (
            results.length > 0 ? (
              <Posts data={results} />
            ) : (
              <p>Sorry, nothing matched that search.</p>
            )
          ) : (
            <Posts data={posts} />
          )}
        </section>
      </div>
    </>
  );
}

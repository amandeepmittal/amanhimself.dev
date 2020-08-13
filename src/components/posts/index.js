import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Post from './post';

const ButtonWrapper = styled.span`
  display: inline-block;
  background: var(--clr-primary-10);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--clr-primary-6);
  border-radius: 3rem;
`;

const Posts = ({ posts, title }) => {
  return (
    <section className="posts about-page" style={{ marginTop: '1rem' }}>
      <h3 className="posts-title" style={{ marginLeft: '2rem' }}>
        {title} &nbsp;
        <Link to={`/blog`}>
          <ButtonWrapper>View all</ButtonWrapper>
        </Link>
      </h3>
      <div className="about-page">
        {/* posts column */}
        <article>
          {posts.map(post => {
            return <Post key={post.id} {...post} />;
          })}
        </article>
        {/* banner column */}
        {/* <article>
          <Banner />
        </article> */}
      </div>
    </section>
  );
};

export default Posts;

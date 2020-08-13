import React from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.article`
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  padding: 1rem;
  background: var(--clr-grey-10);
  :hover {
    background: var(--clr-primary-10);
  }
  .info {
    text-align: center;
  }
  .category {
    display: inline-block;
    background: var(--clr-primary-10);
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--clr-primary-6);
    border-radius: 3rem;
  }
  h3 {
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: initial;
    font-size: 1.2rem;
    color: var(--clr-black);
  }
  .underline {
    width: 5rem;
    height: 1px;
    background: var(--clr-grey-9);
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  p {
    color: var(--clr-grey-5);
    line-height: 1.8;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--clr-grey-5);
    & .date {
      display: flex;
      align-items: center;
      & .icon {
        color: var(--clr-grey-5);
        margin-right: 0.5rem;
      }
    }
  }
  @media (min-width: 600px) {
    .img {
      height: 5rem;
    }
  }
  @media (min-width: 800px) {
    .img {
      height: 5rem;
    }
  }
  @media (min-width: 992px) {
    & {
      display: grid;
      grid-template-columns: 30rem 1fr;
      column-gap: 1.5rem;
      .info {
        text-align: left;
      }
      .img {
        height: 100%;
        max-height: 5rem;
      }
      .underline {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`;

const Post = ({ frontmatter, timeToRead }) => {
  const { title, slug, date, category } = frontmatter;

  return (
    <Link to={`/${slug}`}>
      <Wrapper>
        <div className="info">
          <h3>{title}</h3>
        </div>
        <div className="info">
          <footer>
            <span className="date">
              <RiCalendarLine className="icon"></RiCalendarLine> {date}
            </span>
            <span className="date">
              <FaRegClock className="icon" />
              {timeToRead} min
            </span>
            <span className="category">{category}</span>
          </footer>
        </div>
      </Wrapper>
    </Link>
  );
};

const PostsList = ({ posts }) => {
  return (
    <section className="posts">
      <div className="posts-center">
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

export default PostsList;

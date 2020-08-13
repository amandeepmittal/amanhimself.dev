import React from 'react';
import Image from 'gatsby-image';
import { RiCalendarLine } from 'react-icons/ri';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { FaRegClock } from 'react-icons/fa';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Post = ({ frontmatter, excerpt, timeToRead }) => {
  const { title, image, slug, date, category } = frontmatter;

  return (
    <Wrapper>
      <div className="info">
        <Image fluid={image.childImageSharp.fluid} className="img" />
      </div>
      <div className="info">
        <Link to={`/${category}`}>
          <span className="category">{category}</span>
        </Link>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <Link to={`/${slug}`} className="link">
          Read more <IoMdArrowRoundForward />
        </Link>
        <footer>
          <span className="date">
            <RiCalendarLine className="icon" /> {date}
          </span>
          <span className="date">
            <FaRegClock className="icon" />
            {timeToRead} min
          </span>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  margin-bottom: 3rem;
  border-radius: 0.8rem;
  padding: 0.75rem;
  background: var(--clr-grey-10);
  .info {
    text-align: center;
  }
  .img {
    border-radius: 0.8rem;
    height: 17rem;
  }
  .thumb {
    margin-bottom: 1rem;
    border-radius: var(--radius);
    height: 5rem;
  }
  .category {
    display: inline-block;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    background: var(--clr-primary-10);
    padding: 0.25rem 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: var(--spacing);
    color: var(--clr-primary-6);
    border-radius: 3rem;
  }
  h3 {
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: initial;
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
    line-height: 1.5;
  }
  .link {
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    font-weight: 700;
    color: var(--clr-primary-7);
    padding-bottom: 0.1rem;
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    svg {
      margin-left: 0.25rem;
      font-size: 1.2rem;
    }
  }
  .link:hover {
    border-color: var(--clr-primary-8);
    color: var(--clr-primary-8);
  }
  footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--clr-grey-9);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--clr-grey-5);
    & .date {
      display: flex;
      align-items: center;
      & .icon {
        color: var(--clr-primary-5);
        margin-right: 0.5rem;
      }
    }
  }
  @media (min-width: 600px) {
    .img {
      height: 20rem;
    }
  }
  @media (min-width: 800px) {
    .img {
      height: 25rem;
    }
  }
  @media (min-width: 992px) {
    & {
      display: grid;
      grid-template-columns: 20rem 1fr;
      column-gap: 1.5rem;
      .info {
        text-align: left;
      }
      .img {
        height: 100%;
        max-height: 20rem;
      }
      .underline {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`;

export default Post;

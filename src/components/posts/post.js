import React from 'react';
// import Image from 'gatsby-image';
import { RiCalendarLine } from 'react-icons/ri';
// import { IoMdArrowRoundForward } from 'react-icons/io';
// import { FaRegClock } from 'react-icons/fa';
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
      font-size: 0.9rem;
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

const Post = ({ frontmatter, excerpt, timeToRead }) => {
  const { title, slug, date, category } = frontmatter;

  // return (
  //   <Wrapper>
  //     <div className="info">
  //       <Link to={`/${category}`}>
  //         <span className="category">{category}</span>
  //       </Link>
  //       <h3>{title}</h3>
  //       <p>{excerpt}</p>
  //       <Link to={`/${slug}`} className="link">
  //         Read more <IoMdArrowRoundForward />
  //       </Link>
  //       <footer>
  //         <span className="date">
  //           <RiCalendarLine className="icon" /> {date}
  //         </span>
  //         <span className="date">
  //           <FaRegClock className="icon" />
  //           {timeToRead} min
  //         </span>
  //       </footer>
  //     </div>
  //   </Wrapper>
  // );
  return (
    <Link to={`/${slug}`}>
      <Wrapper>
        <div className="info">
          <h3>{title}</h3>
          {/* <p>{excerpt}</p> */}
        </div>

        <div className="info">
          <footer>
            <span className="date">
              <RiCalendarLine className="icon"></RiCalendarLine> {date}
            </span>
            {/* <span className="date">
              <FaRegClock className="icon" />
              {timeToRead} min
            </span> */}
            <span className="category">{category}</span>
          </footer>
        </div>
      </Wrapper>
    </Link>
  );
};

export default Post;

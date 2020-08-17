import React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { RiCalendarLine } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';

import Layout from '../components/layout';
import Banner from '../components/banner';
import SEO from '../components/seo';

// ...GatsbyImageSharpFluid

const Wrapper = styled.section`
  width: 85vw;
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 4rem;
  .post-info {
    margin: 2rem 0 4rem 0;
    text-align: center;
    .img {
      display: inline-block;
      max-width: 100%;
      height: auto;
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
    .date {
      display: inline-block;
      align-items: center;
      margin-left: 0.4rem;
      background: transparent;
      color: var(--clr-grey-5);
      .icon {
        color: var(--clr-primary-7);
        margin-right: 0.3rem;
      }
    }
    span {
      background: var(--clr-primary-5);
      color: var(--clr-white);
      border-radius: var(--radius);
      padding: 0.25rem 0.5rem;
      text-transform: uppercase;
      letter-spacing: var(--spacing);
    }
    h2 {
      margin: 1.25rem 0;
      font-weight: 400;
    }
    p {
      color: var(--clr-grey-5);
    }
    .underline {
      width: 5rem;
      height: 1px;
      background: var(--clr-grey-9);
      margin: 0 auto;
      margin-bottom: 1rem;
    }
  }
  @media (min-width: 992px) {
    & {
      width: 92vw;
    }
  }
  @media (min-width: 1170px) {
    & {
      display: grid;
      grid-template-columns: 1fr 200px;
      column-gap: 4rem;
    }
  }
`;

const PostTemplate = ({ data }) => {
  const {
    mdx: {
      frontmatter: { title, image, slug, category, date },
      body,
      timeToRead
    }
  } = data;
  return (
    <Layout>
      <SEO title={title} />
      <Wrapper>
        {/* post column */}
        <article>
          <div className="post-info">
            <div>
              <Link to={`/${category}`}>
                <span className="category">{category}</span>
              </Link>
              <span className="date">
                <RiCalendarLine className="icon" />
                {date}
              </span>
              <span className="date">
                <FaRegClock className="icon" />
                {timeToRead} min
              </span>
            </div>
            <h2>{title}</h2>
            <Image fluid={image.childImageSharp.fluid} />
          </div>
          <MDXRenderer>{body}</MDXRenderer>
        </article>
        {/* Banner column */}
        <article>
          <Banner sharePostSlug={slug} postTitle={title} />
        </article>
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query GetSinglePost($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        category
        date(formatString: "MMMM Do, YYYY")
        slug
        title
        image {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
      timeToRead
    }
  }
`;

export default PostTemplate;

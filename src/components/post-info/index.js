import React from 'react';
import { Link } from 'gatsby';

import styled, { css } from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import { slugify } from '../../helpers';

const GridDiv = styled.div`
  display: inline-block;
  width: 100%;
  h2 {
    margin: 0rem;
    /* display: inline; */
    margin-left: 20px;
  }
`;

const card = css`
  width: 80%;
  margin-bottom: 1rem;
  display: inline-block;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 0.5rem 0.75rem;
  border-radius: 0.3rem;
  transition: all 300ms;
  border: 2px solid ${({ theme }) => theme.colors.black};
  box-shadow: 3px 3px 0 ${({ theme }) => theme.colors.black} !important;

  &.reverse {
    box-shadow: -3px 3px 0 ${({ theme }) => theme.colors.black} !important;
  }
  &:hover {
    color: inherit;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 5px 0 ${({ theme }) => theme.colors.primary} !important;
  }
  &.disabled {
    cursor: default;
    border: 2px solid ${({ theme }) => theme.colors.grey};
    box-shadow: 3px 3px 0 ${({ theme }) => theme.colors.grey} !important;
  }
  &.disabled.reverse {
    box-shadow: -3px 3px 0 ${({ theme }) => theme.colors.grey} !important;
  }
`;

const PostCard = styled.div`
  ${card}
`;

const PostMetaWrapper = styled.div`
  margin-top: 0.5rem;
  p {
    margin: 0rem;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const PostInfo = ({
  post: {
    id,
    timeToRead,
    fields: { slug },
    frontmatter: { thumbnail, date, title, tags }
  }
}) => {
  return (
    <PostCard key={id}>
      <a href={`${slug}`}>
        <GridDiv>
          <GatsbyImage
            image={thumbnail.childImageSharp.gatsbyImageData}
            alt="thumbnail"
            style={{ display: 'inline-block' }}
          />
          <h2>{title}</h2>
        </GridDiv>

        <PostMetaWrapper>
          <p>
            <span role="img" aria-label="left hand pointer emoji">
              🕒
            </span>{' '}
            Published on {date}{' '}
            <span role="img" aria-label="left hand pointer emoji">
              ⚡️
            </span>{' '}
            A {timeToRead} minutes read
          </p>
          <span role="img" aria-label="tag emoji">
            🔖{' '}
          </span>
          {tags.map(tag => (
            <Link key={tag} to={`/tags/${slugify(tag)}`}>
              #{tag}{' '}
            </Link>
          ))}
        </PostMetaWrapper>
      </a>
    </PostCard>
  );
};

export default PostInfo;

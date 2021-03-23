import React from 'react';

import styled, { css } from 'styled-components';
import {
  ExpoIcon,
  ReactIcon,
  FirebaseIcon,
  GitHub,
  YoutubeIcon,
  PodcastIcon
} from '../social-icons';

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

const InfoCard = ({
  title,
  href,
  description = false,
  reactIcon = false,
  expoIcon = false,
  firebaseIcon = false,
  githubIcon = false,
  youtubeIcon = false,
  podcastIcon = false
}) => {
  return (
    <PostCard>
      <a href={`${href}`}>
        <GridDiv>
          {expoIcon && <ExpoIcon />}
          {reactIcon && <ReactIcon />}
          {firebaseIcon && <FirebaseIcon />}
          {githubIcon && <GitHub />}
          {youtubeIcon && <YoutubeIcon />}
          {podcastIcon && <PodcastIcon />}
          <h2>{title}</h2>
        </GridDiv>

        <PostMetaWrapper>
          <p>{description}</p>
        </PostMetaWrapper>
      </a>
    </PostCard>
  );
};

export default InfoCard;

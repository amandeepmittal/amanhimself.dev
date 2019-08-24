import React from 'react'
import { css } from '@emotion/core'
import {
  FaGithub,
  FaTwitter,
  FaMedium,
  FaDev,
  FaPatreon,
  FaPaypal,
  FaMugHot
} from 'react-icons/fa'
import SocialIcon from 'components/SocialIcon'
import { bpMaxSM } from '../lib/breakpoints'
import Container from './Container'

const Footer = ({ author }) => (
  <footer>
    <Container
      css={css`
        padding-top: 0;
        ${bpMaxSM} {
          padding-top: 0;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            font-size: 90%;
            opacity: 0.7;
          `}
        >
          {author && `${author} \u00A9 ${new Date().getFullYear()}`} - version 4
        </div>
        <div>
          <SocialIcon href="https://twitter.com/amanhimself">
            <FaTwitter
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://medium.com/@amanhimself">
            <FaMedium
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://github.com/amandeepmittal">
            <FaGithub
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          &ensp;
          <SocialIcon href="https://dev.to/amanhimself">
            <FaDev
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          <SocialIcon href="https://patreon.com/amanhimself">
            <FaPatreon
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          <SocialIcon href="https://paypal.me/amanhimself">
            <FaPaypal
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
          <SocialIcon href="https://ko-fi.com/amanhimself">
            <FaMugHot
              css={css`
                color: #503d81;
                width: 30px;
                height: 30px;
                &:hover {
                  color: green;
                }
              `}
            />
          </SocialIcon>
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer

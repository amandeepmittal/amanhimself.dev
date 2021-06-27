import { createGlobalStyle, css } from 'styled-components';

// https://css-tricks.com/the-current-state-of-styling-scrollbars/
export const CustomScroll = css`
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.lightPurple},
    ${({ theme }) => theme.colors.primary};
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.lightPurple};
    border-radius: 14px;
    border: ${({ theme }) => theme.colors.primary};
  }
`;

export const GlobalCSS = css`
  .prism-code {
    font-weight: 500;
    padding: ${({ theme }) => theme.spacing[5]};
    -webkit-overflow-scrolling: touch;
    background-color: transparent;
    overflow: initial;
    float: left;
    min-width: 100%;
    margin-bottom: 0;
    [data-linenumber='false'] {
      .token-line {
        padding-left: 3px;
      }
    }
  }
  .token {
    display: inline-block;
  }
  p > code,
  li > code {
    /* background: rgb(1, 22, 39); */
    color: rgb(214, 222, 235);
    padding: 2px 1px;
    border-radius: 2px;
  }
  .gatsby-highlight {
    position: relative;

    margin-top: ${({ theme }) => theme.spacing[6]};
    -webkit-overflow-scrolling: touch;
    /* background: rgb(1, 22, 39); */
    overflow: auto;
    border-radius: 2px;
    .token-line {
      margin: 0 -1.3rem;
    }
    pre.language- {
      margin-top: 0;
    }
    pre.language-noLineNumbers {
      margin-top: 0;
    }
    pre[class*='language-']:before {
      background: white;
      border-radius: 0.25rem 0 0 0.25rem;
      color: black;
      font-size: 10px;
      -webkit-letter-spacing: 0.025rem;
      -moz-letter-spacing: 0.025rem;
      -ms-letter-spacing: 0.025rem;
      letter-spacing: 0.025rem;
      padding: 0.1rem 0.5rem;
      position: absolute;
      text-align: right;
      text-transform: uppercase;
      bottom: 1rem;
      right: 0;
    }
    pre[class~='language-javascript']:before,
    pre[class~='language-js']:before {
      content: 'js';
      background: #f7df1e;
      color: black;
    }
    pre[class~='language-jsx']:before {
      content: 'jsx';
      background: #61dafb;
      color: black;
    }
    pre[class~='language-ts']:before {
      content: 'ts';
      background: #61dafb;
      color: black;
    }
    pre[class~='language-tsx']:before {
      content: 'tsx';
      background: #61dafb;
      color: black;
    }
    pre[class~='language-html']:before {
      content: 'html';
      background: #005a9c;
      color: white;
    }
    pre[class~='language-xml']:before {
      content: 'xml';
      background: #005a9c;
      color: white;
    }
    pre[class~='language-svg']:before {
      content: 'svg';
      background: #005a9c;
      color: white;
    }
    pre[class~='language-graphql']:before {
      content: 'GraphQL';
      background: #e10098;
      color: white;
    }
    pre[class~='language-css']:before {
      content: 'css';
      background: #ff9800;
      color: black;
    }
    pre[class~='language-mdx']:before {
      content: 'mdx';
      background: #f9ac00;
      color: black;
    }
    pre[class~='language-text']:before {
      content: 'text';
    }
    pre[class~='language-shell']:before {
      content: 'shell';
    }
    pre[class~='language-sh']:before {
      content: 'sh';
    }
    pre[class~='language-bash']:before {
      content: 'bash';
    }
    pre[class~='language-yaml']:before {
      content: 'yaml';
      background: #ffa8df;
    }
    pre[class~='language-yml']:before {
      content: 'yml';
      background: #ffa8df;
    }
    pre[class~='language-markdown']:before {
      content: 'md';
    }
    pre[class~='language-json']:before,
    pre[class~='language-json5']:before {
      content: 'json';
      background: linen;
    }
    pre[class~='language-diff']:before {
      content: 'diff';
      background: #e6ffed;
    }
  }
  .line-number-style {
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
    text-align: center;
    position: relative;
  }
  .code-title {
    background-color: ${({ theme }) => theme.colors.gray};
    color: black;
    padding: 2px 6px;
    margin: 0;
  }
  [data-name='live-preview'],
  [data-name='live-editor'] {
    margin: 0 -3px;
  }
  .token-line {
    padding-right: 3px;
  }
  .highlight-line {
    background-color: rgb(2, 55, 81);
    border-left: 4px solid rgb(2, 155, 206);
    .line-number-style {
      width: calc(2em - 4px);
      opacity: 0.5;
      left: -2px;
    }
  }
`;

const GlobalStyles = createGlobalStyle`    
    ${CustomScroll}
    ${GlobalCSS}

    html {
        margin: 0rem;
        padding: 0rem;
    }
    body {
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        font-size: 16px;
        overflow-y: scroll;
        margin: 0rem;
        padding: 0rem;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.black};
        margin-top: 1.75rem;
        margin-bottom: 1.rem;
        line-height: 1.5;
    }
    p {        
        color: rgba(0, 0, 0, 0.8);
        line-height: 1.75;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
    }
    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        transition: all 300ms;
        &:hover {
            color: rgba(0, 0, 0, 0.8);
        }
    }
    img {
        display: block;
        max-width: 100%;
        margin: 0rem auto;
    }
    blockquote {
        border-left: 3px solid ${({ theme }) => theme.colors.primary};
        font-style: italic;
        padding-left: 1rem;
    }
    ul {
        color: rgba(0, 0, 0, 0.8);
    }
    li {
        margin-bottom: 0.5rem;
    }
    table {
        margin: 1.75rem auto;
    }
    th, td {
        padding: 0 2rem 0.5rem 0;
    }
    th:last-child,
    td:last-child {
        padding-right: 0;
    }
    ::selection {
        background-color: ${({ theme }) => theme.colors.primary};
    }
    /* responsive iframes */
    /* TODO: remove this */
    .twitch,
    .youtube {
        overflow: hidden;
        position: relative;
        width: 100%;
        margin: 1.75rem auto;
        ::after {
            padding-top: 56.25%;
            display: block;
            content: "";
        }
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`;

export default GlobalStyles;

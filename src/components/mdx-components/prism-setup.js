import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 1em;
  overflow: scroll;
  border-radius: 0.6rem;
  .code-tab {
    position: absolute;
    right: 100;
    /* left: -100; */

    color: rgb(156, 220, 254);
    font-size: 1rem;
    font-weight: 700;
    transform: translateY(-100%);
    text-transform: uppercase;
    padding: 0.05rem 0.85rem 0;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background: #1e1e1e;
  }
`;

const Line = styled.div`
  display: table-row;
  overflow: scroll;
`;

// const LineNo = styled.span`
//   display: table-cell;
//   text-align: right;
//   padding-right: 1em;
//   user-select: none;
//   opacity: 0.5;
// `;

const LineContent = styled.span`
  display: table-cell;
  font-size: 0.8rem;
`;

const PrismWrapper = props => {
  const className = props.children.props.className;

  const language = className.replace(/language-/, '');

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {/* <div className="code-tab">{language}</div> */}
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              {/* <LineNo>{i + 1}</LineNo> */}
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

export default PrismWrapper;

import React from 'react'
import styled from 'styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import ThemeDark from 'prism-react-renderer/themes/dracula'
import ThemeLight from 'prism-react-renderer/themes/dracula'
import ThemeContext from '../context/ThemeContext'

const RE = /{([\d,-]+)}/

// credit to https://github.com/kentcdodds/kentcdodds.com/blob/4976c89de5dd4246807c0d7a1ad140d703bcc0b0/src/components/mdx/code.js

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))
    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      )
      return inRange
    }
  }
  return () => false
}

const Code = ({ children, className, metastring }) => {
  const language = className ? className.replace(/language-/, '') : ''

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    color: #c6d0eb;
  `

  const Pre = styled.pre`
    margin: 1em 0;
    font-size: 1rem;
    overflow-x: auto;
    padding: 20px;
    line-height: 1.55rem;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(198, 208, 235);
    box-shadow: rgba(198, 208, 235, 0.5) 0px 10px 20px;
    border-radius: 10px;
    & .token-line {
      line-height: 1.3em;
      height: 1.5em;
    }
  `

  const WrapperStyles = styled.div`
    margin-left: -50px;
    margin-right: -50px;
    @media (max-width: 820px) {
      margin-left: 0px;
      margin-right: 0px;
    }
  `

  return (
    <ThemeContext.Consumer>
      {heroTheme => (
        <Highlight
          {...defaultProps}
          theme={heroTheme.dark ? ThemeDark : ThemeLight}
          code={children.trim()}
          language={language}
          key={heroTheme.dark}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <WrapperStyles>
              <Pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div
                    {...getLineProps({
                      line,
                      key: i,
                      className: shouldHighlightLine(i) ? 'highlight-line' : ''
                    })}
                  >
                    <LineNo>{i + 1}</LineNo>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </Pre>
            </WrapperStyles>
          )}
        </Highlight>
      )}
    </ThemeContext.Consumer>
  )
}

export default Code

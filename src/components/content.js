import React from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  padding: 0 20px;
  .dark & a {
    color: ${props => props.theme.color.primary.blue};
  }
`

const Tutorial = styled.div`
  margin: auto;
  max-width: ${props => props.theme.screen.sm};
  font-size: 14px;
`

const Content = ({ children }) => (
  <ContentWrapper>
    <Tutorial>{children}</Tutorial>
  </ContentWrapper>
)
export default Content

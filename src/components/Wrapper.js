import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.div`
  padding: 20px;
  background: ${props => props.theme.color.light.accent100};
`

const MainGroup = styled.div`
  max-width: ${props => props.theme.screen.sm};
  margin: auto;
`

const Wrapper = ({ children }) => (
  <MainWrapper>
    <MainGroup>{children}</MainGroup>
  </MainWrapper>
)

export default Wrapper

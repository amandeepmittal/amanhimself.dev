import React from 'react'
import styled from 'styled-components'

const GridMain = styled.div`
  padding: 5px;
`

const GridWrapper = styled.div`
  max-width: ${props => props.theme.screen.sm};
  align-items: end;
  display: grid;
  margin: 0 auto;
  grid-gap: 20px;
`

const Grid = ({ children }) => (
  <GridMain>
    <GridWrapper>{children}</GridWrapper>
  </GridMain>
)

export default Grid

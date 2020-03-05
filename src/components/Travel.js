import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  span {
    font-size: 22px;
  }
`

const Travel = () => (
  <Wrapper>
    <h3>
      {' '}
      <span role="img" aria-label="toolbox">
        ✈{' '}
      </span>
      My travels so far...
    </h3>
    <span role="img" aria-label="flags">
      {' '}
      🇦🇪🇵🇱🇨🇿🇦🇹🇸🇰🇧🇪🇳🇱🇩🇪{' '}
    </span>
  </Wrapper>
)

export default Travel

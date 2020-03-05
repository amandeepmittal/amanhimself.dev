import React from 'react'
import styled from 'styled-components'

const AnimatedSpan = styled.span`
  animation: glowing 5000ms infinite;
  @keyframes glowing {
    0% {
      box-shadow: 0 0 -10px #c4a300;
    }
    40% {
      box-shadow: 0 0 20px #c4a300;
    }
    60% {
      box-shadow: 0 0 20px #c4a300;
    }
    100% {
      box-shadow: 0 0 -10px #c4a300;
    }
  }
`

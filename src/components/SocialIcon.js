import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

export default props => (
  <OutboundLink href={props.href} target="_blank" rel="noopener noreferrer">
    <span className="icon" style={{ paddingRight: '5px' }}>
      {props.children}
    </span>
  </OutboundLink>
)

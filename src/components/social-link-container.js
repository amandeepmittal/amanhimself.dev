import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const SocialLinkContainer = ({ children, href }) => {
  return (
    <OutboundLink href={href} target="_blank" rel="noopener noreferrer">
      <span className="icon" style={{ paddingRight: '5px' }}>
        {children}
      </span>
    </OutboundLink>
  );
};

export default SocialLinkContainer;

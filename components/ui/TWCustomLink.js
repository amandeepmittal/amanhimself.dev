import React from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const TWCustomLink = ({
  children,
  to,
  activeClassName,
  className,
  ...props
}) => {
  // pathname: String - Current route. That is the path of the page in /pages
  const { pathname } = useRouter();

  if (to.startsWith('http')) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        href={to}
        className={classNames(className, {
          [activeClassName]: activeClassName && pathname === to
        })}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...props} href={to} passHref>
      <a
        className={classNames(className, {
          [activeClassName]: activeClassName && pathname === to
        })}>
        {children}
      </a>
    </NextLink>
  );
};

export default TWCustomLink;

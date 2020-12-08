import React from 'react';
import classNames from 'classnames';

const defaultClassName =
  'inline-block px-4 py-2 font-semibold text-center transition-colors duration-300 ease-in-out rounded-md';
const primaryVariant = `bg-purple-200 text-purple-800 hover:bg-purple-500 hover:text-white`;
const twitterVariant = `bg-twitter-200 text-twitter-800 hover:bg-twitter-500 hover:text-white`;
const coffeeVariant = `bg-coffee-200 text-coffee-800 hover:bg-coffee-500 hover:text-white`;

const TWButton = ({
  as = 'button',
  variant = 'primary',
  width = 'full',
  children,
  onClick,
  className,
  raw,
  ...props
}) => {
  const Element = { as };
  return (
    <Element.as
      className={classNames(className, {
        [defaultClassName]: !raw,
        [primaryVariant]: !raw && variant === 'primary',
        [twitterVariant]: !raw && variant === 'twitter',
        [coffeeVariant]: !raw && variant === 'coffee',
        'w-full': !raw && width === 'full',
        'px-8': !raw && width === 'medium'
      })}
      onClick={onClick}
      {...props}>
      {children}
    </Element.as>
  );
};

export default TWButton;

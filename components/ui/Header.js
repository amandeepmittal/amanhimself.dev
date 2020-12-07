import React from 'react';
import classNames from 'classnames';

import TWCustomLink from './TWCustomLink';
import TWContainer from './TWContainer';
import { BlogConfig } from '../../blog-config';

const NavLink = ({ to, children, className }) => {
  return (
    <li className={classNames(className)}>
      <TWCustomLink
        to={to}
        className="inline-block px-2 py-2 text-center rounded-md sm:inline md:px-4">
        <span className="text-lg font-open-sans">{children}</span>
      </TWCustomLink>
    </li>
  );
};

const Header = () => {
  return (
    <TWContainer as="header" className="bg-white w-full py-8 md:pb-8 md:pt-4">
      <nav className="flex flex-wrap justify-around items-center px-4 py-4 space-y-6  bg-white md:space-y-0 md:flex-no-wrap rounded-xl">
        {/* Site Title */}
        <TWCustomLink to="/">
          <h1 className="text-4xl font-semibold tracking-tight text-center text-purple-600 md:text-2xl font-open-sans md:text-left hover:bg-purple-200 rounded-md p-2 hover:text-gray-900">
            {BlogConfig.username}
          </h1>
        </TWCustomLink>
        {/* Menu Items */}
        <ul className="flex items-center justify-center flex-none w-full space-x-2 place-items-center md:w-auto">
          <NavLink
            to="/blog"
            className="relative	hover:bg-purple-200 rounded-md p-2">
            Blog
          </NavLink>
          <NavLink
            to="/about"
            className="relative	hover:bg-purple-200 rounded-md p-2">
            About
          </NavLink>
          <NavLink
            to={BlogConfig.newsletter}
            className="relative hover:bg-purple-200 rounded-md p-2">
            Newsletter
          </NavLink>
          <NavLink
            to={BlogConfig.kofi}
            className="relative hover:bg-purple-200 rounded-md p-2">
            Buy Me Coffee
          </NavLink>
        </ul>
      </nav>
    </TWContainer>
  );
};

export default Header;

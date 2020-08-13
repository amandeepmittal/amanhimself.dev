import React from 'react';
import { Link } from 'gatsby';
import { RiMenu5Line } from 'react-icons/ri';

import NavLinks from './shared/links';

const Navbar = ({ toggle }) => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link
            to="/"
            className="page-link"
            style={{ color: '#fff', fontSize: '1.5rem' }}
          >
            Aman Mittal
          </Link>
          <button className="toggle-btn" onClick={toggle}>
            <RiMenu5Line />
          </button>
        </div>
        <NavLinks styleClass="nav-links" />
      </div>
    </nav>
  );
};

export default Navbar;

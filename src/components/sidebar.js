import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import NavLinks from './shared/links';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'showSidebar' : ''}`}>
      <button className="close-btn" onClick={toggle}>
        <RiCloseLine />
      </button>
      <div className="sidebar-container">
        <NavLinks styleClass="sidebar-links" />
      </div>
    </aside>
  );
};

export default Sidebar;

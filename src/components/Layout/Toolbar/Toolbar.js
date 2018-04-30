import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import './Toolbar.css';

const Toolbar = (props) => (
  <header className="toolbar">
    <button className="drawer-toggle" onClick={props.toggleSideDrawer}>
      <span className="line" />
      <span className="line" />
      <span className="line" />
    </button>
    <div className="logo">
      <Logo />
    </div>
    <nav className="hide-sm">
      <NavItems />
    </nav>
  </header>
);

Toolbar.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired,
};

export default Toolbar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavItem.css';

const navItem = (props) => (
  <li className="nav-item">
    <NavLink isActive={(match, loc) => props.isActive(match, loc, props.link)} to={props.link} onClick={props.toggleSideDrawer}>{props.children}</NavLink>
  </li>
);

navItem.propTypes = {
  link: PropTypes.string.isRequired,
  toggleSideDrawer: PropTypes.func,
  isActive: PropTypes.func,
};

navItem.defaultProps = {
  toggleSideDrawer: () => {},
  isActive: (match, loc, path) => loc.pathname === path,
};

export default navItem;

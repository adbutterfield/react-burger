import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavItem.css';

const navItem = (props) => (
  <li className="nav-item">
    <NavLink exact to={props.link} onClick={props.toggleSideDrawer}>{props.children}</NavLink>
  </li>
);

navItem.propTypes = {
  link: PropTypes.string.isRequired,
  toggleSideDrawer: PropTypes.func,
};

navItem.defaultProps = {
  toggleSideDrawer: () => {},
};

export default navItem;

import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';
import './NavItems.css';

const setBaseActive = (match, loc) => {
  const matches = ['/', '/checkout', '/checkout/customer-info'];
  return matches.includes(loc.pathname);
};

const nav = (props) => {
  return (
    <ul className="nav">
      <NavItem link="/" isActive={setBaseActive} toggleSideDrawer={props.toggleSideDrawer}>New Burger</NavItem>
      <NavItem link="/orders" toggleSideDrawer={props.toggleSideDrawer}>Orders</NavItem>
    </ul>
  );
};

nav.propTypes = {
  toggleSideDrawer: PropTypes.func,
};

nav.defaultProps = {
  toggleSideDrawer: () => { },
};

export default nav;

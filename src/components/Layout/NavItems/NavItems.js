import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';
import './NavItems.css';

const nav = (props) => (
  <ul className="nav">
    <NavItem link="/" toggleSideDrawer={props.toggleSideDrawer}>Order</NavItem>
    <NavItem link="/checkout" toggleSideDrawer={props.toggleSideDrawer}>Checkout</NavItem>
  </ul>
);

nav.propTypes = {
  toggleSideDrawer: PropTypes.func,
};

nav.defaultProps = {
  toggleSideDrawer: () => { },
};

export default nav;

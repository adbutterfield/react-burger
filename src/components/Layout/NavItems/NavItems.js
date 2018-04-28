import React from 'react';
import NavItem from './NavItem/NavItem';
import styles from './NavItems.css';

const nav = () => (
  <ul className={styles.Nav}>
    <NavItem link="/">Order</NavItem>
    <NavItem link="/checkout">Checkout</NavItem>
  </ul>
);

export default nav;

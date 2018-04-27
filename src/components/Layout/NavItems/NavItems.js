import React from 'react';
import NavItem from './NavItem/NavItem';
import styles from './NavItems.css';

const nav = () => (
  <ul className={styles.Nav}>
    <NavItem link="/" isActive>Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default nav;

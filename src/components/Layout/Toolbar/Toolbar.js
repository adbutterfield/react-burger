import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import styles from './Toolbar.css';

const Toolbar = (props) => (
  <header className={styles.Toolbar}>
    <button className={styles.DrawerToggle} onClick={props.toggleSideDrawer}>
      <div />
      <div />
      <div />
    </button>
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DeskTopOnly}>
      <NavItems />
    </nav>
  </header>
);

Toolbar.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired,
};

export default Toolbar;

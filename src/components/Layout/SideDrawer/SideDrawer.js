import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../ui/Backdrop/Backdrop';
import styles from './SideDrawer.css';

const sideDrawer = (props) => {
  return (
    <React.Fragment>
      <Backdrop shouldShow={props.isOpen} clickHandler={props.toggleSideDrawer} />
      <div className={[styles.SideDrawer, props.isOpen ? styles.Open : styles.Closed].join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

sideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSideDrawer: PropTypes.func.isRequired,
};

export default sideDrawer;

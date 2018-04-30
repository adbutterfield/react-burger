import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../ui/Backdrop/Backdrop';
import './SideDrawer.css';

const sideDrawer = (props) => {
  return (
    <React.Fragment>
      <Backdrop shouldShow={props.isOpen} clickHandler={props.toggleSideDrawer} />
      <div className={['side-drawer', props.isOpen ? 'open' : 'closed'].join(' ')}>
        <div className="logo-wrap">
          <Logo />
        </div>
        <nav>
          <NavItems toggleSideDrawer={props.toggleSideDrawer} />
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

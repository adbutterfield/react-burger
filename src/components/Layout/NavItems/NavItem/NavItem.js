import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavItem.css';

const navItem = (props) => (
  <li className={styles.NavItem}>
    <NavLink exact to={props.link} activeClassName={styles.active}>{props.children}</NavLink>
  </li>
);

navItem.propTypes = {
  link: PropTypes.string.isRequired,
};

export default navItem;

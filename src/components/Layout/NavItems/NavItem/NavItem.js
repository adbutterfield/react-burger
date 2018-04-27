import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavItem.css';

const navItem = (props) => (
  <li className={styles.NavItem}>
    <a
      className={props.isActive ? styles.active : null}
      href={props.link}
    >{props.children}
    </a>
  </li>
);

navItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
};

export default navItem;

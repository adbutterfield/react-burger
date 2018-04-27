import React from 'react';
import styles from './Logo.css';
import burgerLogo from '../../../assets/images/burger-logo.png';

const logo = () => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="Burger" />
  </div>
);

export default logo;

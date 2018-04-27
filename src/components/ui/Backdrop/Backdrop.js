import React from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.css';

const backdrop = (props) => (
  props.shouldShow ? <button className={styles.Backdrop} onClick={props.clickHandler} /> : null
);

backdrop.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default backdrop;

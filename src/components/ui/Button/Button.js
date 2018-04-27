import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

const button = (props) => (
  <button
    className={[styles.Button, styles[props.btnType]].join(' ')}
    onClick={props.clickHandler}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default button;

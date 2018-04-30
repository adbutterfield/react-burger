import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const button = (props) => (
  <button
    className={['button', props.btnType].join(' ')}
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

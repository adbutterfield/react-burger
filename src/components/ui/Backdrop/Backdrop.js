import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.css';

const backdrop = (props) => (
  props.shouldShow ? <button className="backdrop" onClick={props.clickHandler} /> : null
);

backdrop.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default backdrop;

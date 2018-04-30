import React from 'react';
import PropTypes from 'prop-types';
import './BuildControl.css';

const buildControl = (props) => (
  <div className="build-control">
    <div className="Label">{props.label.toUpperCase()}</div>
    <button
      className="more"
      onClick={() => props.onAddHandler(props.label)}
    >+
    </button>
    <button
      disabled={props.removeIngredientDisabled}
      className="less"
      onClick={() => props.onRemoveHandler(props.label)}
    >-
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  onAddHandler: PropTypes.func.isRequired,
  removeIngredientDisabled: PropTypes.bool.isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
};

export default buildControl;

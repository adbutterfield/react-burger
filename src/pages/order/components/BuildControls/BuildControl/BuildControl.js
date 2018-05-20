import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { creators as actionCreators } from '../../../../../store/actions';
import './BuildControl.css';

const buildControl = (props) => (
  <div className="build-control">
    <div className="Label">{props.label.toUpperCase()}</div>
    <button
      className="more"
      onClick={() => props.addIngredient(props.label)}
    >+
    </button>
    <button
      disabled={props.removeIngredientDisabled}
      className="less"
      onClick={() => props.removeIngredient(props.label)}
    >-
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredientDisabled: PropTypes.bool.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addIngredient: (type) => actionCreators.addIngredient(type)(dispatch),
  removeIngredient: (type) => actionCreators.removeIngredient(type)(dispatch)
});

export default connect(null, mapDispatchToProps)(buildControl);

import React from 'react';
import PropTypes from 'prop-types';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => (
  <div className="build-controls">
    <p>TOTAL: <strong>${props.totalPrice.toFixed(2)}</strong></p>
    {
      Object.keys(props.ingredients).map((ingKey) => {
        return (<BuildControl
          key={ingKey}
          label={ingKey}
          removeIngredientDisabled={!props.ingredients[ingKey]}
        />);
      })
    }
    <button
      onClick={props.continueOrder}
      className="order-button"
      disabled={
        !Object.keys(props.ingredients).filter((ingKey) => props.ingredients[ingKey]).length
      }
    >ORDER
    </button>
  </div>
);

buildControls.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  ingredients: PropTypes.object.isRequired,
  continueOrder: PropTypes.func.isRequired,
};

export default buildControls;

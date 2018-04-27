import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/ui/Button/Button';

const orderSummary = (props) => {
  return (
    <React.Fragment>
      <h3>YOUR ORDER</h3>
      <p>Following ingredients</p>
      <ul>
        {
          Object.keys(props.ingredients).map((ingKey) => {
            return <li key={ingKey}>{ingKey.toUpperCase()}: {props.ingredients[ingKey]}</li>;
          })
        }
      </ul>
      <p><strong>TOTAL PRICE: ${props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clickHandler={props.toggleOrderSummaryModal}>CANCEL</Button>
      <Button btnType="Success" clickHandler={props.continuePurchase}>CONTINUE</Button>
    </React.Fragment>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.arrayOf('object').isRequired,
  totalPrice: PropTypes.number.isRequired,
  toggleOrderSummaryModal: PropTypes.func.isRequired,
  continuePurchase: PropTypes.func.isRequired,
};

export default orderSummary;

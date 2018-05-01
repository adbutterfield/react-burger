import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'muicss/lib/react/divider';
import './OrderDetails.css';

const orderDetails = (props) => (
  <div className="order-details">
    <p className="order-details-title"><strong>Ingredients:</strong></p>
    {Object.keys(props.ingredients).map((ing) => <p className="order-details-ingredient" key={ing}>{ing} ({props.ingredients[ing]})</p>)}
    <Divider />
    <p className="order-details-total"><strong>TOTAL: </strong>${props.price.toFixed(2)}</p>
  </div>
);

orderDetails.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
};

export default orderDetails;

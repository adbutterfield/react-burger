import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/ui/Spinner/Spinner';

// import service from '../../service';

class Checkout extends Component {
  getMainContent = () => {
    if (this.props.ingredients && this.props.totalPrice) {
      return (
        <Fragment>
          <div style={{ margin: '1rem auto', padding: '2rem 2.75rem' }}>
            <OrderSummary
              ingredients={this.props.ingredients}
              cancelCheckout={this.cancelCheckout}
              continueCheckout={this.continueCheckout}
              totalPrice={this.props.totalPrice}
            />
          </div>
          <Burger ingredients={this.props.ingredients} />
        </Fragment>
      );
    }
    return <Spinner />;
  }

  cancelCheckout = () => {
    this.props.history.push('/');
  };

  continueCheckout = () => {
    // const order = {
    //   ingredients: this.props.ingredients,
    //   price: this.props.totalPrice,
    //   customer: {
    //     name: 'xxx',
    //     address: {
    //       street: 'xxx',
    //       postalCode: 'xxx',
    //     },
    //     email: 'xxx',
    //   },
    // };

    // service.post('/orders.json', order)
    //   .then(() => {

    //   })
    //   .catch(() => {

    //   });
  };

  render() {
    return this.getMainContent();
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
};

Checkout.defaultProps = {
  ingredients: {},
  totalPrice: 0,
};

export default Checkout;

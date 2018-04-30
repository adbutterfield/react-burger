import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import PropTypes from 'prop-types';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/ui/Spinner/Spinner';
import service from '../../service';

class Checkout extends Component {
  state = {
    name: '',
    street: '',
    postalCode: '',
    email: '',
  }

  onFormFieldUpdate = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

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
            >
            <div>
              <Form>
                <Input type="text" name="name" placeholder="Name" onChange={this.onFormFieldUpdate} value={this.state.name} />
                <Input type="text" name="street" placeholder="Street" onChange={this.onFormFieldUpdate} value={this.state.street} />
                <Input type="text" name="postal-code" placeholder="Postal Code" onChange={this.onFormFieldUpdate} value={this.state.postalCode} />
                <Input type="text" name="email" placeholder="Email" onChange={this.onFormFieldUpdate} value={this.state.email} />
              </Form>
            </div>
            </OrderSummary>
          </div>
          <Burger ingredients={this.props.ingredients} />
        </Fragment>
      );
    }
    return <Spinner />;
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  };

  continueCheckout = () => {
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.street,
          postalCode: this.state.postalCode,
        },
        email: this.state.email,
      },
    };

    service.post('/orders.json', order)
      .then(() => {

      })
      .catch(() => {

      });
  };

  render() {
    return this.getMainContent();
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
};

Checkout.defaultProps = {
  ingredients: {},
  totalPrice: 0,
};

export default withRouter(Checkout);

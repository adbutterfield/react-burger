import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomerInfoForm from './components/CustomerInfoForm';
import Button from '../../components/ui/Button/Button';
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
        <div className="mui--text-center">
          <h2 style={{ margin: '6rem 0 0' }}>You sure about this burger?</h2>
          <Burger ingredients={this.props.ingredients} />
          <Button btnType="danger" clickHandler={this.cancelCheckout}>CANCEL</Button>
          <Button btnType="success" clickHandler={this.continueCheckout}>CONTINUE</Button>
          <Route path={`${this.props.match.path}/customer-info`} render={() => (
            <CustomerInfoForm
              onFormFieldUpdate={this.onFormFieldUpdate}
              name={this.state.name}
              street={this.state.street}
              postalCode={this.state.postalCode}
              email={this.state.email}
              placeOrder={this.placeOrder}
            />)}
          />
        </div>
      );
    }
    return <Spinner />;
  }

  cancelCheckout = () => {
    this.props.history.replace('/');
  };

  continueCheckout = () => {
    this.props.history.push(`${this.props.match.path}/customer-info`);
  }

  placeOrder = (e) => {
    e.preventDefault();
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
        this.props.setDefaultIngredientsAndPrice();
        this.props.history.replace('/');
      })
      .catch(() => {
        // TODO: handle catch
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
    replace: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  setDefaultIngredientsAndPrice: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  ingredients: {},
  totalPrice: 0,
};

export default withRouter(Checkout);

import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomerInfoForm from './components/CustomerInfoForm';
import Button from '../../components/ui/Button/Button';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/ui/Spinner/Spinner';
import service from '../../service';
import { creators as actionCreators } from '../../store/actions';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      street: '',
      postalCode: '',
      email: '',
    };

    if (!props.ingredients || !props.totalPrice) {
      this.props.history.replace('/');
    }
  }

  onFormFieldUpdate = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  getMainContent = () => {
    if (this.props.ingredients && this.props.totalPrice) {
      return (
        <div>
          <div className="mui--text-center">
            <h2 style={{ margin: '6rem 0 0' }}>You sure about this burger?</h2>
            <Burger ingredients={this.props.ingredients} />
            <Button btnType="danger" clickHandler={this.cancelCheckout}>CANCEL</Button>
            <Button btnType="success" clickHandler={this.continueCheckout}>CONTINUE</Button>
          </div>
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
        this.props.setDefaultPriceAndIngredients();
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
  setDefaultPriceAndIngredients: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  ingredients: {},
  totalPrice: 0,
};

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = (dispatch) => ({
  setDefaultPriceAndIngredients: () => dispatch(actionCreators.setDefaultPriceAndIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));

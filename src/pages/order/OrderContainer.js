import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import PropTypes from 'prop-types';
import Burger from '../../components/Burger/Burger';
import BuildControls from './components/BuildControls/BuildControls';
import OrderSummary from './components/OrderSummary/OrderSummary';
import errorHandler from '../../utils/ErrorHandler';
import Modal from '../../components/ui/Modal/Modal';
import Spinner from '../../components/ui/Spinner/Spinner';
import service from '../../service';

class OrderContainer extends Component {
  state = {
    showOrderSummary: false,
    orderSubmitted: false,
  };

  getModalContent = () => {
    return this.state.orderSubmitted ?
      <Spinner /> :
      <OrderSummary
        ingredients={this.props.ingredients}
        cancelCheckout={this.toggleOrderSummaryModal}
        continueCheckout={this.continueCheckout}
        totalPrice={this.props.totalPrice}
      />;
  }

  getMainContent = () => {
    if (this.props.ingredients && this.props.totalPrice && this.props.ingredientPrices) {
      return (
        <React.Fragment>
          <Modal
            shouldShow={this.state.showOrderSummary}
            clickHandler={this.toggleOrderSummaryModal}
          >
            {this.getModalContent()}
          </Modal>
          <Container fluid>
            <Row>
              <Col xs="12" sm="6">
                <BuildControls
                  ingredients={this.props.ingredients}
                  totalPrice={this.props.totalPrice}
                  addIngredient={this.addIngredient}
                  removeIngredient={this.removeIngredient}
                  continueOrder={this.toggleOrderSummaryModal}
                />
              </Col>
              <Col xs="12" sm="6">
                <Burger ingredients={this.props.ingredients} />
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
    if (this.props.hasError) {
      return <p>Ingredientes cannot be loaded!</p>;
    }
    return <Spinner />;
  }

  addIngredient = (type) => {
    const newIngredients = { ...this.props.ingredients };
    newIngredients[type] += 1;
    this.props.updateIngredientsAndPrice({
      ingredients: newIngredients,
      totalPrice: parseFloat((this.props.totalPrice + this.props.ingredientPrices[type]).toFixed(2)),
    });
  }

  removeIngredient = (type) => {
    if (this.props.ingredients[type]) {
      const newIngredients = { ...this.props.ingredients };
      newIngredients[type] -= 1;
      this.props.updateIngredientsAndPrice({
        ingredients: newIngredients,
        totalPrice: parseFloat((this.props.totalPrice - this.props.ingredientPrices[type]).toFixed(2)),
      });
    }
  }

  toggleOrderSummaryModal = () => {
    this.setState((prevState) => {
      return { showOrderSummary: !prevState.showOrderSummary };
    });
  }

  continueCheckout = () => {
    this.setState({
      orderSubmitted: true,
    });
    this.props.history.push('/checkout');
  }

  render() {
    return this.getMainContent();
  }
}

OrderContainer.propTypes = {
  ingredients: PropTypes.object,
  ingredientPrices: PropTypes.object,
  hasError: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  totalPrice: PropTypes.number,
  updateIngredientsAndPrice: PropTypes.func.isRequired,
};

OrderContainer.defaultProps = {
  ingredients: {},
  ingredientPrices: {},
  totalPrice: 0,
};

export default errorHandler(withRouter(OrderContainer), service);

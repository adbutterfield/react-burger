import React, { Component } from 'react';
import bluebird from 'bluebird';
import Burger from './components/Burger/Burger';
import BuildControls from './components/BuildControls/BuildControls';
import OrderSummary from './components/OrderSummary/OrderSummary';
import errorHandler from '../../utils/ErrorHandler';
import Modal from '../../components/ui/Modal/Modal';
import Spinner from '../../components/ui/Spinner/Spinner';
import service from '../../service';

class OrderContainer extends Component {
  state = {
    ingredients: null,
    totalPrice: null,
    ingredientPrices: null,
    showOrderSummary: false,
    orderSubmitted: false,
    hasError: false,
  };

  componentDidMount() {
    bluebird.props({
      ingredients: service.get('/ingredients.json'),
      defaultPrice: service.get('/defaultPrice.json'),
    })
      .then((data) => {
        const ingredients = data.ingredients.data;
        const defaultPrice = data.defaultPrice.data;
        this.setState({
          ingredientPrices: Object.keys(ingredients).reduce((ings, ing) => {
            ings[ing] = ingredients[ing].defaultPrice;
            return ings;
          }, {}),
          ingredients: Object.keys(ingredients).reduce((ings, ing) => {
            ings[ing] = ingredients[ing].defaultCount;
            return ings;
          }, {}),
          totalPrice: Object.keys(ingredients).reduce((initalPrice, ing) => {
            return initalPrice + (ingredients[ing].defaultCount * ingredients[ing].defaultPrice);
          }, defaultPrice),
        });
      })
      .catch(() => {
        this.setState({ hasError: true });
      });
  }

  getModalContent = () => {
    return this.state.orderSubmitted ?
      <Spinner /> :
      <OrderSummary
        ingredients={this.state.ingredients}
        toggleOrderSummaryModal={this.toggleOrderSummaryModal}
        continuePurchase={this.continuePurchase}
        totalPrice={this.state.totalPrice}
      />;
  }

  getMainContent = () => {
    if (this.state.ingredients && this.state.totalPrice && this.state.ingredientPrices) {
      return (
        <React.Fragment>
          <Modal
            shouldShow={this.state.showOrderSummary}
            clickHandler={this.toggleOrderSummaryModal}
          >
            {this.getModalContent()}
          </Modal>
          <BuildControls
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            toggleOrderSummaryModal={this.toggleOrderSummaryModal}
          />
          <Burger ingredients={this.state.ingredients} />
        </React.Fragment>
      );
    }
    if (this.state.hasError) {
      return <p>Ingredientes cannot be loaded!</p>;
    }
    return <Spinner />;
  }

  addIngredient = (type) => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] += 1;
    this.setState({
      ingredients: newIngredients,
      totalPrice: parseFloat((this.state.totalPrice + this.state.ingredientPrices[type]).toFixed(2)),
    });
  }

  removeIngredient = (type) => {
    if (this.state.ingredients[type]) {
      const newIngredients = { ...this.state.ingredients };
      newIngredients[type] -= 1;
      this.setState({
        ingredients: newIngredients,
        totalPrice: parseFloat((this.state.totalPrice - this.state.ingredientPrices[type]).toFixed(2)),
      });
    }
  }

  toggleOrderSummaryModal = () => {
    this.setState((prevState) => {
      return { showOrderSummary: !prevState.showOrderSummary };
    });
  }

  continuePurchase = () => {
    this.setState({
      orderSubmitted: true,
    });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'xxx',
        address: {
          street: 'xxx',
          postalCode: 'xxx',
        },
        email: 'xxx',
      },
    };

    service.post('/orders.json', order)
      .then(() => {
        this.setState({
          showOrderSummary: false,
          orderSubmitted: false,
        });
      })
      .catch(() => {
        this.setState({
          showOrderSummary: false,
          orderSubmitted: false,
        });
      });
  }

  render() {
    return this.getMainContent();
  }
}

export default errorHandler(OrderContainer, service);

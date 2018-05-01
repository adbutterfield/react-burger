import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import bluebird from 'bluebird';
import service from './service';
import Layout from './components/Layout/Layout';
import OrderContainer from './pages/order/OrderContainer';
import OrdersContainer from './pages/orders/OrdersContainer';
import CheckoutContainer from './pages/checkout/CheckoutContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: null,
      ingredientPrices: null,
      hasError: false,
    };
    this.setDefaultIngredientsAndPrice();
  }

  setDefaultIngredientsAndPrice = () => {
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

  updateIngredientsAndPrice = (opts) => {
    this.setState({
      ingredients: opts.ingredients,
      totalPrice: opts.totalPrice,
    });
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" render={() => (
            <CheckoutContainer
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              setDefaultIngredientsAndPrice={this.setDefaultIngredientsAndPrice}
            />
            )}
          />
          <Route path="/orders" exact component={OrdersContainer} />
          <Route path="/" exact render={() => (
            <OrderContainer
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              ingredientPrices={this.state.ingredientPrices}
              updateIngredientsAndPrice={this.updateIngredientsAndPrice}
              hasError={this.state.hasError}
            />
            )}
          />
        </Switch>
      </Layout>
    );
  }
}

export default App;

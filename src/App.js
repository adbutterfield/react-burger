import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import OrderContainer from './pages/order/OrderContainer';
import OrdersContainer from './pages/orders/OrdersContainer';
import CheckoutContainer from './pages/checkout/CheckoutContainer';

const App = () => (
  <Layout>
    <Switch>
      <Route path="/checkout" component={CheckoutContainer} />
      <Route path="/orders" exact component={OrdersContainer} />
      <Route path="/" exact component={OrderContainer} />
    </Switch>
  </Layout>
);

export default App;

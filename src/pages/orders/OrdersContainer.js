import React, { Component } from 'react';
import OrderDetails from './components/OrderDetails';
import Spinner from '../../components/ui/Spinner/Spinner';
import ErrorHandler from '../../utils/ErrorHandler';
import service from '../../service';
import './OrdersContainer.css';

class OrdersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      loading: true,
      hasError: false,
    };
    this.getOrders();
  }

  getOrders = () => {
    service.get('/orders.json')
      .then((response) => {
        this.setState({
          orders: Object.keys(response.data).map((orderId) => {
            return { id: orderId, ...response.data[orderId] };
          }),
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      });
  }

  getMainContent = () => {
    if (this.state.hasError) {
      return <p>Orders cannot be loaded!</p>;
    }
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      this.state.orders.map((order) => (
        <OrderDetails
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    );
  }

  render() {
    return (
      <div className="orders">
        {this.getMainContent()}
      </div>
    );
  }
}

export default ErrorHandler(OrdersContainer, service);

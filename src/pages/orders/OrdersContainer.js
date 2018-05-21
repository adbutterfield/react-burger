import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderDetails from './components/OrderDetails';
import Spinner from '../../components/ui/Spinner/Spinner';
import ErrorHandler from '../../utils/ErrorHandler';
import service from '../../service';
import { creators as actionCreators } from '../../store/actions';
import './OrdersContainer.css';

class OrdersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
    this.props.getOrders();
  }

  getMainContent = () => {
    if (this.state.hasError) {
      return <p>Orders cannot be loaded!</p>;
    }
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      this.props.orders.map((order) => (
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

OrdersContainer.propTypes = {
  orders: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(actionCreators.getOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(OrdersContainer, service));

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
import getDefaults from '../../utils/get-defaults';
import { creators as actionCreators } from '../../store/actions';

class OrderContainer extends Component {
  constructor(props) {
    super(props);
    getDefaults().then((data) => {
      props.setDefaultPriceAndIngredients(data);
    });

    this.state = {
      showOrderSummary: false,
      orderSubmitted: false,
    };
  }

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
  hasError: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  totalPrice: PropTypes.number,
  setDefaultPriceAndIngredients: PropTypes.func.isRequired
};

OrderContainer.defaultProps = {
  ingredients: {},
  ingredientPrices: {},
  totalPrice: 0,
  hasError: false
};

const mapStateToProps = (state) => {
  return {
    hasError: state.hasError,
    history: state.history,
    ingredientPrices: state.ingredientPrices,
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDefaultPriceAndIngredients: (data) => actionCreators.setDefaultPriceAndIngredients(data)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(withRouter(OrderContainer), service));

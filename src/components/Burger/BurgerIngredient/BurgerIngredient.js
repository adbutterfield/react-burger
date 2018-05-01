import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BurgerIngredient.css';

const getIngredient = (type) => {
  switch (type) {
    case ('bread-bottom'): {
      return <div className="bread-bottom" />;
    }
    case ('bread-top'): {
      return (
        <div className="bread-top">
          <div className="seeds1" />
          <div className="seeds2" />
        </div>
      );
    }
    case ('meat'): {
      return <div className="meat" />;
    }
    case ('cheese'): {
      return <div className="cheese" />;
    }
    case ('lettuce'): {
      return <div className="lettuce" />;
    }
    case ('bacon'): {
      return <div className="bacon" />;
    }
    default: {
      return null;
    }
  }
};

class BurgerIngredient extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  }

  render() {
    return getIngredient(this.props.type);
  }
}

export default BurgerIngredient;

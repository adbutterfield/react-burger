import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredient.css';

function getIngredient(type) {
  switch (type) {
    case ('bread-bottom'): {
      return <div className={styles.BreadBottom} />;
    }
    case ('bread-top'): {
      return (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1} />
          <div className={styles.Seeds2} />
        </div>
      );
    }
    case ('meat'): {
      return <div className={styles.Meat} />;
    }
    case ('cheese'): {
      return <div className={styles.Cheese} />;
    }
    case ('lettuce'): {
      return <div className={styles.Lettuce} />;
    }
    case ('bacon'): {
      return <div className={styles.Bacon} />;
    }
    default: {
      return null;
    }
  }
}

class BurgerIngredient extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  }

  render() {
    return getIngredient(this.props.type);
  }
}

export default BurgerIngredient;

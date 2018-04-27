/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={`${igKey}${i}`} type={igKey} />;
    });
  }).reduce((arr, el) => {
    return [...arr, ...el];
  }, []);

  const noIngredients = <p>Start adding ingredients!</p>;

  const content = ingredients.length ? ingredients : noIngredients;

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.arrayOf('object').isRequired,
};

export default burger;

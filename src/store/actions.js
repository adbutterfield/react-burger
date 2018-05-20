/* actions */

export const types = {
  SET_DEFAULT_PRICE_AND_INGREDIENTS: 'SET_DEFAULT_PRICE_AND_INGREDIENTS',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  REMOVE_INGREDIENT: 'REMOVE_INGREDIENT'
};

/* action creators */

const setDefaultPriceAndIngredients = (data) => {
  return (dispatch) => dispatch({
    type: types.SET_DEFAULT_PRICE_AND_INGREDIENTS,
    data
  });
};

const addIngredient = (ingredient) => {
  return (dispatch) => dispatch({
    type: types.ADD_INGREDIENT,
    ingredient
  });
};

const removeIngredient = (ingredient) => {
  return (dispatch) => dispatch({
    type: types.REMOVE_INGREDIENT,
    ingredient
  });
};

export const creators = {
  setDefaultPriceAndIngredients,
  addIngredient,
  removeIngredient
};

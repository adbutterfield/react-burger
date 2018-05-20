import { types as actionTypes } from './actions';

const initialState = {
  ingredients: null,
  totalPrice: null,
  ingredientPrices: null,
  hasError: false,
};

const addIngredient = (state, action) => {
  const newIngredients = { ...state.ingredients };
  newIngredients[action.ingredient] += 1;
  return {
    ...state,
    ingredients: newIngredients,
    totalPrice: parseFloat((state.totalPrice + state.ingredientPrices[action.ingredient]).toFixed(2)),
  };
};

const removeIngredient = (state, action) => {
  const newIngredients = { ...state.ingredients };
  newIngredients[action.ingredient] -= 1;
  return {
    ...state,
    ingredients: newIngredients,
    totalPrice: parseFloat((state.totalPrice - state.ingredientPrices[action.ingredient]).toFixed(2)),
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_PRICE_AND_INGREDIENTS: {
      return {
        ...state,
        ...action.data
      };
    }
    case actionTypes.ADD_INGREDIENT: {
      return addIngredient(state, action);
    }
    case actionTypes.REMOVE_INGREDIENT: {
      return removeIngredient(state, action);
    }
    default: {
      return state;
    }
  }
};

export default reducer;

import { types as actionTypes } from './actions';

const initialState = {
  ingredients: null,
  totalPrice: null,
  ingredientPrices: null,
  hasError: false,
  orders: [],
  isLoading: false
};

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredient]: state.ingredients[action.ingredient] + 1
    },
    totalPrice: parseFloat((state.totalPrice + state.ingredientPrices[action.ingredient]).toFixed(2)),
  };
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredient]: state.ingredients[action.ingredient] - 1
    },
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
    case actionTypes.SET_ORDERS: {
      return {
        ...state,
        orders: action.orders
      };
    }
    case actionTypes.IS_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.DONE_LOADING: {
      return {
        ...state,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

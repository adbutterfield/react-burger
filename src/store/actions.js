import getDefaults from '../utils/get-defaults';
import service from '../service';
/* actions */

export const types = {
  SET_DEFAULT_PRICE_AND_INGREDIENTS: 'SET_DEFAULT_PRICE_AND_INGREDIENTS',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',
  SET_ORDERS: 'SET_ORDERS',
  IS_LOADING: 'IS_LOADING',
  DONE_LOADING: 'DONE_LOADING'
};

// nice way to break up your async actions:
// { type: 'FETCH_POSTS_REQUEST' }
// { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
// { type: 'FETCH_POSTS_SUCCESS', response: { ... } }

/* action creators */

const setDefaultPriceAndIngredients = () => {
  return (dispatch) => {
    return getDefaults().then((data) => {
      dispatch({
        type: types.SET_DEFAULT_PRICE_AND_INGREDIENTS,
        data
      });
    });
  };
};

const isLoading = () => ({
  type: types.IS_LOADING
});

const doneLoading = () => ({
  type: types.DONE_LOADING
});

const addIngredient = (ingredient) => ({
  type: types.ADD_INGREDIENT,
  ingredient
});

const removeIngredient = (ingredient) => ({
  type: types.REMOVE_INGREDIENT,
  ingredient
});

const getOrders = () => {
  return (dispatch) => {
    dispatch({
      type: types.IS_LOADING
    });
    return service.get('/orders.json').then((response) => {
      dispatch({
        type: types.SET_ORDERS,
        orders: Object.keys(response.data).map((orderId) => {
          return { id: orderId, ...response.data[orderId] };
        })
      });
      dispatch({
        type: types.DONE_LOADING
      });
    });
  };
};

export const creators = {
  setDefaultPriceAndIngredients,
  addIngredient,
  removeIngredient,
  getOrders,
  isLoading,
  doneLoading
};

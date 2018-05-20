import bluebird from 'bluebird';
import service from './../service';

export default () => {
  return bluebird.props({
    ingredients: service.get('/ingredients.json'),
    defaultPrice: service.get('/defaultPrice.json'),
  })
    .then((data) => {
      const ingredients = data.ingredients.data;
      const defaultPrice = data.defaultPrice.data;
      return {
        ingredientPrices: Object.keys(ingredients).reduce((ings, ing) => {
          ings[ing] = ingredients[ing].defaultPrice;
          return ings;
        }, {}),
        ingredients: Object.keys(ingredients).reduce((ings, ing) => {
          ings[ing] = ingredients[ing].defaultCount;
          return ings;
        }, {}),
        totalPrice: Object.keys(ingredients).reduce((initalPrice, ing) => {
          return initalPrice + (ingredients[ing].defaultCount * ingredients[ing].defaultPrice);
        }, defaultPrice),
      };
    })
    .catch(() => {
      return {
        hasError: true
      };
    });
};

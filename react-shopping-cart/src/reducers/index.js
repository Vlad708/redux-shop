import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import filter from './filter';
import product from './product';

export default combineReducers({
  products,
  cart,
  filter,
  product,
});

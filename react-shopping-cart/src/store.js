import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers';
import { loadState, saveState } from './utils/StateLoader'

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(logger));

store.subscribe(() => {
  saveState({
    selectedProducts: store.getState().cart.items
  });
});

export default () => {  
  return store;
};

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './app.css';

import App from './containers/App';
import ProductItem from './components/ProductItem';

import createStore from './store';
const store = createStore();

ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter>  		 
    	<App />
	</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

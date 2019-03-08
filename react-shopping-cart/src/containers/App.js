import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as productsActions from '../actions/products';
import App from '../components/App';
import Main from '../components/Main';
import orderBy from 'lodash/orderBy';

const sortBy = (products, filterBy) => {
  switch (filterBy) {
    case 'price_high':
      return orderBy(products, 'price', 'desc');
    case 'price_low':
      return orderBy(products, 'price', 'asc');
    case 'author':
      return orderBy(products, 'author', 'asc');
    default:
      return products;
  }
};

const filterProducts = (products, searchQuery) =>
  products.filter(
    o =>
      o.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
      o.author.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
  );

const searchProducts = (products, filterBy, searchQuery) => {
  return sortBy(filterProducts(products, searchQuery), filterBy);
};

const mapStateToProps = ({ products, filter }) => ({
  products: products.items && searchProducts(products.items, filter.filterBy, filter.searchQuery),
  isReady: products.isReady,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(productsActions, dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));

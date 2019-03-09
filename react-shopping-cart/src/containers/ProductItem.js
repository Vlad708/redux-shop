import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as productActions from '../actions/product';
import ProductItem from '../components/ProductItem';

const mapStateToProps = ({ product }) => ({
  product: product.items,
  isReady: product.isReady,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(productActions, dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductItem));
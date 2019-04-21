import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../actions/cart'
import DepositPage from '../components/DepositPage'

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(cartActions, dispatch),
})

export default connect(
  // mapStateToProps,
  mapDispatchToProps,
)(DepositPage);
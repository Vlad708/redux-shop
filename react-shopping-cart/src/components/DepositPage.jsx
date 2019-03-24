import React, { Component } from 'react'
import PayPalButton from 'react-paypal-button'

class DepositPage extends Component {

	render() {
		return (
			<div>
				<h1>Выберите метод оплаты</h1>
				<PayPalButton
	        env='sandbox'
	        sandboxID='abcdef123456'
	        amount='0.01'
	        currency='USD'
	        commit={true}
	      />
			</div>
		)
	}
}

export default DepositPage
import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { withRouter } from 'react-router-dom';
import { sendEmail } from '../utils/SendEmail'
import { Message } from 'semantic-ui-react'
 
class DepositPage extends Component {             

		constructor(props) {
			super(props)
  		this.state = {
  			status: '1'
  		}
    }
    
    render() {   

    	const { formData } = this.props.location.state

      const onSuccess = (payment) => {            
				console.log("The payment was succeeded!", payment);
				const form_data = new FormData()	      
	      
	      for ( var key in formData ) {
	          form_data.append(key, formData[key]);
	      }

	      sendEmail(form_data)           		
      }

      const onCancel = (data) => {
          // User pressed "cancel" or close Paypal's popup!
          console.log('The payment was cancelled!', data);            
      }

      const onError = (err) => {            
          console.log("Error!", err);            
      }

      let env = 'sandbox'; // you can set here to 'production' for production
      let currency = 'RUB'; // or you can set this value from your props or state
      let total = ~~formData.totalPrice; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
      // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

      const client = {
          sandbox:    'AYukUZbZsqJZGbx0yCCC--Pvnc4iK0i7MpKiAD8r49oCBJplLEzvC3anM79LQgEMlCkNcTDOkYsa5gUf',
          production: 'YOUR-PRODUCTION-APP-ID',
      }        
      return (
				<div>
					<h1>Выберите платежную систему</h1>

					<Message positive hidden={!this.state.status}>
				    <Message.Header>You are eligible for a reward</Message.Header>
				    <p>
				      Go to your <b>special offers</b> page to see now.
				    </p>
				  </Message>

          <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
				</div>
      );
    }
}

export default withRouter(DepositPage)
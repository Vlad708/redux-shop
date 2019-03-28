import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
class DepositPage extends Component {
    render() {

    	console.log(this, '==PROPS')
      const onSuccess = (payment) => {            
				console.log("The payment was succeeded!", payment);            		
      }

      const onCancel = (data) => {
          // User pressed "cancel" or close Paypal's popup!
          console.log('The payment was cancelled!', data);            
      }

      const onError = (err) => {            
          console.log("Error!", err);            
      }

      let env = 'sandbox'; // you can set here to 'production' for production
      let currency = 'USD'; // or you can set this value from your props or state
      let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
      // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

      const client = {
          sandbox:    'AYukUZbZsqJZGbx0yCCC--Pvnc4iK0i7MpKiAD8r49oCBJplLEzvC3anM79LQgEMlCkNcTDOkYsa5gUf',
          production: 'YOUR-PRODUCTION-APP-ID',
      }        
      return (
				<div>
					<h1>Выберите платежную систему</h1>
          <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
				</div>
      );
    }
}

export default DepositPage
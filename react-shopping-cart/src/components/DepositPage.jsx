import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendEmail } from '../utils/SendEmail'
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
 
class DepositPage extends Component {             

		constructor(props) {
			super(props);    	
    	this.notificationDOMRef = React.createRef();
    }
    
    render() {   

    	const { formData } = this.props.location.state
    	const { removeFromCart } = this.props    

      const onSuccess = (payment) => {            
				console.log("The payment was succeeded!", payment);
				const form_data = new FormData()	      
	      
	      for (var key in formData ) {
	          form_data.append(key, formData[key])
	      }

	      this.notificationDOMRef.current.addNotification({
			      title: "Внимание",
			      message: `Платеж успешно выполнен. С вами свяжется оператор`,
			      type: "success",
			      insert: "top",
			      container: "top-right",
			      animationIn: ["animated", "fadeIn"],
			      animationOut: ["animated", "fadeOut"],
			      dismiss: { duration: 0 },
			      dismissable: { click: true }
			  })

			  removeFromCart()

	      // sendEmail(form_data)         		
      }

      const onCancel = (data) => {
          // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        this.notificationDOMRef.current.addNotification({
		      title: "Внимание",
		      message: "Платеж отменен пользователем",
		      type: "warning",
		      insert: "top",
		      container: "top-right",
		      animationIn: ["animated", "fadeIn"],
		      animationOut: ["animated", "fadeOut"],
		      dismiss: { duration: 0 },
		      dismissable: { click: true }
		    })
      }

      const onError = (err) => {            
          console.log("Error!", err);
          this.notificationDOMRef.current.addNotification({
			      title: "Status",
			      message: `Ошибка ${err}`,
			      type: "danger",
			      insert: "top",
			      container: "top-right",
			      animationIn: ["animated", "fadeIn"],
			      animationOut: ["animated", "fadeOut"],
			      dismiss: { duration: 0 },
			      dismissable: { click: true }
			    })       
      }

      let env = 'sandbox' // you can set here to 'production' for production
      let currency = 'RUB' // or you can set this value from your props or state
      let total = ~~formData.totalPrice // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
      total = 1
      // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

      const client = {
          sandbox:    'AYukUZbZsqJZGbx0yCCC--Pvnc4iK0i7MpKiAD8r49oCBJplLEzvC3anM79LQgEMlCkNcTDOkYsa5gUf',
          production: 'YOUR-PRODUCTION-APP-ID',
      }        
      return (
				<div>
					<h1>Выберите платежную систему</h1>
					<ReactNotification ref={this.notificationDOMRef} />
          <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
				</div>
      );
    }
}

export default withRouter(DepositPage)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendEmail } from '../utils/SendEmail'
import { Button, Form, Grid, Segment, Item, Icon, Message } from 'semantic-ui-react'

class CheckoutComponent extends Component {

	constructor(props) {
    super(props);

	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.formMainInfo = React.createRef();
    this.state = {			
    	product: '',
    	totalPrice: this.props.cart.items.reduce((total, product) => total + ~~product.price, 0),
    	isHide: true,
    }	
	}

	componentDidMount(props) {		

		this.setState({
			product: this.props.cart.items.map(item => item.title),
		})
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.depositMethod === 'onlineDeposit') {
			window.location.href = '/onlineDeposit';
		}

		const data = new FormData(event.target)

		data.append('totalPrice', this.state.totalPrice)
		data.append('product', this.state.product)

    sendEmail(data)
	}

	onChange = (event) => {  			  	       
    this.setState({      	
    	[event.target.name]: event.target.value,
    	isHide: !(event.target.name ==='deliveryMethod' && event.target.value === 'Курьер')
    });
  }

	render() {
		const { cart } = this.props
		const totalPrice = cart.items.reduce((total, product) => total + ~~product.price, 0)
		
		return (
			<div>				
				<Segment placeholder>
				    <Grid columns={2} relaxed='very' stackable>
				      <Grid.Column>
				        <h1>Оформление заказа</h1>
				        <OrderForm 
				        	handleSubmit={this.handleSubmit} 
				        	onChange={this.onChange}
				        	state={this.state}
				        	cart={cart}
				        	totalPrice={totalPrice}						
			        	/>	
				      </Grid.Column>

				      <Grid.Column verticalAlign='top'>
				        <h1>Список покупок</h1>
				        <CartList cart={cart} />
				        <h4>Итого {cart.items.length} товара на сумму {totalPrice} &nbsp;руб.</h4>
				      </Grid.Column>
				    </Grid>
				</Segment>
			</div>			
		)
	}	
}

function mapStateToProps(state) {
	return { cart: state.cart };
}	

export default connect(mapStateToProps)(CheckoutComponent)

const OrderForm = ({handleSubmit, onChange, state, cart, totalPrice}) => (
  <div>
  	  <Message
  	  	error
	    header='Ошибка!'
	    content='Внимание, ваша корзина пуста.'
	    className={cart.items.length === 0 ? '' : 'hidden' }
	  />
	  <h3>Я новый покупатель</h3>
	  <Form onSubmit={handleSubmit} ref={this.formMainInfo}>
	    <Form.Field>
	      <label>Имя</label>
	      <input placeholder='Имя' name="yourName" />
	    </Form.Field>
	    <Form.Field>
	      <label>Фамилия</label>
	      <input placeholder='Фамилия' name="yourSecondName" />
	    </Form.Field>
	    <Form.Field>
	      <label>Мобильный телефон</label>
	      <input placeholder='Мобильный телефон' type="tel" name="yourPhone" />
	    </Form.Field>
	    <Form.Field>
	      <label>Электронная почта</label>
	      <input placeholder='Электронная почта' type="email" name="yourEmail" />
	    </Form.Field>
	    <h3>Доставка</h3>
	    <Form.Field label='Способ доставки' control='select' name="deliveryMethod" onChange={onChange} >
	        <option value='Самовывоз из магазина'>Самовывоз из магазина</option>
	        <option value='Курьер'>Курьер</option>
	    </Form.Field>
	    <Form.Field id="addressId" 
	    	label='Адрес доставки' 
	    	control='textarea' 
	    	rows='3' 
	    	name='address'	    	
	    	className={state.isHide ? 'hidden ' : '' } />
		<h3>Оплата</h3>
		<Form.Group grouped>
	      <label>Способ оплаты</label>	      
  			<Form.Field label='Наличными при получении' value="Оплата наличными" control='input' type='radio' name='depositMethod' />
    		<Form.Field label='Платежной картой при получении' value="Оплата по карте" control='input' type='radio' name='depositMethod' />
      	<Form.Field label='Онлайн банкинг' value="onlineDeposit" control='input' type='radio' name='depositMethod' />
	    </Form.Group>
	    <h3>
		    <Form.Field>
		      <label>К оплате {totalPrice} <Icon name="rub" /> </label>		      
		    </Form.Field>	    	
	    </h3>
	    <Button type='submit' disabled={cart.items.length === 0}>Оформить заказ</Button>
	  </Form>
  </div>  
)

const CartList = ({ cart }) => (	
	cart.items.map(item => (
		<Item.Group relaxed>						
			<Item>
		      <Item.Image size='tiny' src={item.image.sizes.thumbnail} />

		      <Item.Content verticalAlign='middle'>
		        <Item.Header>{item.title}</Item.Header>
		        <Item.Description className="price">{item.price} <Icon name="rub" /></Item.Description>		        
		      </Item.Content>
		    </Item>
		</Item.Group>
	))
)
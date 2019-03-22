import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Checkbox, Form, Grid, Segment } from 'semantic-ui-react'

class CheckoutComponent extends Component {

	render() {
		const { cart } = this.props
		console.log(cart, '=RUN')	
		return (
			<div>				
				<Segment placeholder>
				    <Grid columns={2} relaxed='very' stackable>
				      <Grid.Column>
				        <h1>Оформление заказа</h1>
				        <FormExampleForm />				
				      </Grid.Column>

				      <Grid.Column verticalAlign='top'>
				        <h1>Список покупок</h1>
				        <CartList cart={cart} />
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

const FormExampleForm = () => (
  <div>
	  <h3>Я новый покупатель</h3>
	  <Form>
	    <Form.Field>
	      <label>Имя</label>
	      <input placeholder='Имя' />
	    </Form.Field>
	    <Form.Field>
	      <label>Фамилия</label>
	      <input placeholder='Фамилия' />
	    </Form.Field>
	    <Form.Field>
	      <label>Мобильный телефон</label>
	      <input placeholder='Мобильный телефон' type="tel" />
	    </Form.Field>
	    <Form.Field>
	      <label>Электронная почта</label>
	      <input placeholder='Электронная почта' type="email" />
	    </Form.Field>
	    <h3>Доставка</h3>
	    <Form.Field label='Способ доставки' control='select'>
	        <option value='courier'>Курьер</option>
	        <option value='pickup'>Самовывоз из магазина</option>
	      </Form.Field>
		<h3>Оплата</h3>
		<Form.Group grouped>
	      <label>Способ оплаты</label>
	      <Form.Field label='Наличными при получении' control='input' type='radio' />
	      <Form.Field label='Платежной картой при получении' control='input' type='radio' />
	    </Form.Group>
	    <h3>К оплате 777 руб.</h3>
	    <Button type='submit'>Оформить заказ</Button>
	  </Form>
  </div>  
)


const CartList = ({ cart }) => (	
	cart.items.map(item => (
		<div>
			<p>{item.title}</p>
		</div>
	))
)
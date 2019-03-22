import React, { Component } from 'react'
import { Menu, Popup, List, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class Trash extends Component {

	render () {
		const {products, onClick} = this.props		
		return (
			<div>
				<CartComponent products={products} onClick={onClick} />								
				<Link to="/checkout/singlePage">
					<Button className="orderButton">Оформить заказ</Button>
				</Link>
			</div>
		)
	}	
}

const CartComponent = ({ products, onClick }) => (
	products.map(product => (	
		<List selection divided verticalAlign="middle">
			<List.Item>
			  <List.Content floated="right">              
			  <Button onClick={onClick.bind(this, product.id)} color="red">
			    Удалить
			  </Button>
			  
			  </List.Content>
			  <Image avatar src={product.image.sizes.medium} />
			  <List.Content>{product.title}</List.Content>
			</List.Item>			 
		</List>
	))  
);

export default Trash
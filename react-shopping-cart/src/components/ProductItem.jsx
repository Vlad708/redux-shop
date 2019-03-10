import React, { Component } from 'react'
import axios from 'axios'
import { Image, Item, Icon, Button, Label } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as cartActions from '../actions/cart';


class ProductItem extends Component {

	constructor(props) {
	   super(props);
	   this.state = {
	   	 isReady: false,
	   	 product: {}
	   };
	   const { dispatch } = props;
 	   this.addCart = bindActionCreators(cartActions, dispatch) 	   
    }

	componentWillMount() {		
		const { productId, setProduct } = this.props		
	    axios.get('https://socio.paktcompany.com/wp-json/wp/v2/posts/' + productId).then( ({ data }) => {
	      this.setState({
	      	isReady: true,
	      	product: data
	      })
	      console.log(this.state, '==State')
	    });	    
  	}

	render () {		
		const { isReady } = this.state	
		return (
	      <div>
	      	{
  			  !isReady ? 'Загрузка' : 
  			  <Item.Group>
  			  	<Item>
  			  		  <Item.Image size='medium' src={this.state.product.acf.image.sizes.large} />					   
				      <Item.Content>
				        <Item.Header>{this.state.product.acf.title}</Item.Header>
				        <Item.Meta>
				          <span className='price'>
				          <Icon name="rub" />
				          	{this.state.product.acf.price}
				          </span>				          
				        </Item.Meta>				        
				        <Item.Description>
				        <div dangerouslySetInnerHTML={{__html:this.state.product.acf.description}}></div>
				        </Item.Description>
				        <Item.Extra>
				          <Button primary floated="right" 
				          	onClick={this.addCart.addToCart.bind(this, this.state.product.acf)}>
				            Купить
				            <Icon name='left chevron' />
				          </Button>
				        </Item.Extra>
				      </Item.Content>
  			  	</Item>
  			  </Item.Group>
	      	}
	      </div>
	    )
  	}
}

export default connect()(ProductItem)
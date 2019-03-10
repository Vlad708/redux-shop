import React, { Component } from 'react'
import axios from 'axios';
import { Image, Item, Icon } from 'semantic-ui-react'

class ProductItem extends Component {

	constructor(props) {
	   super(props);
	   this.state = {
	   	 isReady: false,
	   	 product: {}
	   };	     	
    }

	componentWillMount() {		
		const { productId, setProduct } = this.props		
	    axios.get('https://socio.paktcompany.com/wp-json/wp/v2/posts/' + productId).then( ({ data }) => {
	      this.setState({
	      	isReady: true,
	      	product: data
	      })
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
				      </Item.Content>
  			  	</Item>
  			  </Item.Group>
	      	}
	      </div>
	    )
  	}
}

export default ProductItem
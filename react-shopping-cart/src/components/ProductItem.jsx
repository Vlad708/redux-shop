import React, { Component } from 'react'
import axios from 'axios';
/*import { Menu, Popup, List, Button, Image } from 'semantic-ui-react';*/

class ProductItem extends Component {

	componentWillMount() {		
		const { productId, setProduct } = this.props
		console.log(this.props)
	    axios.get('https://socio.paktcompany.com/wp-json/wp/v2/posts/' + productId).then( ({ data }) => {      
	      setProduct(data)
	    });
  	}

	render () {
		console.log(this.props, 'PROPS')		
		return (
	      <div>
	      	<p>123</p>
	      	<p>123</p>
	      </div>
	    )
  	}
}

export default ProductItem
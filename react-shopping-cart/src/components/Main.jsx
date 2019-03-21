import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'
import ProductCard from '../containers/ProductCard';
import ProductItem from '../components/ProductItem';
import CheckoutComponent from '../components/CheckoutComponent';
import Filter from '../containers/Filter';
import Menu from '../containers/Menu';
import LiveChat from '../components/LiveChat'
import Slider from '../components/Slider'

class Main extends Component {
	componentWillMount() {
	    const { setProducts } = this.props;	    
	    axios.get('https://socio.paktcompany.com/wp-json/wp/v2/posts').then( ({ data }) => {      
	      let products = [];
	      data.map((item) => {	      	
	      	item.acf.id = item.id
	        products.push(item.acf)
	      })      
	      setProducts(products);
	    });
  	}

  	render() {
  		const { products, isReady } = this.props;

  		return (
  			<Container>
		        <Menu data={products}/>		        
		        {/*<LiveChat />*/}
		        <Switch>
				  <Route exact path='/' render={(props) =>
		  			<div>
		  				<Slider />
		  				<Filter />
			  			<Card.Group itemsPerRow={4}>
				          {!isReady
				            ? 'Загрузка...'
				            : products.map((product, i) => <ProductCard key={i} {...product} />)}
				        </Card.Group>
		  			</div>
				  } />				  
		  		  <Route path="/product/:id" render={({match}) => <ProductItem productId={match.params.id} />} />
		  		  <Route exact path="/checkout/singlePage" render={({match}) => <CheckoutComponent productId={match.params.id} />} />
				</Switch>
	      	</Container>
  		)
  	}

}

export default Main;
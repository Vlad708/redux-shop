import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'
import { Card } from 'semantic-ui-react';
import ProductCard from '../containers/ProductCard';
import ProductItem from '../components/ProductItem';
import Filter from '../containers/Filter';
import Menu from '../containers/Menu';

class Main extends Component {
	componentWillMount() {
	    const { setProducts } = this.props;	    
	    axios.get('https://socio.paktcompany.com/wp-json/wp/v2/posts').then( ({ data }) => {      
	      let products = [];
	      data.map((item) => {
	        products.push(item.acf);
	      })      
	      setProducts(products);
	    });
  	}

  	render() {
  		const { products, isReady } = this.props;

  		return (
  			<Container>
		        <Menu data={products}/>
		        <Filter />
		        <Switch>
				  <Route exact path='/' render={(props) =>
		  			<Card.Group itemsPerRow={4}>
			          {!isReady
			            ? 'Загрузка...'
			            : products.map((product, i) => <ProductCard key={i} {...product} />)}
			        </Card.Group>
				  } />				  
		  		  <Route path="/product/:id" render={({match}) => <ProductItem productId={match.params.id} />} />
				  		  
				</Switch>	        
					       
	      	</Container>
  		)
  	}

}

export default Main;
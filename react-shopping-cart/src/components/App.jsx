import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import ProductCard from '../containers/ProductCard';
import Filter from '../containers/Filter';
import Menu from '../containers/Menu';
import { Card } from 'semantic-ui-react';

class App extends Component {
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
        <Card.Group itemsPerRow={4}>
          {!isReady
            ? 'Загрузка...'
            : products.map((product, i) => <ProductCard key={i} {...product} />)}
        </Card.Group>
      </Container>
    );
  }
}

export default App;

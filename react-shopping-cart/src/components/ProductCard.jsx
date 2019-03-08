import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Button } from 'semantic-ui-react';

const ProductCard = product => {

  const { id, title, model, price, image, addToCart, addedCount } = product;
  return (
    <Card>
      <Image src={image.sizes.medium} />
      <Card.Content>        
        <Card.Header>
          <Link to={`/product/${id}`}>
            {title}
          </Link>
        </Card.Header>
        <Card.Meta>
          <span className="date">{model}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="rub" />
          {price}
        </a>
      </Card.Content>
      <Button onClick={addToCart.bind(this, product)}>
        Добавить в корзину {addedCount > 0 && `(${addedCount})`}
      </Button>
    </Card>
  );
};

export default ProductCard;

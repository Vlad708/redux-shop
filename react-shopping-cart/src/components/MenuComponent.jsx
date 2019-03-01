import React, { Component } from 'react'
import { Menu, Popup, List, Button, Image } from 'semantic-ui-react';

class MenuComponent extends Component {

  state = {modalOpen: false}
  handleItemClick = (count) => {      
    (count > 0) ? this.setState({modalOpen: true}) : this.setState({modalOpen: false})
  }

  render () {
    const { totalPrice, count, items } = this.props

    return (
      <Menu>
        <Menu.Item name="browse" onClick={this.handleItemClick}>
          Магазин телефонов
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="signup">
            Итого: &nbsp; <b>{totalPrice}</b>&nbsp;руб.
          </Menu.Item>

          <Popup
            trigger={
              <Menu.Item name="help" onClick={() => this.handleItemClick(count)}>
                Корзина (<b>{count}</b>)
              </Menu.Item>
            }
            open={this.state.modalOpen}      
            content={items.map(book => <CartComponent {...book} />)}
            on="click"
            hideOnScroll
          />
        </Menu.Menu>
      </Menu>
    )
  }
}


const CartComponent = ({ title, id, image, removeFromCart }) => (
  <List selection divided verticalAlign="middle">
    <List.Item>
      <List.Content floated="right">
        <Button onClick={removeFromCart.bind(this, id)} color="red">
          Удалить
        </Button>
      </List.Content>
      <Image avatar src={image} />
      <List.Content>{title}</List.Content>
    </List.Item>    
  </List>
);

export default MenuComponent


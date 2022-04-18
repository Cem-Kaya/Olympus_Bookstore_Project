import React from 'react'
import CartItem from '../components/CartItem'

const CartItems = ({items, onAddToCart, onRemoveFromCart, onRemoveAll}) => {
    return(
        <div>
          <h1>There are {items.length} products</h1>
            {items.map((item, index) => (
                <CartItem 
                  key={index}
                  item={item}
                  onAddToCart={onAddToCart}
                  onRemoveFromCart={onRemoveFromCart}
                  onRemoveAll={onRemoveAll}
                />))
            }
        </div>
      )
}

export default CartItems
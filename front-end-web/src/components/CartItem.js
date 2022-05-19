import React from 'react';

const CartItem = ({item, onAddToCart, onRemoveFromCart, onRemoveAll, onAddToWishList}) => {
  return (
    <tr>              
      <td>
          <figure className="itemside">
              <div className="aside"><img src={item.img} alt="item-img" className="img-sm"/></div>
              <figcaption className="info">
                  <a href={`/SingleProduct=${item.id}`} className="title text-dark">{item.title}</a>
                  <p className="text-muted small">Author: {item.author}, 
                  <br /> Publisher: {item.publisher}</p>
              </figcaption>
          </figure>
      </td>
      <td>
        <button className="btn btn-light" onClick={() => {onRemoveFromCart(item)}}>-</button>
      </td>
      <td>
        <h3>{item.quantity}</h3>
      </td>
      <td>
        <button className="btn btn-light" onClick={() => {onAddToCart(item)}}>+</button> 
      </td>
      <td> 
          <div className="price-wrap"> 
              <var className="price">{(item.price * item.quantity).toFixed(2) + " TL"} </var> 
              <small className="text-muted"> {(item.price).toFixed(2) + " TL each"} </small> 
          </div> 
      </td>
      <td className="text-right"> 
        <button data-original-title="Save to Wishlist" title="" className="btn btn-light mr-2" data-toggle="tooltip" onClick={() => {onAddToWishList(item)}}> <i className="fa fa-heart"></i></button>      
        <button className="btn btn-light" onClick={() => {onRemoveAll(item)}}> Remove All</button>
      </td>
  </tr>
  )
}

export default CartItem


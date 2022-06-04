import React from 'react';
import styled from 'styled-components';
import { checkLogInStatus } from '../helperFunctions/helperLogin';

const TextBox = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-transform: uppercase;
`;

const CartItem = ({item, onAddToCart, onRemoveFromCart, onRemoveAll, onAddToWishList}) => {
  return (
    <tr>              
      <td>
          <figure className="itemside">
              <div className="aside"><img src={item.img} alt="item-img" width="70"/></div>
              <figcaption className="info">
                  <a href={`/SingleProduct=${item.id}`} className="title text-dark"><TextBox>{item.title}</TextBox></a>
                  <p className="text-muted small">Author: {item.author}, 
                  <br />
                  <TextBox> Publisher: {item.publisher}</TextBox></p>
              </figcaption>
          </figure>
      </td>
      <td>
        <button className="btn btn-info" onClick={() => {onRemoveFromCart(item)}}>-</button>
      </td>
      <td>
        <h3>{item.quantity}</h3>
      </td>
      <td>
        <button className="btn btn-info" onClick={() => {onAddToCart(item)}}>+</button> 
      </td>
      <td> 
          <div className="price-wrap"> 
              <var className="price">{(item.price * item.quantity).toFixed(2) + " TL"} </var> 
              <small className="text-muted"> {(item.price).toFixed(2) + " TL each"} </small> 
          </div> 
      </td>
      <td className="text-right"> 
        {/* <button disabled={!checkLogInStatus()} data-original-title="Save to Wishlist" title="" className="btn btn-light mr-2" data-toggle="tooltip" onClick={() => {onAddToWishList(item)}}> <i className="fa fa-heart"></i></button>       */}
        <button className="btn btn-warning" onClick={() => {onRemoveAll(item)}}> Remove All</button>
      </td>
  </tr>
  )
}

export default CartItem


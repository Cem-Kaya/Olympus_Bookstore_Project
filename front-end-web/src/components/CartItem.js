import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: grey;
  position: relative;
  color: white;
`;

const Image = styled.img`
  padding-top:10px;
  height: 100px;
`;

const CartItem = ({item, onAddToCart, onRemoveFromCart, onRemoveAll}) => {
  return (
    <Container>
      <Image src={item.img} />
      <h3>{item.title + " " + item.author}</h3>
      <button onClick={() => {onRemoveFromCart(item)}}>Remove 1</button>
      <h3>{item.count}</h3>
      <button onClick={() => {onAddToCart(item)}}>Add 1</button>
      <h3>{item.price + " TL"}</h3>
      <button onClick={() => {onRemoveAll(item)}}>Remove All</button>
    </Container>
  )
}

export default CartItem
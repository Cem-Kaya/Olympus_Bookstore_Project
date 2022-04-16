import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/MainPageBody';

import { useState, useEffect } from 'react';

const Main = () => {
  
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    setCartItems(JSON.parse(window.localStorage.getItem('cart_items')));
  }, []);
  
  useEffect(() => {
    window.localStorage.setItem('cart_items', JSON.stringify(cartItems));
    if(cartItems === null)  {setCartItems([])}
  }, [cartItems]);
  
  const AddToCart = (item) => {
    
    let getItemAsList = cartItems.filter((elem) => elem.id === item.id)
    if(getItemAsList.length === 0)
    {
      item = {...item, count: 1}
      if(cartItems.length === 0){
        setCartItems([item])
      }
      else{
        setCartItems([...cartItems, item])
      }
    }
    else
    {
      setCartItems(
        cartItems.map(
          (elem) => elem.id === item.id ? { ...elem, count: elem.count + 1} : elem
        )
      )
    }
  }

  return (
    <div>
        <Header cartItems={cartItems} onAddToCart={AddToCart}></Header>
        <Body onAddToCart={AddToCart}></Body>
        <Footer></Footer>
    </div>
  )
}

export default Main
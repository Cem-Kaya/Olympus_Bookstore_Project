import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/MainPageBody';
import { popularProducts } from "../data"
import { useState, useEffect } from 'react';

const Main = () => {
  
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('cart_items')) === null){
      setCartItems([])
    }
    else{
      setCartItems(JSON.parse(window.localStorage.getItem('cart_items')))
    }
  }, []);
  
  useEffect(() => {
    if(cartItems === null)  {setCartItems([])}
    window.localStorage.setItem('cart_items', JSON.stringify(cartItems));
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
  }

  const HeaderAddToCart = (item) => {
    setCartItems(
      cartItems.map(
        (elem) => elem.id === item.id ? { ...elem, count: elem.count + 1} : elem
      )
    )
  }

  const HeaderRemoveFromCart = (item) => {
    let listOfItem = cartItems.filter((elem) => elem.id === item.id)
    let count = listOfItem[0].count

    if(count !== 1){
      setCartItems(
        cartItems.map(
          (elem) => elem.id === item.id ? { ...elem, count: elem.count - 1} : elem
        )
      )
    }
    else
    {
      let filteredState = cartItems.filter((elem) => elem.id !== item.id)
      filteredState.length === 0 ? setCartItems([]) : setCartItems([...filteredState])
    }
  }

  return (
    <div>
        <Header itemsInCart={cartItems} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
        <Body products={popularProducts} onAddToCart={AddToCart}></Body>
        <Footer></Footer>
    </div>
  )
}

export default Main
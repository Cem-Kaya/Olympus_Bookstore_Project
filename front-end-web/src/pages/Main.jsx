import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/MainPageBody';
import { popularProducts } from "../data"
import { useState, useEffect } from 'react';
import { add1Item, remove1Item } from '../helperFunctions/helperCartItems';

const Main = () => {
  
  const [cartItemsChanged, setCartItemsChanged] = useState(false);
    
  const AddToCart = (item) => {
    add1Item(item)
    setCartItemsChanged(!cartItemsChanged)
  }

  const HeaderAddToCart = (item) => {
    add1Item(item)
    setCartItemsChanged(!cartItemsChanged)
  }

  const HeaderRemoveFromCart = (item) => {
    remove1Item(item)
    setCartItemsChanged(!cartItemsChanged)
  }

  return (
    <div>
        <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
        <Body products={popularProducts} onAddToCart={AddToCart}></Body>
        <Footer></Footer>
    </div>
  )
}

export default Main
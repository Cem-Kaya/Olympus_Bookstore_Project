import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/MainPageBody';
import { useState, useEffect } from 'react';
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems';
import { fetchBooks } from '../helperFunctions/helperGetProducts';
import { addToWishList } from '../helperFunctions/helperWishList';

const Main = () => {
  
  const [cartItemsChanged, setCartItemsChanged] = useState(false)
  const [items, setItems] = useState([])
  const [tag, setTag] = useState("Best Seller")
  
  useEffect (() => {
    const getBooks = async () =>  {
      const itemsFromServer = await fetchBooks()
      setItems(itemsFromServer)
    }
    getBooks()
  }, [])

  const AddToCart = (item) => {
    addNewItem(item)
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

  const changeTag = (val) => {
    setTag(val)
  }

  const AddToWishList = async (item) => {
    const answer = await addToWishList(item.id)
  }

  return (
    <div>
      
        <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
        <Body products={items} onAddToCart={AddToCart} onChangeTag={changeTag} sortBy={tag} highToLow={true} onAddToWishList={AddToWishList}></Body>
        <Footer></Footer>
    </div>
  )
}

export default Main
import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/MainPageBody';
import { popularProducts } from "../data"
import { useState, useEffect } from 'react';
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems';

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

  const fetchBooks = async () => {
    const res = await fetch(`/all_books`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }}
     )
    const data = await res.json()

    console.log(data)
    return data
  }

  const AddToCart = async (item) => {
    await addNewItem(item)
    setCartItemsChanged(!cartItemsChanged)
  }

  const HeaderAddToCart = async (item) => {
    await add1Item(item)
    setCartItemsChanged(!cartItemsChanged)
  }

  const HeaderRemoveFromCart = async (item) => {
    await remove1Item(item)
    setCartItemsChanged(!cartItemsChanged)
  }

  const changeTag = (val) => {
    setTag(val)
  }

  return (
    <div>
      
        <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
        <Body products={items} onAddToCart={AddToCart} onChangeTag={changeTag} sortBy={tag} highToLow={true}></Body>
        <Footer></Footer>
    </div>
  )
}

export default Main
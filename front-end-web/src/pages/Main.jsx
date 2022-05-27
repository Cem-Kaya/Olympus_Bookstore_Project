import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories'
import Products from '../components/Products'
import MainPageFilterButtons from '../components/MainPageFilterButtons'
import Slider from '../components/Slider'
import { useState, useEffect } from 'react';
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems';
import { fetchBooks } from '../helperFunctions/helperGetProducts';
import { addToWishList, fetchWishList, removeFromWishList } from '../helperFunctions/helperWishList';
import styled from 'styled-components';
import { fetchCategories } from '../helperFunctions/helperCategories';


const Body = styled.div`
  background-color: #282c34;
  min-height: 1000px;
`;

{/*background-color: #282c34*/}
const BodyContainer = styled.div`
    width: 100%;
    padding-top: 60px;
    padding-bottom: 150px;
    padding-right: 50px;
    padding-left: 50px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: #282c34;
    align-items: stretch; 
`;

const LeftContainer = styled.div`
    width: 30%;
    padding-left: 20px;
    padding-right: 10px;
    float: right;
    justify-content: space-between;
`;

const RightContainer = styled.div`
    width: 67%;
    padding-left: 20px;
    padding-right: 10px;
    display:flex;
    flex-direction: column;
`;

const VisualPart = styled.div`
  align-items:center;
  justify-content: end;
  margin-left:8%;
`;

const Main = () => {
  
  const [cartItemsChanged, setCartItemsChanged] = useState(false)
  const [wishListChanged, setWishListChanged] = useState(false)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [wishListItems, setWishListItems] = useState([])
  const [tag, setTag] = useState("Best Seller")
  const [loaded, setLoaded] = useState(false)
  
  useEffect (() => {
    const getBooks = async () =>  {
      const itemsFromServer = await fetchBooks()
      const categoriesFromServer = await fetchCategories()
      const wishList = await fetchWishList()
      setCategories(categoriesFromServer)
      setItems(itemsFromServer)
      setWishListItems(wishList)
      setLoaded(true)
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
    setWishListChanged(!wishListChanged)
  }

  const RemoveFromWishList = async (item) => {
    await removeFromWishList(item.id)
    setWishListChanged(!wishListChanged)
  }

  return (
    <div>
      
        <Header itemsInCartChanged={cartItemsChanged} wishListChanged={wishListChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
        <Body>
        {
          !loaded ? 
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
            :
            <BodyContainer>
              <LeftContainer>
                <Categories categories={categories}/>
              </LeftContainer>
              <RightContainer>
                <VisualPart>
                  <Slider></Slider>
                </VisualPart>
                <MainPageFilterButtons onChangeTag={changeTag}/>
                <Products onAddToCart={AddToCart} products={items} wishList={wishListItems} sortBy={tag} highToLow={true} onAddToWishList={AddToWishList} onRemoveFromWishList={RemoveFromWishList}/>
              </RightContainer>
            </BodyContainer>
        }
        </Body>
        <Footer></Footer>
    </div>
  )
}

export default Main
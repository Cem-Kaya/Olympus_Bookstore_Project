import React from 'react'
import Header from '../components/Header'
import Footer from "../components/Footer"
import styled from "styled-components"
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import { useState, useEffect } from 'react'
import '../styles/ExtraStyles.css'
import { addNewItem, add1Item, remove1Item, getCartItems } from '../helperFunctions/helperCartItems'
import { Delete } from "@material-ui/icons"
import { fetchWishList, removeFromWishList } from "../helperFunctions/helperWishList"
import { checkLogInStatus } from '../helperFunctions/helperLogin'

const Body = styled.div`
  min-height: 500px;
  padding: 50px;
  text-align: left;
  font-size: 16px;
`;


const WishList = () => {

  const [loaded, setLoaded] = useState(false)
  const [cartItemsChanged, setCartItemsChanged] = useState(false)
  const [wishlistChanged, setWishlistChanged] = useState(false)
  const [items, setItems] = useState([])
  
  useEffect (() => {
    const getBooks = async () =>  {
      const itemsFromServer = await fetchBooks()
      const wishList = await fetchWishList()
      console.log(wishList)
            
      let wishListedIds = wishList.map(item => item.Pid)
      let wishListedItems = itemsFromServer.filter(item => wishListedIds.includes(item.id) ? item : "")

      setItems(wishListedItems)
      setLoaded(true)
    }
    if(checkLogInStatus()){
      getBooks()
    }
    else{
      setLoaded(true)
    }
    
  }, [wishlistChanged])

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

  const RemoveFromWishList = async (item) => {
    await removeFromWishList(item.id)
    setWishlistChanged(!wishlistChanged)
  }

  return (
    <div>
      <Header itemsInCartChanged={cartItemsChanged} wishListChanged={wishlistChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
      <Body className='bg-secondary'>
      {
        !loaded ? 
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        :
        !checkLogInStatus() ?
        <h3 className='text-white'>Please Log In First</h3>
        :
        items.length === 0 ?
        <h3 className='text-white'>Your Wishlist is Empty</h3>
        :
        <div className="cart-wrap">
          <div className="container">

                <div className="row">
                <div className="col-md-12">
                    <div className="main-heading mb-6 text-white text-center"><h3>My Wishlist</h3></div><br></br><br></br>
                    <div className="table-wishlist">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                          <tr>
                            <th width="45%" className='text-white'><h5>Product Name</h5></th>
                            <th width="5%" className='text-white'></th>
                            <th width="15%" className='text-white'><h5>Unit Price</h5></th>
                            <th width="15%" className='text-white'><h5>Stock Status</h5></th>
                            <th width="15%" className='text-white'></th>
                            <th width="10%" className='text-white'></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map(elem => (
                            <tr className='container'>
                              <td width="40%">
                                <div className="display-flex align-center">
                                    <a href={`/SingleProduct=${elem.id}`}>
                                    <div className="img-product">
                                        <img src={elem.img} alt="" className="mCS_img_loaded"/>
                                    </div></a>
                                    <a href={`/SingleProduct=${elem.id}`}>
                                    <div className="text-white">
                                        {elem.title}
                                    </div></a>
                                </div>
                              </td>

                              <td width="5%">
                              </td>

                              <td width="15%" className="price text-white">{elem.price.toFixed(2)} TL</td>
                              {elem.in_stock === 0?
                                <td width="15%" className="text-danger">Not In Stock</td>
                               : elem.in_stock <= 5?
                                <td width="15%" className="text-warning">{elem.in_stock} left in stock</td>
                               :
                                <td width="15%" className="text-info">{elem.in_stock} left in stock</td>
                              }
                              <td width="20%">
                                {
                                  getCartItems().filter(item => item.id === elem.id).length !== 0 ?
                                  <button className="btn btn-info text-uppercase mr-2 px-4" disabled={true}>Already in the Cart</button>
                                  :
                                  <button className="btn btn-info text-uppercase mr-2 px-4" onClick={() => {AddToCart(elem)}} disabled={elem.in_stock === 0}>Add to Cart</button>
                                }
                              </td>
                              <td width="5%" className="text-center"><button className="btn btn-warning" onClick={() => {RemoveFromWishList(elem)}}> <Delete/> </button></td>
                            </tr>
                            
                          ) )}

                        </tbody>
                      </table>
                  </div>
                </div>
            </div>
          </div>
        </div>
        }
      </Body>
      <Footer></Footer>
    </div>
  );
}

export default WishList
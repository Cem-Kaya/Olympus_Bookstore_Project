import React from 'react'
import Header from '../components/Header'
import Footer from "../components/Footer"
import styled from "styled-components"
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import { useState, useEffect } from 'react'
import '../components/ExtraStyles.css'
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems'
import { Delete } from "@material-ui/icons"
import { fetchWishList } from "../helperFunctions/helperWishList"
import { checkLogInStatus } from '../helperFunctions/helperLogin'

const Body = styled.div`
  min-height: 500px;
  padding: 50px;
  background-color: #660033;
  text-align: left;
  font-size: 16px;
`;


function WishList() {

  const [cartItemsChanged, setCartItemsChanged] = useState(false)
  const [items, setItems] = useState([])
  
  useEffect (() => {
    const getBooks = async () =>  {
      const itemsFromServer = await fetchBooks()
      const wishList = await fetchWishList()
      console.log(wishList)
            
      let wishListedIds = wishList.map(item => item.Pid)
      let wishListedItems = itemsFromServer.filter(item => wishListedIds.includes(item.id) ? item : "")

      setItems(wishListedItems)
    }
    if(checkLogInStatus()){
      getBooks()
    }
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

  return (
    <div>
      <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
      <Body>
      {
        !checkLogInStatus() ?
        <h3 className='text-light'>Please Log In First</h3>
        :
        <div className="cart-wrap">
          <div className="container">

                <div className="row">
                <div className="col-md-12">
                    <div className="main-heading mb-6 text-light text-center"><h3>My Wishlist</h3></div><br></br><br></br>
                    <div className="table-wishlist">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                          <tr>
                            <th width="45%" className='text-light'><h5>Product Name</h5></th>
                            <th width="15%" className='text-light'><h5>Unit Price</h5></th>
                            <th width="15%" className='text-light'><h5>Stock Status</h5></th>
                            <th width="15%" className='text-light'></th>
                            <th width="10%" className='text-light'></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map(elem => (
                            <tr className='container'>
                              <td width="45%">
                                <div className="display-flex align-center">
                                    <a href={`/SingleProduct=${elem.id}`}>
                                    <div className="img-product">
                                        <img src={elem.img} alt="" className="mCS_img_loaded"/>
                                    </div></a>
                                    <a href={`/SingleProduct=${elem.id}`}>
                                    <div className="text-light">
                                        {elem.title}
                                    </div></a>
                                  
                                </div>
                              </td>
                              <td width="15%" className="price text-light">{elem.price.toFixed(2)} TL</td>
                              {elem.in_stock === 0?
                                <td width="15%" className="text-danger">Not In Stock</td>
                               : elem.in_stock <= 5?
                                <td width="15%" className="text-warning">{elem.in_stock} left in stock</td>
                               :
                                <td width="15%" className="text-info">{elem.in_stock} left in stock</td>
                              }
                              <td width="15%">
                                <button className="btn btn-info text-uppercase mr-2 px-4" onClick={() => {AddToCart(elem)}} disabled={elem.in_stock === 0}>Add to Cart</button>
                              </td>
                              <td width="10%" className="text-center"><button className="btn btn-warning"> <Delete/> </button></td>
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
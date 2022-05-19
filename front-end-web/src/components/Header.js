import {
  AccountCircle,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  ShoppingCart,
  Favorite,
} from "@material-ui/icons";

import logo from '../assets/OlympusLogo.png';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';
import { checkLogInStatus, logOut, getUserID } from "../helperFunctions/helperLogin";
import { add1Item, remove1Item, getCartItems } from '../helperFunctions/helperCartItems';
import { fetchWishList } from "../helperFunctions/helperWishList";

const HeaderDark = styled.div`
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
  height: 80px;
  background-color: #282c34;
  color: aliceblue;
  border-bottom: 2px solid pink;
  `;

const Container = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px, 0px;
  max-height: 100%;
  height:100px;
  position:relative;
  `;

const RightContainer = styled.div`
  display: flex;
  height: inherit;
  padding-left: 50px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  `;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropDownItem = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
`;

const DropDownItemCount = styled.div`
  display:flex;
  justify-content: space-between;
`;


const Header = ({itemsInCartChanged, onAddToCart, onRemoveFromCart, addToCartAllowed}) => {
  const history= useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const [dropDownOpenAccount, setDropDownOpenAccount] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [title, setTitle] = useState("");
  const [selection, setSelection] = useState("");
  //const [wishListLen, setWishListLen] = useState(0);

  useEffect(() => {
    setCartItems(getCartItems())
  }, [itemsInCartChanged]);

  useEffect(() => {
    console.log(checkLogInStatus())
    setLoginStatus(checkLogInStatus())
  }, []);

  // useEffect(() => {
  //   const getWishListLength = async () => {
  //     const wishList = await fetchWishList()
  //     setWishListLen(wishList.length())
  //   }
  //   getWishListLength()
  // }, []);

  const handleDropdownOpen = () => {
    setdropDownOpen(!dropDownOpen);
  };

  const handleDropdownOpenAccount = () => {
    setDropDownOpenAccount(!dropDownOpenAccount);
  };

  const searchButtonClicked = () => {
    let selected = selection;
    if(selected.trim() === '')  {selected = "Title"}
    selected = selected.toLowerCase()
    if(selected === "title"){
      history(`/Search/${selected}=${title}/&author=*/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
    }
    else if(selected === "description"){
      history(`/Search/${selected}=${title}/&author=*/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
    }
    else{
      history(`/Search/category=*/&${selected}=${title}/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
    }
  }

  const HeaderAddToCart = (item) => {
    add1Item(item)
    setCartItems(getCartItems())
  }

  const HeaderRemoveFromCart = (item) => {
    remove1Item(item)
    setCartItems(getCartItems())

  }

  const LogOut = () => {
    logOut()
    setLoginStatus(false)
    history("/")
  }

  const getWishListLength = async () => {
    const wishList = await fetchWishList()
    return wishList.length()
  }

  return (
    <HeaderDark>
        <Container>
          <button className='button_h' onClick={() => {history('/')}}>
            <img className='image' src={logo} alt="logo"/>
            Olympus Bookstore
          </button>
          <div className="input-group mb-0" style={{width:"540px"}}>
              <div className="input-group-prepend">
                <button className="btn btn-outline-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{selection === "" ? "Search for" : selection} </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => {setSelection("Title")}}>Title</button>
                  <button className="dropdown-item" onClick={() => {setSelection("Author")}}>Author</button>
                  <button className="dropdown-item" onClick={() => {setSelection("Description")}}>Description</button>
                </div>
              </div>
              <input type="text" className="form-control" placeholder="Search..." aria-label="Text input with dropdown button" onChange={event => setTitle(event.target.value)} onKeyDown={e => e.key === 'Enter' && searchButtonClicked()}/>
            </div>
            <RightContainer>
              {
                loginStatus ? 
                <Dropdown>
                  <button className='buttonStyle' onClick={() =>{handleDropdownOpenAccount()}}>
                    {getUserID()}
                    <AccountCircle/>
                  </button>
                  {dropDownOpenAccount && (<div className="dropdown">
                      <ul>
                        <li>
                          <DropDownItem>  
                            <button className='buttonStyle' onClick={() =>{history('/Account')}}>
                              Go to Account Page
                            </button>
                          </DropDownItem>
                          <DropDownItem>  
                            <button className='buttonStyle' onClick={() =>{LogOut()}}>
                              Log Out
                            </button>
                          </DropDownItem>
                        </li>
                      </ul>
                  </div>)}
              </Dropdown>
                :
                <button className='buttonStyle' onClick={() =>{history('/Login')}}>
                  Log In/Sign Up
                  <AccountCircle/>
                </button>
              }
              <button className='buttonStyle' onClick={() =>{history('/WishList')}}>
                Wish List
                <div className="widget-header">    
                  <Favorite/>
                    {/* {wishListLen === 0 ? <FavoriteBorderOutlined/> : 
                    <><Favorite/>
                    <span className="badge badge-pill badge-danger notify">{cartItems.length}</span></>} */}
                </div>
                
              </button>
              <Dropdown>
                <button className='buttonStyle'
                  onClick={() => {handleDropdownOpen()}}>
                    My Cart  
                  <div className="widget-header">    
                    {cartItems.length === 0 ? <ShoppingCartOutlined/> : 
                    <><ShoppingCart/>
                    <span className="badge badge-pill badge-danger notify">{cartItems.length}</span></>}
                  </div>
                </button>
                {dropDownOpen && addToCartAllowed !== false && (<div className="dropdown">
                    <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                          <DropDownItem>  
                            <a href={`SingleProduct=${item.id}`}><p className="text-white">{item.title}</p></a>
                            <small>{item.in_stock + " in stock"}</small>
                            <DropDownItemCount>
                              <button className="btn-primary" onClick={() =>{itemsInCartChanged === undefined ? HeaderRemoveFromCart(item) : onRemoveFromCart(item)}}>-</button>
                              <p>{" " + item.quantity + " "}</p>
                              <button className="btn-primary" onClick={() =>{itemsInCartChanged === undefined ? HeaderAddToCart(item) : onAddToCart(item)}}>+</button>
                            </DropDownItemCount>  
                          </DropDownItem>
                        </li>
                      ))}
                        <button className="btn btn-primary" onClick={() => {history('/MyCart')}}>
                          Go to My Cart  
                        </button>
                    </ul>
                  </div>)}
              </Dropdown>
            </RightContainer>
        </Container>
    </HeaderDark>
  )
}

export default Header
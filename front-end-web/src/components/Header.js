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
import '../styles/App.css';
import { useState, useEffect } from 'react';
import { checkLogInStatus, logOut, getUserID } from "../helperFunctions/helperLogin";
import { add1Item, remove1Item, getCartItems } from '../helperFunctions/helperCartItems';
import { fetchWishList } from "../helperFunctions/helperWishList";
import "../styles/ExtraStylesHeader.css"

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

const TextBoxBookTitle = styled.div`
    text-align:left;
    font-size:16px;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;


const Header = ({itemsInCartChanged, wishListChanged, onAddToCart, onRemoveFromCart, addToCartAllowed}) => {
  const history= useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const [dropDownOpenAccount, setDropDownOpenAccount] = useState(false)
  const [dropdownOpenManagerLogin, setDropdownOpenManagerLogin] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [title, setTitle] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    setCartItems(getCartItems())
  }, [itemsInCartChanged]);

  useEffect(() => {
    const getWishList = async () => {
      const wishlist = await fetchWishList()
      setWishListItems(wishlist)
    }
    getWishList()
  }, [wishListChanged]);

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

  const handleDropdownOpenManagerLogin = () => {
    setDropdownOpenManagerLogin(!dropdownOpenManagerLogin);
  };

  const searchButtonClicked = () => {
    let selected = selection;
    if(selected.trim() === '')  {selected = "Title"}
    selected = selected.toLowerCase()
    if(selected === "title"){
      history(`/Search/page=1/&${selected}=${title}/&author=*/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
    }
    else if(selected === "description"){
      history(`/Search/page=1/&${selected}=${title}/&author=*/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
    }
    else{
      history(`/Search/page=1/&category=*/&${selected}=${title}/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
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
            <Dropdown>
                <button className='buttonStyle' onClick={() =>{handleDropdownOpenManagerLogin()}}>
                  Manager Login
                </button>
                {dropdownOpenManagerLogin && (<div className="dropdown" style={{margin:"0px"}}>
                      <ul>
                        <li>
                          <DropDownItem>  
                            <button className='buttonStyle2' onClick={() =>{history('/StoreLogin')}}>
                              Log In to your Store
                            </button>
                          </DropDownItem>
                          <DropDownItem>  
                            <button className='buttonStyle2' onClick={() =>{history('/ProductManagementLogin')}}>
                              Log In to your Product Management Page
                            </button>
                          </DropDownItem>
                        </li>
                      </ul>
                  </div>)}
              </Dropdown>
              <Dropdown>
                  {loginStatus ? 
                    <button className='buttonStyle' onClick={() =>{handleDropdownOpenAccount()}}>
                      {getUserID()}
                      <AccountCircle/>
                    </button>
                    :
                    <button className='buttonStyle' onClick={() =>{history('/Login')}}>
                        Login/Signup
                        <AccountCircle/>
                    </button>}
                  {dropDownOpenAccount && (<div className="dropdown">
                      <ul>
                        <li>
                          <DropDownItem>  
                            <button className='buttonStyle' onClick={() =>{history('/Account')}}>
                              Go to Account Page
                            </button>
                          </DropDownItem>
                          <DropDownItem>  
                            <button className='buttonStyle' onClick={() =>{LogOut(); handleDropdownOpenAccount()}}>
                              Log Out
                            </button>
                          </DropDownItem>
                        </li>
                      </ul>
                  </div>)}
              </Dropdown>
              <button className='buttonStyle' onClick={() =>{history('/WishList')}}>
                Wish List
                <div className="widget-header">  
                    {console.log(wishListItems.length)}  
                    {wishListItems.length === 0 ? <FavoriteBorderOutlined/> : 
                    <><Favorite/>
                    <span className="badge badge-pill badge-danger notify">{wishListItems.length}</span></>}
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
                {dropDownOpen && addToCartAllowed !== false && (<div className="dropdown bg-dark">
                    <ul>
                    {cartItems.map((item) => (
                      <div key={item.id} data-testid={item.id}>
                        <li>
                          <DropDownItem>  
                            <a href={`SingleProduct=${item.id}`}><TextBoxBookTitle className="text-white">{item.title}</TextBoxBookTitle></a>
                            <DropDownItemCount>
                              <button className="btn-primary" onClick={() =>{itemsInCartChanged === undefined ? HeaderRemoveFromCart(item) : onRemoveFromCart(item)}}>-</button>
                              <input type="number" id="number" value={item.quantity} />
                              <button className="btn-primary" onClick={() =>{itemsInCartChanged === undefined ? HeaderAddToCart(item) : onAddToCart(item)}}>+</button>
                            </DropDownItemCount>
                          </DropDownItem>
                        </li>
                        <hr className="bg-light"></hr>
                      </div>
                      ))}
                      <li>
                        <button className="btn-block btn-primary" style={{height:"50px"}} onClick={() => {history('/MyCart')}}>
                          Go to My Cart  
                        </button>
                      </li>
                    </ul>
                  </div>)}
              </Dropdown>
            </RightContainer>
        </Container>
    </HeaderDark>
  )
}

export default Header
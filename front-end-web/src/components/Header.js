import {
  AccountCircle,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  ShoppingCart,
} from "@material-ui/icons";

import logo from '../assets/OlympusLogo.png';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import React from "react";
import '../App.css';
import { useState, useEffect } from 'react';

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


const Header = ({itemsInCart, onAddToCart, onRemoveFromCart, addToCartAllowed}) => {
  const history= useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    if(itemsInCart !== undefined || itemsInCart !== null) {
      setCartItems(itemsInCart)
    }
    else if(JSON.parse(window.localStorage.getItem('cart_items')) === null){
      setCartItems([])
    }
    else{
      setCartItems(JSON.parse(window.localStorage.getItem('cart_items')));
    }
  }, [itemsInCart]);

  useEffect(() => {
    if(cartItems === null)  {setCartItems([])}
    if(itemsInCart === undefined){
      window.localStorage.setItem('cart_items', JSON.stringify(cartItems))
    }
  }, [cartItems, itemsInCart]);

  const handleDropdownOpen = () => {
    setdropDownOpen(!dropDownOpen);
  };

  const searchButtonClicked = () => {
    let selected = selection;
    if(selected.trim() === '')  {selected = "Title"}
    selected = selected.toLowerCase()
    if(selected === "title"){
      history(`/Search/${selected}=${title}/&author=*/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
    }
    else{
      history(`/Search/category=*/&${selected}=${title}/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
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
                  <button className="dropdown-item" onClick={() => {setSelection("Description")}}>Publisher</button>
                </div>
              </div>
              <input type="text" className="form-control" placeholder="Search..." aria-label="Text input with dropdown button" onChange={event => setTitle(event.target.value)} onKeyDown={e => e.key === 'Enter' && searchButtonClicked()}/>
            </div>
            <RightContainer>
              <button className='buttonStyle' onClick={() =>{history('/Login')}}>
                Log In/Sign Up
                <AccountCircle/>
              </button>
              <button className='buttonStyle' onClick={() =>{history('/WishList')}}>
                Wish List
                <FavoriteBorderOutlined/>
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
                            <p>{item.title}</p>
                            <DropDownItemCount>
                              <button className="btn-primary" onClick={() =>{itemsInCart === undefined ? HeaderRemoveFromCart(item) : onRemoveFromCart(item)}}>-</button>
                              <p>{" " + item.count + " "}</p>
                              <button className="btn-primary" onClick={() =>{itemsInCart === undefined ? HeaderAddToCart(item) : onAddToCart(item)}}>+</button>
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
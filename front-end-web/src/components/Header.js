import {
  AccountCircle,
  Search,
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


const Header = ({itemsInCart, onAddToCart, onRemoveFromCart}) => {
  const history= useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [dropDownOpen, setdropDownOpen] = useState(false);

  useEffect(() => {
    if(itemsInCart !== undefined) {setCartItems(itemsInCart)}
    else{setCartItems(JSON.parse(window.localStorage.getItem('cart_items')));}
  }, [itemsInCart]);

  const handleDropdownOpen = () => {
    setdropDownOpen(!dropDownOpen);
  };

  return (
    <HeaderDark>
        <Container>
          <button className='button_h' onClick={() => {history('/')}}>
            <img className='image' src={logo} alt="logo"/>
            Olympus Bookstore
          </button>
            <div className='inputWithButton'>
                <input type="text" placeholder='Search...'/>
                <button>
                  <Search style={{cursor:"pointer"}}/>
                </button>
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
                {dropDownOpen && (<div className="dropdown">
                    <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                          <DropDownItem>  
                            <p>{item.title}</p>
                            <DropDownItemCount>
                              <button onClick={() =>{onRemoveFromCart(item)}}>-</button>
                              <p>{" " + item.count + " "}</p>
                              <button onClick={() =>{onAddToCart(item)}}>+</button>
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
import {
  AccountCircle,
  Search,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

import '../App.css';
import logo from '../assets/OlympusLogo.png';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import React from "react";

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

const Header = ({cartItems}) => {
  const history= useNavigate();
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
              <button className='buttonStyle' 	
                onClick={() => {history('/MyCart',
                                {state: cartItems})}}>
                My Cart
                <ShoppingCartOutlined/>
              </button>
            </RightContainer>
        </Container>
    </HeaderDark>
  )
}

export default Header
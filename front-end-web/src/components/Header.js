import {
  AccountCircle,
  Search,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

import '../App.css';
import logo from '../logo512.png';
import styled from "styled-components";

const HeaderDark = styled.div`
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
  height: 80px;
  background-color: #282c34;
  color: aliceblue;
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
  height: 100px;
  padding-left: 50px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  `;

const Header = () => {
  return (
    <HeaderDark>
        <Container>
          <button className='button_h'>
            <img className='image' src={logo} alt="logo" />
            Olympus Bookstore
          </button>
            <div className='inputWithButton'>
                <input type="text" placeholder='Search...'/>
                <button>
                  <Search style={{cursor:"pointer"}}/>
                </button>
            </div>
            <RightContainer>
              <button className='buttonStyle'>
                Log In/Sign Up
                <AccountCircle/>
              </button>
              <button className='buttonStyle'>
                Favourites
                <FavoriteBorderOutlined/>
              </button>
              <button className='buttonStyle'>
                My Cart
                <ShoppingCartOutlined/>
              </button>
            </RightContainer>
        </Container>
    </HeaderDark>
  )
}

export default Header
import {
  DoubleArrow,
} from "@material-ui/icons";

import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";

const TextStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Container = styled.div`
  height: 500px;
  display:flex;
  flex-direction: row;
  background-color: #330033;
  color: white;
`;

const LeftContainer = styled.div`
  margin: auto;
  width: 40%;
  height: 100%;
  padding: 10px;
  display: inline-block;
`;

const RightContainer = styled.div`
  width: 60%;
  height: 100%;
  padding: 10px;
  vertical-align: middle;
  horizontal-align: middle;
  display: inline-block;
  justify-content: center;
`;

const Account = () => {
  let navigate = useNavigate();
  const categories = ["My Store", "Order History"]
  const links = ["/StoreLogin", "/OrderHistory"]

  return (
    <div>
      <Header></Header>
      <Container>
        <LeftContainer>
        <div className="button-group-vertical">
            {categories.map((element, index) => (
                <button className='button' key={index}
                    onClick={() => {
                        navigate(links[index])
                    }}>
                    <TextStyle>
                      {element}<DoubleArrow/>
                    </TextStyle>
                </button>
            ))}
        </div>
        </LeftContainer>
        <RightContainer>
        <h4>Account Info</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </RightContainer>
      </Container>
      <Footer></Footer>
    </div>
  )
}

export default Account
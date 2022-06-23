import styled from "styled-components";
import React from 'react';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg")
      center;
  background-size: cover;
  justify-content: space-around;
  
 
`;

const Wrapper = styled.div`
  padding: 80px;
  width: 60vh;
  display: flex;
  margin-top:10vh;
  margin-left:70vh;
  background-color:white;
  display: flex;
  flex-direction: column;
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
 
  padding: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ProductManSignin = ({ onLogin, onWrongInput }) => {
  let name = ""
  let password = ""

  const setName = (val) => {
		name = val
	}
  const setPassword = (val) => {
		password = val
	}
  const checkAndSubmit = () => {
    if(name === "" || password === ""){
      onWrongInput("Name and password can not be empty string")
    }
    else
    {
      const sha2_256 = require('simple-js-sha2-256')
      password = sha2_256(password)
      onLogin(name.trim(), password)
    }
  }
  
  return (
      <Wrapper>
        <Title>LOG IN TO YOUR PRODUCT MANAGEMENT PAGE</Title>
        <UserInfo>
          <Input placeholder="name" onChange={event => setName(event.target.value)}/>
          <Input placeholder="password" onChange={event => setPassword(event.target.value)}/>
          <Button onClick={() => {checkAndSubmit()}}>LOGIN</Button>
        </UserInfo>
      </Wrapper>
  );
};

export default ProductManSignin;
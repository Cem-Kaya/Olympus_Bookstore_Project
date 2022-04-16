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
  padding: 20px;
  height:60%;
  width: 60vh;
  display: flex;
  margin-top:5vh;
  margin-left:70vh;
  background-color:white;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
 
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Formrow = styled.form`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

export const Signup = () => {
  return (
    <Wrapper>
      <Title>CREATE AN ACCOUNT</Title>
      <Form>
        <Formrow>
        <Input placeholder="name" />
        <Input placeholder="last name" />

        </Formrow>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Input placeholder="confirm password" />
        <Button>CREATE</Button>
      </Form>
    </Wrapper>
  )
}
export default Signup;
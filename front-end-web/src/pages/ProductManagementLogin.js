import styled from "styled-components";
import React, { useState } from "react";
import Header from "../components/Header";
import ProductManSignin from '../components/ProductManSignin'
import ProductManSignup from '../components/ProductManSignup'
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #282c34;
  background-size: cover;
  justify-content: center;
  align-items:center
`;
const Button = styled.button`
  width: 10%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  margin-right:24px;
`;

const ProductManagementLogin = () => {
    const types= ['LOGIN', 'SIGNUP'];
    const [type,setType]= useState();
      
    function ToogleGroup(){
    
      const isempty = type==='';
      if (isempty) {
          setType(types[0])   
      }
      const istype = type==='LOGIN';
        return(
          <Container>
          <Form>
            {types.map((type, index) =>(
              <Button  key={index} onClick={()=> setType(type)}>
                {type}
              </Button>
            ))}
          </Form>
          {istype ? (<ProductManSignin></ProductManSignin>) : (<ProductManSignup></ProductManSignup>)      
          }
          </Container>
        );
      }
      return (
       <div>
         <Header></Header>
         <ToogleGroup/>
          <Footer></Footer>
       </div>
      );
}

export default ProductManagementLogin
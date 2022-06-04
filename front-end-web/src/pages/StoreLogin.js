import styled from "styled-components";
import React, { useState } from "react";
import Header from "../components/Header";
import StoreSignin from '../components/StoreSignin'
import StoreSignup from '../components/StoreSignup'
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { checkStoreLogInStatus, getStoreManagerID, storeLogIn, storeSignUp } from "../helperFunctions/helperLogin";
import Alert from 'react-bootstrap/Alert'

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

const StoreLogin = () => {

  let loginStatus = false
  const navigate = useNavigate()

  const LogIn = async (username, passHash) =>  {
    try{
      const serverAnswer = await storeLogIn(username, passHash)
      console.log("Server answer: " , serverAnswer)
      setValues(serverAnswer)
    }
    catch (e){
      console.log(e)
    }
    if(checkStoreLogInStatus()){
      navigate(`/Store=${getStoreManagerID()}`)
    }
    else{
      setMessageFunction("Could Not Log In")
    }
  }
  
  const SignUp = async (username, passHash) =>  {
    try{
      const serverAnswer = await storeSignUp(username, passHash)
      setValues(serverAnswer)
    }
    catch(e){
      console.log(e)
    }

    if(checkStoreLogInStatus()){
      navigate(`/Store=${getStoreManagerID()}`)
    }
    else{
      setMessageFunction("Could Not Sign Up")
    }
  }

  const setMessageFunction = (message) => {
    setErrorMessage(message)
    setAlertBoxOpen(true)
  }

  const setValues = (serverAnswer) => {
    loginStatus = serverAnswer["status"]
    console.log(loginStatus)
  }
  
    const types= ['LOGIN', 'SIGNUP'];
    const [type,setType]= useState();
    const [alertBoxOpen, setAlertBoxOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
      
    function ToogleGroup(){
    
      const isempty = type==='';
      if (isempty) {
          setType(types[0])   
      }
      const istype = type==='LOGIN';
        return(
          <Container>
            <Alert key={"danger"} show={alertBoxOpen} variant={"danger"}>
              {errorMessage}
            </Alert>
          <Form>
            {types.map((type, index) =>(
              <Button  key={index} onClick={()=> {setType(type); setAlertBoxOpen(false)}}>
                {type}
              </Button>
            ))}
          </Form>
          {istype ? (<StoreSignin onLogin={LogIn} onWrongInput={setMessageFunction}></StoreSignin>) 
            :
                    (<StoreSignup onSignUp={SignUp} onWrongInput={setMessageFunction}></StoreSignup>)      
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

export default StoreLogin
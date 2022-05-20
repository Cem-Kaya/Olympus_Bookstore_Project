import {
  DoubleArrow,
} from "@material-ui/icons";

import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import { checkLogInStatus, getUserID } from "../helperFunctions/helperLogin";

const TextStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Container = styled.div`
  display:flex;
  flex-direction: row;
  color: white;
`;

const Body = styled.div`
  height: 500px;
  background-color: #660033;
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
  const categories = ["Account" ,"Order History", "My Store", "Product Management"]
  const links = ["/Account", "/OrderHistory", "/StoreLogin", "/ProductManagement"]
  const [info, setInfo] = useState({name: "", pass_hash: "", status: false, uid: "", homeaddress: ""})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(checkLogInStatus() === false){
      navigate("/")
    }
  }, [navigate]);

  useEffect (() => {
    const getInfo = async () =>  {
      const itemsFromServer = await fetchInfo()
      console.log(itemsFromServer)
      setInfo(itemsFromServer)
      setLoaded(true)
    }
    getInfo()
  }, [])

  const fetchInfo = async () => {
    const res = await fetch('/customer_info/submit', {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email: getUserID()})
    })
    const data = await res.json()

    console.log(data)
    return data
  }

  return (

    <div>
      <Header></Header>
      <Body>
      {
        !loaded ? 
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        :
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
        { info.status === true ?
          <RightContainer>
            <h4>Account Info</h4><br></br>
            <h5>Name: {info.name}</h5><br></br>
            <h5>E-mail: {info.uid}</h5><br></br>
            <h5>Address: {info.homeaddress}</h5><br></br>
          </RightContainer>
          : ""
        }
        </Container>
      }
      </Body>
      <Footer></Footer>
    </div>
  )
}

export default Account
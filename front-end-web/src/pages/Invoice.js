import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Body = styled.div`
    height: 600px;

`;

const Invoice = () => {

    const [did, setDid] = useState("")
    const [invoice, setInvoice] = useState("")

    useEffect (() => {
        setDid(console.log(JSON.parse(window.localStorage.getItem('did'))))
    }, [])
    
  return (
    did === "" ?  <></>
    :
    <div>
        <Header></Header>
            <Body>Success</Body>
        <Footer></Footer>
    </div>
  )
}

export default Invoice
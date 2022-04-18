//Products.js and MyCart.js needs update

import React from 'react'
import CartItems from '../components/CartItems'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';
import { useLocation  } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 80px 50px;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
`;

const SummaryContainer = styled.div`
  width: 20%;
  height: 500px;
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  background-color: white;
  position: relative;
  margin-right: 100px;
  border: 1px solid pink;
  text-align: left;
`;

const TextHeader = styled.div`
  text-align: center;
  font-size: 30px;
`;

const ProductBoxContainer = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  border: 1px solid pink;
  margin-right: 50px;
`;

const ButtonStyle = styled.div`
  background-color: #282c34;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  margin: 2px 2px;
  cursor: pointer;
  align-items: center;
`;

const MyCart = ({params}) => {

  const [items, setItems] = useState([]);
  
  let location = useLocation();
  console.log(location)
  let itemList = location.state;
  console.log(itemList)

  useEffect(() => {
    setItems(itemList);
  }, [itemList]);

  useEffect(() => {
    window.localStorage.setItem('cart_items', JSON.stringify(items));
    if(items === null)  {setItems([])}
  }, [items]);

  const costOfItems = () => {
    let sum = 0;
    items.forEach(element => {
      sum += (element.price * element.count);
    });
    return sum;
  }

  const RemoveAllFromCart = (item) => {

    let filteredState = items.filter((elem) => elem.id !== item.id)
    filteredState.length === 0 ? setItems([]) : setItems([...filteredState])
    
  }

  const RemoveFromCart = (item) => {
    let listOfItem = items.filter((elem) => elem.id === item.id)
    let count = listOfItem[0].count

    if(count !== 1){
      setItems(
        items.map(
          (elem) => elem.id === item.id ? { ...elem, count: elem.count - 1} : elem
        )
      )
    }
    else
    {
      let filteredState = items.filter((elem) => elem.id !== item.id)
      filteredState.length === 0 ? setItems([]) : setItems([...filteredState])
    }
  }

  const AddToCart = (item) => {

    let getItemAsList = items.filter((elem) => elem.id === item.id)
    if(getItemAsList.length === 0)
    {
      item = {...item, count: 1}
      if(items.length === 0){
        setItems([item])
      }
      else{
        setItems([...items, item])
      }
    } 
    else
    {
      setItems(
        items.map(
          (elem) => elem.id === item.id ? { ...elem, count: elem.count + 1} : elem
        )
      )
    }
  }

  return (
    <div>
      <Header cartItems={items}/>
      <Container>
        <ProductBoxContainer>
          {items.length === 0 ? <h1>There are no products, start adding some!</h1>
           : <CartItems 
              items={items} 
              onRemoveAll={RemoveAllFromCart}
              onRemoveFromCart={RemoveFromCart}
              onAddToCart={AddToCart}/>}
        </ProductBoxContainer>
        <SummaryContainer>
          <TextHeader>Order Summary</TextHeader>
          <p>{`${items.length} Products`}</p>
          <p>{`Cost: ${costOfItems()} TL`}</p>
          <p>{`Shipment Cost: 10 TL`}</p>
          <p>{`Total Cost: ${costOfItems() + 10} TL`}</p>
          <p>{`Amount to Pay: ${costOfItems() + 10} TL`}</p>
          <ButtonStyle>Complete Transaction</ButtonStyle>
        </SummaryContainer>
      </Container>
      <Footer />
    </div>
  )
}

export default MyCart;
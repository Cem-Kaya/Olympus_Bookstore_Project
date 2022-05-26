import styled from "styled-components"
import Categories from './Categories'
import Products from './Products'
import MainPageFilterButtons from './MainPageFilterButtons'
import Slider from './Slider'
import React from 'react'
import Product from "./Product"

{/*background-color: #282c34*/}
const BodyContainer = styled.div`
    width: 100%;
    padding-top: 60px;
    padding-bottom: 150px;
    padding-right: 50px;
    padding-left: 50px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: #282c34;
    align-items: stretch; 
`;

const LeftContainer = styled.div`
    width: 30%;
    padding-left: 20px;
    padding-right: 10px;
    float: right;
    justify-content: space-between;
`;

const RightContainer = styled.div`
    width: 67%;
    padding-left: 20px;
    padding-right: 10px;
    display:flex;
    flex-direction: column;
`;

const VisualPart = styled.div`
  align-items:center;
  justify-content: end;
  margin-left:8%;
`;

const Body = ({onAddToCart, products, onChangeTag, sortBy, highToLow}) => {
  return (
    <BodyContainer>
      <LeftContainer>
        <Categories/>
      </LeftContainer>
      <RightContainer>
        <VisualPart>
          <Slider></Slider>
        </VisualPart>
        <MainPageFilterButtons onChangeTag={onChangeTag}/>
        <Products onAddToCart={onAddToCart} products={products} sortBy={sortBy} highToLow={highToLow}/>
      </RightContainer>
    </BodyContainer>
  )
}

export default Body
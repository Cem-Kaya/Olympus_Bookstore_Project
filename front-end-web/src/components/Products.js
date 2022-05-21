import styled from "styled-components";
import Product from "./Product";
import React from "react";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-right: 60px;
`;

const Products = ({onAddToCart, products, sortBy, highToLow, onAddToWishList, onRemoveFromWishList}) => {

  const GetSortByParameter = () => {
    if(sortBy === "Popular" || sortBy === "Best Seller"){
      return "amount_sold"
    }
    else if(sortBy === "Price high to low"){
      return "price"
    }
    else if(sortBy === "Price low to high"){
      highToLow = false
      return "price"
    }
    else if(sortBy === "Newest" || sortBy === "New Books"){
      return "date"
    }
    else if(sortBy === "Top Rated"){
      return "raiting"
    }
    else {
      return "discount"
    }
  }

  let sbValue = GetSortByParameter()
  return (
    <Container>
      { 
        products.length > 0 ? products.sort((a, b) => highToLow ? ((parseFloat(a[sbValue]) > parseFloat(b[sbValue])) ? -1 : 1) : 
        (parseFloat((a[sbValue]) > parseFloat(b[sbValue])) ? 1 : -1)).map((item) => (
        <Product item={item} onAddToCart={onAddToCart} key={item.id} onAddToWishList={onAddToWishList} onRemoveFromWishList={onRemoveFromWishList}/>
      )) : ""}
    </Container>
  );
};

export default Products;

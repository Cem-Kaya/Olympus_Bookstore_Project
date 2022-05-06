import styled from "styled-components";
import Product from "./Product";
import React from "react";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-right: 60px;
`;

const Products = ({onAddToCart, products, sortBy, highToLow}) => {

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
      return "model"
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
        products.length > 0 ? products.sort((a, b) => highToLow ? ((a[sbValue] > b[sbValue]) ? -1 : 1) : 
        ((a[sbValue] > b[sbValue]) ? 1 : -1)).map((item) => (
        <Product item={item} onAddToCart={onAddToCart} key={item.id} />
      )) : ""}
    </Container>
  );
};

export default Products;

  
{/*import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from 'react';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
`;

const Products = ({ onAddToCart }) => {

  const [items, setItems] = useState([]);

  useEffect (() => {
    const getTasks = async () =>  {
      const itemsFromServer = await fetchTasks()
      setItems(itemsFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch(`/all_books`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }}
     )
    const data = await res.json()

    console.log(data)

    return data
  }

  return (
    <Container>
      {items.map((item) => (
        <Product item={item} onAddToCart={onAddToCart} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;*/}


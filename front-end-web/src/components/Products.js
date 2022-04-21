import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import React from "react";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-right: 60px;
`;

const Products = ({onAddToCart}) => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} onAddToCart={onAddToCart} key={item.id} />
      ))}
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


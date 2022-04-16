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
import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
    SearchOutlined,
    AddShoppingCart,
    ShoppingCart,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { checkLogInStatus } from "../helperFunctions/helperLogin";
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 200px;
    max-width: 200px;
    height: 460px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #282c34;
    position: relative;
    border: 1px solid pink;
    &:hover ${Info}{
      opacity: 1;
    }
  `;

  const TextBoxContainer = styled.div`
    color: white;
    width: 100%;
    height: 50%;
    position: absolute;
    flex-direction: column;
    padding-top: 2px;
    background-color: rgba(0, 0, 0, 0.2); 
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    padding: 3px 3px 3px 3px;
  `;

const TextBoxTitle = styled.div`
    font-size:20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-transform: uppercase;
`;

const TextBoxAuthor = styled.div`
    font-size:12px;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const TextBoxOther = styled.div`
    font-size:12px;
`;

const TextBoxPublisher = styled.div`
    font-size:10px;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const TextBoxPrize = styled.div`
    font-size:18px;
`;
  const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 100%;
    position: absolute;
    justify-content: space-between;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.2);
    text-align:center;
  `;

  const Image = styled.img`
    padding-top:8px;
    height: 50%;
    max-width: inherit;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;


  const Product = ({ item, wishList, onAddToCart, onAddToWishList, onRemoveFromWishList }) => {
    let navigate = useNavigate()
    const [favorited, setFavorited] = useState(wishList === true)
    const [addedToCart, setAddedToCart] = useState(false)

    return (
      <Container>
        <InnerContainer>
          {/*style={{marginBottom: "8px"}}*/}
            <Image src={item.img} />
            <TextBoxContainer>  
              
                <TextBoxOther>{item.in_stock === 0 ? <h6 className="text-danger">Sold Out</h6> : item.in_stock <= 5 ? <h6 className="text-warning">Only {item.in_stock} remained in stock</h6> : <h6 className="text-primary">{item.in_stock} remained in stock</h6>}</TextBoxOther>
                <TextBoxOther><h6 className="text-muted">{item.amount_sold} of the item sold</h6></TextBoxOther>
                <TextBoxTitle>{item.title}</TextBoxTitle>
                <TextBoxOther className="text-warning float-left">Raiting: {item.raiting} stars</TextBoxOther>
                <TextBoxAuthor>{"Author: " + item.author}</TextBoxAuthor>
                <TextBoxPublisher>{"Publisher: " + item.publisher}</TextBoxPublisher>
                <TextBoxOther>{item.discount} discount</TextBoxOther>
                <TextBoxPrize>{item.price.toFixed(2) + " TL"}</TextBoxPrize>
            </TextBoxContainer>
        </InnerContainer>
        <Info>
          <Icon>
            <SearchOutlined onClick={() => {navigate(`/SingleProduct=${item.id}`)}} />
          </Icon>
          <Icon>
            {
              addedToCart ?
              <ShoppingCart color="disabled" disabled={true}></ShoppingCart>
              :
              item.in_stock === 0 ? 
              <AddShoppingCart color="disabled" disabled={true} onClick={() => {onAddToCart(item)}}/>
              :
              <AddShoppingCart onClick={() => {onAddToCart(item); setAddedToCart(true)}}/>
            }  
          </Icon>
          <Icon>
            {
              favorited ?
              <FavoriteOutlined disabled={checkLogInStatus()} onClick={() => {onRemoveFromWishList(item); setFavorited(false)}} />
              :
              <FavoriteBorderOutlined disabled={checkLogInStatus()} onClick={() => {onAddToWishList(item); setFavorited(true)}} />
            }
          </Icon>
        </Info>
      </Container>
    );
  };
  
  export default Product;
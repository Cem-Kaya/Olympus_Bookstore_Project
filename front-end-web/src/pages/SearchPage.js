import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from "styled-components"
import Products from '../components/Products'
import Filters from '../components/Filters'
import '../components/ExtraStyles.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { popularProducts } from "../data"
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems'

const UpperContainer = styled.div`
    width: 100%;
    height: 100px;
    padding-top: 60px;
    position:relative;
    background-color: #282c34;
    color:white;
    display:flex;
`;

const TopButtons = styled.div`
    display:flex;
    justify-content: space-around;
    width: 40%;
    align-items: center;
    position: absolute;
    bottom: 5px;
    left: 55vw;
`;

const BodyContainer = styled.div`
    width: 100%;
    padding-top: 30px;
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
    padding-right: 70px;
    padding-top: 5px;
    float: right;
    justify-content: space-between;
    text-align: left;

`;

const RightContainer = styled.div`
    width: 67%;
    padding-left: 20px;
    padding-right: 10px;
    display:flex;
    flex-direction: column;
`;


const SearchPage = () => {
    let params = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [sortBy, setSortBy] = useState("Popular");

    //console.log(params)
    //console.log(sortBy)

    useEffect(() => {
      const filterCategories = ["author", "publisher", "raiting"]
      filterCategories.forEach(element => {
        params[element] === "*" ? params[element] = [] : params[element] = params[element].split(",")
      });
    }, [params]);
  
    const [cartItemsChanged, setCartItemsChanged] = useState(false);
    
    const AddToCart = (item) => {
      addNewItem(item)
      setCartItemsChanged(!cartItemsChanged)
    }
  
    const HeaderAddToCart = (item) => {
      add1Item(item)
      setCartItemsChanged(!cartItemsChanged)
    }
  
    const HeaderRemoveFromCart = (item) => {
      remove1Item(item)
      setCartItemsChanged(!cartItemsChanged)
    }

    return (
      <div>
        <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>  
        <UpperContainer>  
            <TopButtons>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                <label className="custom-control-label" htmlFor="customSwitch1">Show Only In Stock Items</label>
            </div>
            <div className="">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort by
                </button>
                <div className="dropdown-menu dropdown-menu-center" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={() => {setSortBy("Popular")}}>Popular</button>
                    <button className="dropdown-item" onClick={() => {setSortBy("Price high to low")}}>Price high to low</button>
                    <button className="dropdown-item" onClick={() => {setSortBy("Price low to high")}}>Price low to high</button>
                    <button className="dropdown-item" onClick={() => {setSortBy("Newest")}}>Newest</button>
                </div>
            </div>
            </TopButtons>
        </UpperContainer>
        <BodyContainer>  
            <LeftContainer>
                <Filters products={popularProducts} params={params}/>
            </LeftContainer>
            <RightContainer>
                <Products products={popularProducts} onAddToCart={AddToCart}></Products>
                <nav className="mt-4" aria-label="Page navigation sample">
                    <ul className="pagination">
                        <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </RightContainer>
        </BodyContainer>
        <Footer/>
    </div>
  )
}

export default SearchPage
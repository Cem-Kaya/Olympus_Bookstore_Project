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
    const [sortBy, setSortBy] = useState("Popular");
    const [items, setItems] = useState([]);
    const [onlyInStock, setOnlyInStock] = useState("false")

    useEffect (() => {
        const getBooks = async () =>  {
          const itemsFromServer = await fetchBooks()
          setItems(itemsFromServer)
        }
        getBooks()
      }, [])

    useEffect (() => {
        const filterCategories = ["author", "publisher", "raiting"]
        filterCategories.forEach(element => {
          params[element] === "*" || params[element] === [] ? params[element] = [] : params[element] = params[element].split(",")
        })
        console.log(params)
    }, [params])
    
    const fetchBooks = async () => {
        const res = await fetch(`/all_books`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        const data = await res.json()

        console.log(data)
        return data
    }
  
    const [cartItemsChanged, setCartItemsChanged] = useState(false);
    
    const AddToCart = async (item) => {
      await addNewItem(item)
      setCartItemsChanged(!cartItemsChanged)
    }
  
    const HeaderAddToCart = async (item) => {
      await add1Item(item)
      setCartItemsChanged(!cartItemsChanged)
    }
  
    const HeaderRemoveFromCart = async (item) => {
      await remove1Item(item)
      setCartItemsChanged(!cartItemsChanged)
    }

    const FilterItems = () => {
        console.log(params)
        let itemsCopy = [...items]
        let nonEmptyElements = []

        if(params.hasOwnProperty("title")){
            var regexObj = new RegExp(params["title"], "i"); 
            console.log(regexObj)
            itemsCopy = itemsCopy.filter(elem => regexObj.test(elem["title"]) === true)
        }
        else if(params.hasOwnProperty("description")){
            var regexObj2 = new RegExp(params["description"], "i"); 
            console.log(regexObj2)
            itemsCopy = itemsCopy.filter(elem => regexObj2.test(elem["description"]) === true)
        }

        if(onlyInStock === false){
            itemsCopy = itemsCopy.filter(elem => elem["in_stock"] !== 0)
        }
        
        for (var key of Object.keys(params)) {
            if(key !== "category" && key !== "description" && key !== "title" && key !== "pr_lower" && key !== "pr_upper" && params[key] !== "*" && params[key].length !== 0){
                nonEmptyElements.push(key)
            }
        }
        console.log(nonEmptyElements)
        nonEmptyElements.forEach(key => {
                itemsCopy = itemsCopy.filter(elem => params[key].includes(elem[key]))
            });
        if(params["pr_lower"] !== "*"){
            itemsCopy = itemsCopy.filter(elem => elem["price"] >= parseInt(params["pr_lower"]))
        }
        if(params["pr_upper"] !== "*"){
            itemsCopy = itemsCopy.filter(elem => elem["price"] <= parseInt(params["pr_upper"]))
        }
        console.log(itemsCopy)
        return itemsCopy
    }
    let filteredItems = FilterItems()
    let pageNum = items.length / 16

    return (
      <div>
        <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>  
        <UpperContainer>  
            <TopButtons>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" onClick={() => {setOnlyInStock(!onlyInStock)}}/>
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
                <Filters products={filteredItems} params={params}/>
            </LeftContainer>
            <RightContainer>
                <Products products={filteredItems} onAddToCart={AddToCart} sortBy={sortBy} highToLow={sortBy !== "Price low to high"}></Products>
                <nav className="mt-4" aria-label="Page navigation sample">
                    <ul className="pagination">
                        <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
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
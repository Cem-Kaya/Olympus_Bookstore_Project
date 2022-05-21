import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from "styled-components"
import Products from '../components/Products'
import Filters from '../components/Filters'
import '../components/ExtraStyles.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems'
import { fetchBooks, fetchBooksFromCategory } from '../helperFunctions/helperGetProducts'
import { addToWishList } from '../helperFunctions/helperWishList'

const Body = styled.div`
    background-color: #282c34;
    min-height: 1000px;
`;

const UpperContainer = styled.div`
    width: 100%;
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
    const [onlyInStock, setOnlyInStock] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect (() => {
        const getBooks = async () =>  {
            if(params.hasOwnProperty("category")){
                const categories = await fetchCategories()
                
                let categoryId = ""
                for (var key of Object.keys(categories)) {
                    if(categories[key] === params["category"]){
                        categoryId = key
                    }
                }
                const itemsFromServer = await fetchBooksFromCategory(categoryId)
                setItems(itemsFromServer)
                setLoaded(true)
            }
            else {
                const itemsFromServer = await fetchBooks()
                setItems(itemsFromServer)
                setLoaded(true)
            }
        }
        getBooks()
      }, [params])

    useEffect (() => {
        const filterCategories = ["author", "publisher", "raiting"]
        filterCategories.forEach(element => {
          params[element] === "*" || params[element] === [] ? params[element] = [] : params[element] = params[element].split(",")
        })
        console.log(params)
    }, [params])

    const fetchCategories = async () => {
        const res = await fetch(`/all_category`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }}
         )
        const data = await res.json()
    
        console.log(data)
        return data
      }

      const AddToWishList = async (item) => {
        const answer = await addToWishList(item.id)
      }
  
    const [cartItemsChanged, setCartItemsChanged] = useState(false);
    
    const AddToCart = (item) => {
      addNewItem(item)
      setCartItemsChanged(!cartItemsChanged)
    }
  
    const HeaderAddToCart = (item) => {
      add1Item(item)
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
        {/*else if(params["author"] !== "*" && params["author"].length === 1){
            var regexObj3 = new RegExp(params["author"][0], "i"); 
            console.log(regexObj3)
            itemsCopy = itemsCopy.filter(elem => regexObj3.test(elem["author"]) === true)
            console.log(itemsCopy)
            params["author"] = []
        }*/}

        if(onlyInStock === false){
            itemsCopy = itemsCopy.filter(elem => elem["in_stock"] !== 0)
        }
        
        for (var key of Object.keys(params)) {
            if(key !== "page" && key !== "category" && key !== "description" && key !== "title" && key !== "pr_lower" && key !== "pr_upper" && params[key] !== "*" && params[key].length !== 0){
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

    const pages = () => {
        let pageSize = 16
        let arr = []

        for(var i = 0; i < filteredItems.length; i += pageSize){
            arr.push(<li className={"page-link " + parseInt(params["page"]) === (i / pageSize) ? "active" : "" }><a className="page-link" href={getPageLink(i/pageSize + 1)}>{i/pageSize + 1}</a></li>)
        }
        return arr
    }

    const getPageLink = (pageNum) => {
        let link = ""
        if(params.hasOwnProperty("title")){
            link = `/Search/page=${pageNum}/&title=${params["title"]}/&author=${params["author"].length === 0 ? "*" : params["author"]}/&publisher=${params["publisher"].length === 0 ? "*" : params["publisher"]}/&pr_lower=${params["pr_lower"]}/&pr_upper=${params["pr_upper"]}/&raiting=${params["raiting"].length === 0 ? "*" : params["raiting"]}`
        }
        else if(params.hasOwnProperty("description")){
            link = `/Search/page=${pageNum}/&description=${params["description"]}/&author=${params["author"].length === 0 ? "*" : params["author"]}/&publisher=${params["publisher"].length === 0 ? "*" : params["publisher"]}/&pr_lower=${params["pr_lower"]}/&pr_upper=${params["pr_upper"]}/&raiting=${params["raiting"].length === 0 ? "*" : params["raiting"]}`
        }
        else{
            link = `/Search/page=${pageNum}/&category=${params["category"]}/&author=${params["author"].length === 0 ? "*" : params["author"]}/&publisher=${params["publisher"].length === 0 ? "*" : params["publisher"]}/&pr_lower=${params["pr_lower"]}/&pr_upper=${params["pr_upper"]}/&raiting=${params["raiting"].length === 0 ? "*" : params["raiting"]}`
        }
        return link
    }

    return (
      <div>
        <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>  
        <Body>
        {
          !loaded ? 
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
            :
            <>
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
                <Products products={filteredItems} onAddToCart={AddToCart} sortBy={sortBy} highToLow={sortBy !== "Price low to high"} onAddToWishList={AddToWishList}></Products>
                <nav className="mt-4" aria-label="Page navigation sample">
                    <ul className="pagination">
                        {pages()}
                    </ul>
                </nav>
            </RightContainer>
        </BodyContainer>
        </>
        }
        </Body>
        <Footer/>
    </div>
  )
}

export default SearchPage
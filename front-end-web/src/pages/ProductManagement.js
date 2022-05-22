import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import "../App.css"
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Body  = styled.div`
    padding: 20px;
    height: 220vh;
`;

const Card = styled.div`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    line-height: 1.7;
    position: relative;
    background-color: inherit;
    height: 100vh;
`;

const ProductManagement = () => {
    const [expandableOpen, setExpandableOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [items, setItems] = useState([])

    const handleOpenExpandable = () => {
        setExpandableOpen(!expandableOpen)
    }

    useEffect (() => {
      const getBooks = async () =>  {
        const itemsFromServer = await fetchBooks()
        setItems(itemsFromServer)
        setLoaded(true)
      }
      getBooks()
    }, [])

  return (
    <div>
        <Header></Header>
        <Body className='bg-dark'>
          {
            !loaded ?
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            :
          <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
            <div className='row'>
              <div className="col-md-3 mb-3">
                <a href={`/SingleProduct=${items[6].id}`}><img src={items[6].img} alt="a" height="160px"></img></a>
              </div>
              <div className="col-md-3 mb-3">
                <div className='row'>  
                  <p>Title: {items[6].title}</p>
                </div>   
                <div className='row'>  
                  <p>Author: {items[6].author}</p>
                </div>  
                <div className='row'>  
                  <br></br>
                </div> 
                <div className='row'>  
                  <p>Amount Sold: {items[6].amount_sold}</p>
                </div>  
                <div className='row'>  
                  <p>Base Price: {items[6].price / ((100 - parseFloat(items[6].discount)) / 100)} TL</p>
                </div>  
                <div className='row'>  
                  <p>Discount: {items[6].discount}</p>
                </div>  
                <div className='row'>  
                  <p>Discounted Price: {items[6].price} TL</p>
                </div>  
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Base Price</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current base price: ${items[6].price / ((100 - parseFloat(items[6].discount)) / 100)} TL`} onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Discount</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current discount: ${items[6].discount}`} onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-12 mb-3">
                <button className='btn btn-primary btn-lg btn-block'>Update</button>
              </div>
            </div>
          </div>
        }
        <Card>
        <div className={"container_exp " + (expandableOpen ? "expand" : "")}>
        <div className="upper" onClick={() => {handleOpenExpandable()}}>
          {/* <p>June 10</p> */}
          <h3>
            ADD NEW PRODUCT
          </h3>
        </div>
        <div className='lower'>
        <form className="needs-validation" noValidate="">

            <div className="mb-3">
              <label htmlFor="email">Title  </label>
              <input type="email" className="form-control" id="email" onChange={event => (event.target.value)} placeholder="e.g. Attak on Titan"/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">Author</label>
                <input type="text" className="form-control" id="firstName" placeholder="" onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Publisher</label>
                <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="firstName">Edition</label>
                <input type="text" className="form-control" id="firstName" placeholder="" onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Model Number</label>
                <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Warranty</label>
                <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Amount In Stock</label>
                <input type="number" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Image 1 URL  </label>
              <input type="email" className="form-control" id="email" onChange={event => (event.target.value)} placeholder="http://..."/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Image 2 URL  </label>
              <input type="email" className="form-control" id="email" onChange={event => (event.target.value)} placeholder="http://..."/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Image 3 URL  </label>
              <input type="email" className="form-control" id="email" onChange={event => (event.target.value)} placeholder="http://..."/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Description</label>
              <textarea type="text" className="form-control" id="address" onChange={event => (event.target.value)} placeholder="e.g. This book tells the story of..." required=""/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col-md-1 mb-3">
                    <button className='btn btn-warning float-md-left'>Save</button>
                </div>
                <div className="col-md-1 mb-3">
                    <button className='btn btn-warning float-md-left'>Update</button>
                </div>
            </div>

        </form>
        </div>
        </div>
        </Card>
        </Body>
        <Footer></Footer>
    </div>
  )
}

export default ProductManagement
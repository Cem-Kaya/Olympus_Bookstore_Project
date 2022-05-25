import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import "../App.css"
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Body  = styled.div`
    padding-bottom: 20px;
    min-height: 220vh;
`;

const TableBody = styled.div`
  min-height: 500px;
  padding: 40px;
  text-align: left;
  font-size: 16px;
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

const TextBox = styled.div`
    max-width: 1000px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin: 0 0;
    text-align: left;
`;

const ProductManagement = () => {
    const [expandableOpen, setExpandableOpen] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(4)

    const handleOpenExpandable = () => {
        setExpandableOpen(!expandableOpen)
    }

    useEffect (() => {
      const getBooks = async () =>  {
        const itemsFromServer = await fetchBooks()
        setItems(itemsFromServer)
        setLoaded(true)
      }
      if(navItemSelected === 2){
        getBooks()
      }
      else if(navItemSelected === 1){
        setLoaded(true)
      }
      else if(navItemSelected === 0){
        getBooks()
      }
      else if(navItemSelected === 3){
        setLoaded(true)
      }
      else if(navItemSelected === 4){
        setLoaded(true)
      }
    }, [navItemSelected])

    const getPageBody = () => {
      switch(navItemSelected){
        case 0:
          return items.map(item => (
            <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
            <div className='row'>
                <div className="col-md-4 mb-3">
                <a href={`/SingleProduct=${item.id}`}><img src={item.img} alt="a" height="160px"></img></a>
                </div>
                <div className="col-md-4 mb-3">
                <div className='row'>  
                    <TextBox><p>Title: {item.title}</p></TextBox>
                </div>   
                <div className='row'>  
                    <TextBox><p>Author: {item.author}</p></TextBox>
                </div>  
                <div className='row'>  
                    <br></br>
                </div> 
                <div className='row'>  
                    <p>Amount Sold: {item.amount_sold}</p>
                </div>  
                <div className='row'>  
                    <p>Amount Remaining In Stock: {item.in_stock}</p>
                </div>  
                </div>
                <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Amount Remaining In Stock</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current base price: ${item.price / ((100 - parseFloat(item.discount)) / 100)} TL`} onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                    Valid last name is required.
                </div>
                <br></br>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12 mb-3">
                <button className='btn btn-primary btn-lg btn-block'>Update Stock</button>
                </div>
            </div>
            </div>))
        case 1:
          return (      
          <TableBody>
          <table className="table table-striped table-dark table-bordered" >
          <thead>
            <tr>
              <th scope="col" width="10%">Delivery ID</th>
              <th scope="col" width="10%">Customer ID</th>
              <th scope="col" width="10%">Product ID</th>
              <th scope="col" width="6%">Quantity</th>
              <th scope="col" width="14%">Total Price</th>
              <th scope="col" width="40%">Delivery Address</th>
              <th scope="col" width="10%">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        </TableBody>
        )
        case 2:
          return items.map(item => (
            <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
            <div className='row'>
                <div className="col-md-4 mb-3">
                <a href={`/SingleProduct=${item.id}`}><img src={item.img} alt="a" height="160px"></img></a>
                </div>
                <div className="col-md-4 mb-3">
                <div className='row'>  
                    <TextBox><p>Title: {item.title}</p></TextBox>
                </div>   
                <div className='row'>  
                    <TextBox><p>Author: {item.author}</p></TextBox>
                </div>  
                <div className='row'>  
                    <br></br>
                </div> 
                <div className='row'>  
                    <p>Amount Sold: {item.amount_sold}</p>
                </div>  
                <div className='row'>  
                    <p>Amount Remaining In Stock: {item.in_stock}</p>
                </div>  
                </div>
                <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Amount Remaining In Stock</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current base price: ${item.price / ((100 - parseFloat(item.discount)) / 100)} TL`} onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                    Valid last name is required.
                </div>
                <br></br>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12 mb-3">
                <button className='btn btn-primary btn-lg btn-block'>Update Stock</button>
                </div>
            </div>
            </div>))
        case 3:
          return (      
          <TableBody>
          <table className="table table-striped table-dark table-bordered" >
          <thead>
            <tr>
              <th scope="col" width="10%">Delivery ID</th>
              <th scope="col" width="10%">Customer ID</th>
              <th scope="col" width="10%">Product ID</th>
              <th scope="col" width="6%">Quantity</th>
              <th scope="col" width="14%">Total Price</th>
              <th scope="col" width="40%">Delivery Address</th>
              <th scope="col" width="10%">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        </TableBody>
        )
        default:  //case 4
          return (<Card>
            <div className={"container_exp " + (expandableOpen ? "expand" : "")}>
            <div className="upper" onClick={() => {handleOpenExpandable()}}>
              {/* <p>June 10</p> */}
              <h3>
                ADD NEW PRODUCT
              </h3>
            </div>
            <div className='lower'>
            <form className="needs-validation" noValidate="">

              <div className="row">
                  <div className="col-md-9 mb-3">
                    <label htmlFor="text">Title  </label>
                    <input type="text" className="form-control" id="title" onChange={event => (event.target.value)} placeholder="e.g. Attak on Titan"/>
                    <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="sm">Sales Manager</label>
                    <select className="form-control" onChange={event => (event.target.value)}>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                    </select>
                    <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div>
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
                  <div className="col-md-2 mb-3">
                    <label htmlFor="firstName">Edition</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" onChange={event => (event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Model Number</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Warranty</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Initial Price</label>
                    <input type="number" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Release Date</label>
                    <input type="date" className="form-control" id="lastName" placeholder="" onChange={event => (event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
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
                <div className='row'>
                    <div className="col-md-12 mb-0">
                    <button className='btn btn-warning btn-lg btn-block'>Save</button>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </Card>)
      }
    }

  return (
    <div>
        <Header></Header>
        <Body className='bg-dark'>
          
          <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a class="navbar-brand" href="#">Product Management</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(0); setLoaded(false)}} href="#">View All Products<span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(1); setLoaded(false)}} href="#">Delivery List</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(2); setLoaded(false)}} href="#">Update Stock</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(3); setLoaded(false)}} href="#">Comments to be Approved</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(4); setLoaded(false)}} href="#">Add a New Product</a>
                    </div>
                </div>
                <a class="nav-item nav-link" href="/Account">Go Back to the Account Page</a>
            </nav>
            {
              !loaded ?
              <div class="d-flex justify-content-center">
                  <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                  </div>
              </div>
              : 
              getPageBody()
            }
        
        </Body>
        <Footer></Footer>
    </div>
  )
}

export default ProductManagement
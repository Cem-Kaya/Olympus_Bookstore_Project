import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Body  = styled.div`
    padding-bottom: 20px;
    min-height: 100vh;
`;

const TextBox = styled.div`
    max-width: 1000px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin: 0 0;
    text-align: left;
`;

const TableBody = styled.div`
  min-height: 500px;
  padding: 40px;
  text-align: left;
  font-size: 16px;
`;

const MyStore = () => {

    const [loaded, setLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(0)

    useEffect (() => {
      const getBooks = async () =>  {
        const itemsFromServer = await fetchBooks()
        setItems(itemsFromServer)
        setLoaded(true)
      }
      if(navItemSelected === 0){
        getBooks()
      }
      else if(navItemSelected === 3){
        setLoaded(true)
      }
    }, [navItemSelected])

    const getPageBody = () => {
        
        switch(navItemSelected){

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

        default:
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
                    <p>Base Price: {item.price / ((100 - parseFloat(item.discount)) / 100)} TL</p>
                </div>  
                <div className='row'>  
                    <p>Discount: {item.discount}</p>
                </div>  
                <div className='row'>  
                    <p>Discounted Price: {item.price} TL</p>
                </div>  
                </div>
                <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Base Price</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current base price: ${item.price / ((100 - parseFloat(item.discount)) / 100)} TL`} onChange={event => (event.target.value)} required=""/>
                <div className="invalid-feedback">
                    Valid last name is required.
                </div>
                <br></br>
                <label htmlFor="lastName">Discount</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current discount: ${item.discount}`} onChange={event => (event.target.value)} required=""/>
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
            </div>))
        }
    }

  return (
    <div>
        <Header></Header>
        <Body className='bg-dark'>
            <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a class="navbar-brand" href="#">Store Management</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(0); setLoaded(false)}} href="#">View/Update Products <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(1); setLoaded(false)}} href="#">View/Print Invoices</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(2); setLoaded(false)}} href="#">Calculate Revenue</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(3); setLoaded(false)}} href="#">View Refund/Return Requests</a>
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

export default MyStore
import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getStoreManagerID } from '../helperFunctions/helperLogin'
import { useNavigate, useParams } from 'react-router-dom'

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
    let params = useParams()
    let navigate = useNavigate()

    useEffect (() => {
      console.log(params["sid"])
      console.log(getStoreManagerID())
      if(params["sid"] !== getStoreManagerID().toString()){
       navigate("/Account")
      }
    }, [params, navigate])


    const [loaded, setLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [refundRequests, setRefundRequests] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(0)

    useEffect (() => {
      const getBooks = async () =>  {
        const productIds = await fetchProductIds()
        const itemsFromServer = await fetchBooks()
        console.log(itemsFromServer)
        console.log(productIds)
        
        let commonBooks = []
        productIds.forEach(element => {
          itemsFromServer.forEach(item => {
            if(element.Pid === item.id)  {commonBooks.push(item)}
          })
        });
        setItems(commonBooks)
        setLoaded(true)
      }
      const getRefundRequests = async () =>  {
        const refundRequests = await fetchRefundRequests()
        console.log(refundRequests)
        setRefundRequests(refundRequests)
        setLoaded(true)
      }
      if(navItemSelected === 0){
        getBooks()
      }
      else if(navItemSelected === 1){
        getBooks()
      }
      else if(navItemSelected === 3){
        getRefundRequests()
      }
    }, [navItemSelected])

    const fetchProductIds = async () => {
        const res = await fetch(`/products_sid/submit`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({Sid: getStoreManagerID()})
            }
            )
        const data = await res.json()
        return data
      }

      const fetchRefundRequests = async () => {
        const res = await fetch(`/refunds_get_sid/submit`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({Sid: getStoreManagerID()})
            }
            )
        const data = await res.json()
        return data
      }

    const updateProductPrice = async (index, sale, price) => {
        let item = items[index]

        const res = await fetch(`/update_book/submit`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({Pid: item["id"], name: item["title"], description: item["description"],
                        quantity: item["in_stock"], amount_sold: item["amount_sold"], price: price, sale: sale})
            }
            )
        const data = await res.json()
        return data
    }

    const updatePrice = async (index, discount, price) => {
        let sale = (1 - (discount / 100)).toFixed(2)
        price = price * sale
        const serverAnswer = await updateProductPrice(index, sale, price)
        console.log(serverAnswer)
    }

    const refundApproval = async (id, newStatus) => {
        try
        {
          const res = await fetch(`/refunds_update/submit`     , {headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({id: id, status: newStatus})
              }
            )
          const data = await res.json()
          return data
        }
        catch{
          console.log("could not change refund status")
        }
      }
    
      const sendApprovalInfo = async (id, approved) => {
        await refundApproval(id, approved)
      }

    const getPageBody = () => {
        
        switch(navItemSelected){

            case 1:
                return items.map((item, index) => (
                    <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"60px"}}>
                      <div className='row'>
                        <div className="col-md-6 mb-3">
                          <p>Invoice Information</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p>Product Information</p>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <hr className='bg-light'/>
                      </div>
                      <div className='row'>
                        <div className="col-md-6 mb-3">
                          <TextBox><p>Thank you for your purchase!</p></TextBox>
                          <TextBox><p>User E-mail: {item.email}</p></TextBox>
                          <TextBox><p>Your order has been proccessed successfully.</p></TextBox>
                          <br></br>
                          <TextBox><p>Your Delivery ID: {item.did}</p></TextBox>
                          <TextBox><p>Purchase ID of Product: {item.purcid}</p></TextBox>
                        </div>
                        <div className="col-md-6 mb-3">
                          <TextBox><p>Title: {item.title}</p></TextBox>
                          <TextBox><p>Link to the Product Page: <a href={`/SingleProduct=${item.Pid}`} className="text-info">{item.title}</a></p></TextBox>
                          <br></br>
                          <TextBox><p>You Bought: {item.quantity} of the item</p></TextBox>
                          <TextBox><p>It Costed: {item["total price"]} TL</p></TextBox>
                          <TextBox><p>You had {item.discount} discount</p></TextBox>
                          <TextBox><p>Shipment Information: {item.shipment}</p></TextBox>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <hr className='bg-light'/>
                      </div>
                      <div className='row'>
                        <div className="col-md-6 mb-3">
                          <TextBox><p>Delivery Address: {item.address}</p></TextBox>
                        </div>
                      </div>
                    </div>))

            case 3:
                return (      
                <TableBody>
                {
                refundRequests.length === 0 ? 
                <p className='text-light'>Refund Request List is Empty</p>
                :
                <table className="table table-striped table-dark table-bordered" >
                <thead>
                <tr>
                  <th scope="col" width="25%">Customer E-mail</th>
                  {/* <th scope="col" width="12%">Product ID & Link</th> */}
                  <th scope="col" width="15%">Purchase ID</th>
                  <th scope="col" width="15%">Sale ID</th>
                  <th scope="col" width="25%">Refund State</th>
                  <th scope="col" width="20%">Update Status</th>
                </tr>
                </thead>
                <tbody>
                {
                refundRequests.map((element, index) => (
                  <tr key={index}>
                    <th scope="col">{element.email}</th>
                    {/* <th scope="col"><a href={`SingleProduct=${element.id}`}>{element.id}</a></th> */}
                    <th scope="col">{element.purcid}</th>
                    <th scope="col">{element.sid}</th>
                    <th scope="col">{element.refund_state}</th>
                    {
                        element.refund_state === "Requested" ?

                        <th scope="col" className="d-flex flex-column justify-content-around">
                            <button type="submit" className='btn-warning btn-block' onClick={() => {sendApprovalInfo(element.id, "Refunded"); setNavItemSelected(0); setLoaded(false)}}>Approve</button>
                            <br/>
                            <button type="submit" className='btn-warning btn-block' onClick={() => {sendApprovalInfo(element.id, "Refund Rejected"); setNavItemSelected(0); setLoaded(false)}}>Reject</button>
                        </th>
                        :
                        <th scope="col">NA</th>
                    }
                  </tr>
                ))
              }
              </tbody>
              </table>
              }
              </TableBody>
              )

        default:    //case 0
            let discounts = []
            for(var i = 0; i < items.length; i++){
                discounts.push(0.0)
            }
            let prices = []
            for(var j = 0; j < items.length; j++){
                prices.push(0)
            }
            return items.map((item,index) => (
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
                    <p>Base Price: {(item.price / ((100 - parseFloat(item.discount)) / 100))} TL</p>
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
                <input type="number" className="form-control" id="lastName" placeholder={`current base price: ${item.price / ((100 - parseFloat(item.discount)) / 100)} TL`} onChange={event => (prices[index] = event.target.value)} required=""/>
                <div className="invalid-feedback">
                    Valid last name is required.
                </div>
                <br></br>
                <label htmlFor="lastName">Discount</label>
                <input type="number" className="form-control" id="lastName" placeholder={`current discount: ${item.discount}`} onChange={event => (discounts[index] = event.target.value)} required=""/>
                <div className="invalid-feedback">
                    Valid last name is required.
                </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12 mb-3">
                <button className='btn btn-primary btn-lg btn-block' onClick={() => {updatePrice(index, discounts[index], prices[index]); setNavItemSelected(1); setLoaded(false)}}>Update</button>
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
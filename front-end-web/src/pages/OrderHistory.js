import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { getUserID, checkLogInStatus } from "../helperFunctions/helperLogin";
import { fetchBooks } from '../helperFunctions/helperGetProducts';
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Body = styled.div`
  min-height: 500px;
  padding: 40px;
  text-align: left;
  font-size: 16px;
`;

const ImageContainer = styled.div`
  height: 20vh;
  display: inline-block;
`;


const OrderHistory = () => {
  let navigate = useNavigate();

const [orders, setOrders] = useState([])
const [books, setBooks] = useState([])
const [loaded, setLoaded] = useState(false)

useEffect (() => {
  if(checkLogInStatus() === false){
    navigate("/Account")
  }
}, [navigate])

useEffect (() => {
  const getOrders = async () =>  {
    const itemsFromServer = await fetchOrders()
    const refundedProducts = await fetchRefundedProducts()
    console.log(refundedProducts)
    console.log(itemsFromServer)
    if(Object.keys(itemsFromServer).length === 0){
      setOrders([])
    }
    else{
      let itemArray = []
      for (var key of Object.keys(itemsFromServer)) {
        itemArray.push(itemsFromServer[key])
      }
      let itemArray2 = refundedProducts
      console.log(itemArray2)
      
      let refundedIDs = []
      itemArray2.forEach(element => {
          refundedIDs.push(element["purcid"])
      })
      console.log(refundedIDs)
      
      let nonRefundedArray = itemArray.filter(elem => !refundedIDs.includes(elem.purcid))
      console.log(nonRefundedArray)

      itemArray2.forEach(element => {
        itemArray.forEach(item => {
          if(item["purcid"] === element["purcid"]) {nonRefundedArray.push({...item, refund_state: element.refund_state})}
        })
      })
      console.log(nonRefundedArray)
      setOrders(nonRefundedArray) 
    }

    const serverbooks = await fetchBooks()
    setBooks(serverbooks)
    setLoaded(true)
  }

  getOrders()
  
}, [loaded])

const fetchOrders = async () => {
  const res = await fetch('/get_ones_purch_hist/submit', {
    method: "POST",
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify({"uid" : getUserID()})
  })
    const data = await res.json()

    console.log(data)
    return data
  }

  const fetchRefundedProducts = async () => {
    const res = await fetch('/refunds_get_uid/submit', {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify({"email" : getUserID()})
    })
      const data = await res.json()
  
      console.log(data)
      return data
    }

  const returnAProduct = async (purcid) => {
    const res = await fetch('/refunds/submit', {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify({"uid" : getUserID(), "purcid": purcid})
    })
      const data = await res.json()
  
      console.log(data)
      return data
    }
    
  const elems = () => {
    let orderArray = []
    for (var key of Object.keys(orders)) {
      orderArray.push(orders[key])
    }
    return orderArray
  }

  const getName = (item) => {
    let title = ""
    books.forEach(element => {
      if(element.id === item.pid){
        title = element.title
      }
    })
    return title
  }

  const getImage = (item) => {
    let image = ""
    books.forEach(element => {
      if(element.id === item.pid){
        image = element.img
      }
    })
    return image
  }

  const getLastRefundableDate = (element) => {
    let date = element.date.split(" ")
    
    const dateObject = new Date(date)
    dateObject.setDate(dateObject.getDate() + 30);
    
    return dateObject
  }

  const isRefundableNow = (lastRefundDate) => {
    let now = Date.now()

    if(now - lastRefundDate <= 0){
      return true
    }
    else{
      return false
    } 
  }

  return (
    <div>
      <Header></Header>
      <Body className='bg-secondary'>
      {
          !loaded ? 
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
            :
            orders.length === 0 ? <tr><h5 className='text-white'>No Orders Yet</h5></tr>
            : 
            <>
            <h3 className='text-white'>Order History</h3>
            <br></br>
      <table className="table table-striped table-dark table-bordered" >
        <thead>
          <tr>
            <th scope="col" width="25%">Product</th>
            <th scope="col" width="5%">Quantity</th>
            <th scope="col" width="10%">Order Date</th>
            <th scope="col" width="20%">Order Status</th>
            <th scope="col" width="20%">Refundability</th>
            <th scope="col" width="20%">Return the Product</th>
          </tr>
        </thead>
        <tbody>
          {
             elems().map((element, index) => (
              <tr key={index}>
                <td width="25%">
                  <a href={`/SingleProduct=${element.pid}`}>
                    <div className="display-flex justify-content-around align-center">
                        <div className="img-product">
                            <img src={getImage(element)} alt="" className="mCS_img_loaded" height="140px"/>
                        </div>
                        <div className="text-white">
                            {getName(element)}
                        </div>
                    </div>
                  </a>
                </td>
                {/* <th scope="col"><a href={`/SingleProduct=${element.pid}`}><img alt="" src={getImage(element)}></img></a></th> */}
                <th scope="col" className='text-center'>{element.quantity}</th>
                <th scope="col">{element.date}</th>
                <th scope="col" className='text-center'>{element.shipment}</th>
                {
                  element.hasOwnProperty("refund_state") ? 
                  <th scope="col">Refund Request Has Already Been Sent</th>
                  :
                  <th scope="col">Refundable until {getLastRefundableDate(element).toString()}</th>
                }
                {
                  element.hasOwnProperty("refund_state") ? 
                  <th scope="col">Refund status: {element.refund_state}</th>
                  :
                  isRefundableNow(getLastRefundableDate(element)) ?
                  element.shipment === "Processing" ? 
                  <th scope="col" className='d-flex flex-column'>Refund date has not expired yet<button type="submit" onClick={() => {returnAProduct(element.purcid); setLoaded(false)}} className='btn-warning'>Cancel Order</button></th>
                  :
                  <th scope="col" className='d-flex flex-column'>Refund date has not expired yet<button type="submit" onClick={() => {returnAProduct(element.purcid); setLoaded(false)}} className='btn-warning'>Ask for a Refund</button></th>
                  :
                  <th scope="col">Refund date has expired</th>
                }
              </tr>
            ))
            
          }

        </tbody>
      </table>
      </>
      }
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </Body>
      <Footer></Footer>
   </div>
  )
}

export default OrderHistory
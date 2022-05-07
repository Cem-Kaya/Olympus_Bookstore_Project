import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { getUserID } from "../helperFunctions/helperLogin";

const OrderHistory = () => {

  
const [orders, setOrders] = useState([])
  
useEffect (() => {
  const getOrders = async () =>  {
    const itemsFromServer = await fetchOrders()
    if(Object.keys(itemsFromServer).length === 0){
      setOrders([])
    }
    else{
      let itemArray = []
      for (var key of Object.keys(itemsFromServer)) {
        itemArray.push(itemsFromServer[key])
      }
      setOrders(itemArray)
    }
  }
  getOrders()
}, [])

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

  return (
    <div>
      <Header></Header>
      <table className="table" style={{height:"40vh"}}>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Order Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? <tr><p>No Orders Yet</p></tr>
            : 
            orders.map((element, index) => (
              <tr>
                <th scope="row">1</th>
                <td>{element}</td>
                <td>{element}</td>
                <td>{element}</td>
              </tr>
            ))}

        </tbody>
      </table>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer></Footer>
   </div>
  )
}

export default OrderHistory
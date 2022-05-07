import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { getUserID } from "../helperFunctions/helperLogin";

const OrderHistory = () => {

  
const [orders, setOrders] = useState([])
const [books, setBooks] = useState([])

useEffect (() => {
  const getOrders = async () =>  {
    const itemsFromServer = await fetchOrders()
    console.log(itemsFromServer)
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
    const serverbooks = await fetchBooks()
    setBooks(serverbooks)
  }
  getOrders()
}, [])

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
            elems().map((element, index) => (
              <tr key={index}>
                <th scope="col">{getName(element)}</th>
                <th scope="col">{element.quantity}</th>
                <th scope="col">{element.date}</th>
                <th scope="col">{element.shipment}</th>
              </tr>
            ))
          }

        </tbody>
      </table>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer></Footer>
   </div>
  )
}

export default OrderHistory
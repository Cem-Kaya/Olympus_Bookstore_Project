import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import "../App.css"
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProductManagerID } from '../helperFunctions/helperLogin'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCategories } from '../helperFunctions/helperCategories'

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
    max-width: 1200px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin: 0 5px;
    text-align: left;
`;

const Bold = styled.div`
  font-weight: bold;
`;

const ProductManagement = () => {
    let params = useParams()
    let navigate = useNavigate()

    useEffect (() => {
      console.log(params["pmid"])
      console.log(getProductManagerID())
      if(params["pmid"] !== getProductManagerID().toString()){
       navigate("/Account")
      }
    }, [params, navigate])

    const [expandableOpen, setExpandableOpen] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [deliveryList, setDeliveryList] = useState([])
    const [salesManagers, setSalesManagers] = useState([])
    const [categories, setCategories] = useState([])
    const [comments, setComments] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(0)
    const [useNewCategory, setUseNewCategory] = useState(false)

    const handleOpenExpandable = () => {
      setExpandableOpen(!expandableOpen)
    }

    const PrintValues = () => {
      console.log(title)
      console.log(salesManager)
      console.log(author)
      console.log(publisher)
      console.log(edition_number)
      console.log(model)
      console.log(warranty)
      console.log(initial_price)
      console.log(amountInStock)
      console.log(img1URL)
      console.log(img2URL)
      console.log(img3URL)
      console.log(description)
      console.log(category)
    }

    let title = ""
    let salesManager = ""
    let category = ""
    let categoryString = ""
    let author = ""
    let publisher = ""
    let edition_number = 0
    let model = ""
    let warranty = ""
    let initial_price = 0
    let amountInStock = 0
    let img1URL = ""
    let img2URL = ""
    let img3URL = ""
    let description = ""

    useEffect (() => {
      const getBooks = async () =>  {
        const itemsFromServer = await fetchBooks()
        const bookIds = await fetchProductIds()
        console.log(itemsFromServer)
        console.log(bookIds)
        
        let commonBooks = []
        bookIds.forEach(element => {
          itemsFromServer.forEach(item => {
            if(element.Pid === item.id)  {commonBooks.push(item)}
          })
        });
        setItems(commonBooks)
        setLoaded(true)
      }
      const getSalesManagers = async () =>  {
        const itemsFromServer = await fetchSalesManagers()
        const categories = await fetchCategories()
        console.log(itemsFromServer)
        let categoryList = []
        for (var key of Object.keys(categories)) {
            categoryList.push({cid: key, value: categories[key]})
        }
        console.log(categoryList)

        setCategories(categoryList)
        setSalesManagers(itemsFromServer)
        setLoaded(true)
      }
      const getDeliveryList = async () =>  {
        const itemsFromServer = await fetchDeliveryList()
        itemsFromServer.hasOwnProperty("status") ? setDeliveryList([]) : setDeliveryList(itemsFromServer)
        console.log(itemsFromServer)
        setLoaded(true)
      }
      const getComments = async () =>  {
        const itemsFromServer = await fetchComments()

        console.log(itemsFromServer)
        setComments(itemsFromServer)
        setLoaded(true)
      }
      if(navItemSelected === 2){
        getBooks()
      }
      else if(navItemSelected === 1){
        getDeliveryList()
      }
      else if(navItemSelected === 0){
        getBooks()
      }
      else if(navItemSelected === 3){
        getComments()
      }
      else if(navItemSelected === 4){
        getSalesManagers()
      }
      else if(navItemSelected === 5){
        getDeliveryList()
      }
    }, [navItemSelected])

    const fetchComments = async () => {
      const res = await fetch(`/get_comments_for_approval/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pmid: getProductManagerID()})
          }
          )
      const data = await res.json()
      return data
    }

    const fetchSalesManagers = async () => {
      const res = await fetch(`/all_salesmanagers`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }}
          )
      const data = await res.json()
      return data
    }
    
    const fetchDeliveryList = async () => {
      const res = await fetch(`/pmid_deliverylist/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pmid: getProductManagerID()})
          }
          )
      const data = await res.json()
      return data
  }

  const fetchProductIds = async () => {
    const res = await fetch(`/products_pmid/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Pmid: getProductManagerID()})
        }
        )
    const data = await res.json()
    return data
  }

  const updateProductStock = async (index, amount) => {
    let item = items[index]
    let sale = 1 - (parseFloat(item["discount"]) / 100)
    console.log(sale)
    const res = await fetch(`/update_book/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Pid: item["id"], name: item["title"], description: item["description"],
                    quantity: amount, amount_sold: item["amount_sold"], price: item["price"], sale: sale})
        }
        )
    const data = await res.json()
    return data
  }

  const updateStock = async (index, amount) => {
    const serverAnswer = await updateProductStock(index, amount)
    console.log(serverAnswer)
  }

  const addNewProduct = async () => {
    try
    {
      const res = await fetch(`/Products_reg/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pcid: category, Sid: salesManager, Pmid: getProductManagerID(), name: title, 
            model: model, description: description, edition_number: edition_number, quantity: amountInStock,
            amount_sold: 0, price: initial_price, raiting: 1.0, author: author, warranty: warranty,
            distributor_Information: publisher, sale: 1.0, 
            picture_url0: img1URL, picture_url1: img2URL, picture_url2: img3URL})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new product")
    }
  }

  const addNewCategory = async () => {
    try
    {
      const res = await fetch(`/Product_Catogary_reg/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({name: categoryString})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

  const newProduct = async () => {
    if(category === ""){
      category = categories[0]["cid"]
    }
    if(salesManager === ""){
      salesManager = salesManagers[0]["Sid"]
    }
    
    if(useNewCategory)
    {
      if(categoryString === ""){
        console.log("Category name cannot be empty string")
      }
      else{
        let serverAnswer = await addNewCategory()
        console.log(serverAnswer)
        let ctgrs = await fetchCategories()

        for (var key of Object.keys(ctgrs)) {
          ctgrs[key] === categoryString ? category = key : category = category
        }
      }
    }
    console.log(category)
    const serverAnswer = await addNewProduct()
    console.log(serverAnswer)
  }

  const commentApproval = async (cid, approved) => {
    try
    {
      const res = await fetch(`/Approval/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pmid: getProductManagerID(), cid: cid, approved: approved})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

  const sendApprovalInfo = async (cid, approved) => {
    await commentApproval(cid, approved)
  }
  // Process=str ( data2['Process'] )
  // Pmid=int ( data2['Pmid'] )
  // Pid=int( data2['Pid'] )
  // purcid = int( data2['purcid'] )

  const updateDeliveryStatus = async (pid, purcid, newStatus) => {
    const serverAnswer = await updateDelivery(pid, purcid, newStatus)
    console.log(serverAnswer)
  }

  const updateDelivery = async (pid, purcid, newStatus) => {
    try
    {
      const res = await fetch(`/delivery_process/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Process: newStatus, Pmid: getProductManagerID(), Pid: pid, purcid: purcid})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

    const getPageBody = () => {
      switch(navItemSelected){
        case 0:
          return items.map(item => (
            <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
            <div className='row'>
                <div className="col-md-4 mb-3">
                  <label htmlFor="img0">Image 1</label>
                  <br></br>
                  <a href={`/SingleProduct=${item.id}`}><img src={item.img} alt="a" height="160px"></img></a>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="img1">Image 2</label>
                  <br></br>
                  <a href={`/SingleProduct=${item.id}`}><img src={item.img1} alt="a" height="160px"></img></a>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="img2">Image 3</label>
                  <br></br>
                  <a href={`/SingleProduct=${item.id}`}><img src={item.img2} alt="a" height="160px"></img></a>
                </div>

                <div className="col-md-12 mb-3">
                  <hr className='bg-light'/>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="Description">General Information</label>    
                </div>

                <div className="col-md-4 mb-3">
                  <div className='row'>  
                      <TextBox><p>Title: {item.title}</p></TextBox>
                  </div>   
                  <div className='row'>  
                      <TextBox><p>Author: {item.author}</p></TextBox>
                  </div>  
                  <div className='row'>  
                      <TextBox><p>Publisher: {item.publisher}</p></TextBox>
                  </div> 
                  <div className='row'>  
                    <TextBox><p>Raiting: {item.raiting} stars</p></TextBox>
                  </div> 
                </div> 
                <div className="col-md-4 mb-3">
                  <div className='row'>  
                    <TextBox><p>Amount Sold: {item.amount_sold}</p></TextBox>
                  </div>  
                  <div className='row'>  
                    <TextBox><p>Amount Remaining In Stock: {item.in_stock}</p></TextBox>
                  </div>  
                  <div className='row'>  
                    <TextBox><p>Discount: {item.discount}</p></TextBox>
                  </div>  
                  <div className='row'>  
                    <TextBox><p>Price: {item.price} TL</p></TextBox>
                  </div>  
                </div>
                <div className="col-md-4 mb-3">
                  <div className='row'>  
                    <TextBox><p>Model: {item.model}</p></TextBox>
                  </div>  
                  <div className='row'>  
                    <TextBox><p>Warranty: {item.warranty}</p></TextBox>
                  </div>  
                  <div className='row'>  
                    <TextBox><p>Date: {item.date}</p></TextBox>
                  </div>  
                  <div className='row'>  
                    <TextBox><p>Edition Number: {item.edition_number}</p></TextBox>
                  </div>  
                </div>

                <div className="col-md-12 mb-3">
                  <hr className='bg-light'/>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="Description">Description</label>
                  <TextBox><p>{item.description}</p></TextBox>
                </div>
            </div>
            <br></br>
            </div>))
        case 1:
          return (      
          <TableBody>
          {
            deliveryList.length === 0 ? 
            <p className='text-light'>Delivery List is Empty</p>
            :
            <table className="table table-striped table-dark table-bordered" >
            <thead>
              <tr>
                <th scope="col" width="8%">Delivery ID</th>
                <th scope="col" width="10%">Customer E-mail</th>
                <th scope="col" width="8%">Product ID</th>
                <th scope="col" width="6%">Quantity</th>
                <th scope="col" width="10%">Total Price</th>
                <th scope="col" width="30%">Delivery Address</th>
                <th scope="col" width="10%">Delivery Status</th>
                <th scope="col" width="18%">Update Status</th>
              </tr>
            </thead>
            <tbody>
            {
              deliveryList.map((element, index) => (
                <tr key={index}>
                  {/* <th scope="col"><a href={`/SingleProduct=${element.pid}`}><img alt="" src={getImage(element)}></img></a></th> */}
                  <th scope="col" className='text-center'>{element.did}</th>
                  <th scope="col">{element.email}</th>
                  <th scope="col"><a href={`/SingleProduct=${element.Pid}`} className="text-light">{element.Pid}</a></th>
                  <th scope="col">{element.quantity}</th>
                  <th scope="col">{element["total price"]} TL</th>
                  <th scope="col">{element.address}</th>
                  <th scope="col">{element.shipment}</th>
                  {
                    element.shipment === "Processing" ?
                    <th scope="col">
                      <button type="submit" className='btn-warning btn-block' onClick={() => {updateDeliveryStatus(element["Pid"], element["purcid"], "In-transit"); setNavItemSelected(0); setLoaded(false)}}>Change to In Transit</button>
                    </th>
                    :
                    element.shipment === "In-transit" ?
                    <th scope="col">
                      <button type="submit" className='btn-warning btn-block' onClick={() => {updateDeliveryStatus(element["Pid"], element["purcid"], "Delivered"); setNavItemSelected(0); setLoaded(false)}}>Change to Delivered</button>
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
        case 2:
          let amountsInStock = []
          for(var i = 0; i < items.length; i++){
            amountsInStock.push(0)
          }
          
          return items.map((item, index) => (
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
                  <br></br>
                  <label htmlFor="lastName">Amount Remaining In Stock</label>
                  <input type="number" className="form-control" id="lastName" placeholder={`current amount in stock: ${item.in_stock}`} onChange={event => (amountsInStock[index] = event.target.value)} required=""/>
                  <div className="invalid-feedback">
                      Valid last name is required.
                  </div>
                  <br></br>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12 mb-3">
                <button className='btn btn-primary btn-lg btn-block' onClick={() => {updateStock(index, amountsInStock[index]); setNavItemSelected(0); setLoaded(false)}}>Update Stock</button>
                </div>
            </div>
            </div>))
        case 3:
          return (      
          <TableBody>
          {
            comments.length === 0 ? 
            <p className='text-light'>Comment List is Empty</p>
            :
            <table className="table table-striped table-dark table-bordered" >
              <thead>
                <tr>
                  <th scope="col" width="20%">User ID</th>
                  <th scope="col" width="10%">Stars</th>
                  <th scope="col" width="50%">Comment Body</th>
                  <th scope="col" width="20%">Approve/Reject</th>
                </tr>
              </thead>
              <tbody>
              {
                comments.map((element, index) => (
                  <tr key={index}>
                    {/* <th scope="col"><a href={`/SingleProduct=${element.pid}`}><img alt="" src={getImage(element)}></img></a></th> */}
                    <th scope="col" className='text-center'>{element.uid}</th>
                    <th scope="col">{element.stars}</th>
                    <th scope="col">{element.text}</th>
                    <th scope="col" className="d-flex flex-column justify-content-around">
                      <button type="submit" className='btn-warning btn-block' onClick={() => {sendApprovalInfo(element.cid, 1); setNavItemSelected(0); setLoaded(false)}}>Approve</button>
                      <br/>
                      <button type="submit" className='btn-warning btn-block' onClick={() => {sendApprovalInfo(element.cid, 0); setNavItemSelected(0); setLoaded(false)}}>Reject</button>
                    </th>
                  </tr>
                ))
              }
              </tbody>
            </table>
          }
        </TableBody>
        )
        case 5:
          return deliveryList.map((item, index) => (
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
                    <input type="text" className="form-control" id="title" onChange={event => (title = event.target.value)} placeholder="e.g. Attak on Titan"/>
                    <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="sm">Sales Manager</label>
                    <select className="form-control" onChange={event => (salesManager = event.target.value)}>
                        {salesManagers.map(elem => (
                          <option value={elem.Sid}>{elem.name}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div>
                </div>
              </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="firstName">Author</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" onChange={event => (author = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="lastName">Publisher</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (publisher = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Amount In Stock</label>
                    <input type="number" className="form-control" id="lastName" placeholder="" onChange={event => (amountInStock = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2 mb-3">
                    <label htmlFor="firstName">Edition Number</label>
                    <input type="number" className="form-control" id="firstName" placeholder="" onChange={event => (edition_number = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Model</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (model = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Warranty</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => (warranty = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Initial Price</label>
                    <input type="number" className="form-control" id="lastName" placeholder="" onChange={event => (initial_price = event.target.value)} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">

                      <div class="form-check" onClick={() => {setUseNewCategory(false)}}>
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked={!useNewCategory}/>
                        <label>Use Existing Category</label>
                      </div>

                      <select className="form-control" disabled={useNewCategory} onChange={event => (category = event.target.value)}>
                            {console.log(categories)}
                          {categories.map((elem) => (
                            <option value={elem["cid"]}>{elem["value"]}</option>
                          ))}
                      </select>
                      <div className="invalid-feedback">
                        Please enter a valid email address htmlFor shipping updates.
                      </div>

                  </div>
                  <div className="col-md-2 mb-3">

                      <div class="form-check" onClick={() => {setUseNewCategory(true)}}>
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked={useNewCategory}/>
                        <label>Add New Category</label>
                      </div>

                      <input type="text" disabled={!useNewCategory} className="form-control" id="lastName" placeholder="" onChange={event => (categoryString = event.target.value)} required=""/>
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                </div>
                <div className="mb-3">
                  <label htmlFor="email">Image 1 URL  </label>
                  <input type="url" className="form-control" id="url1" onChange={event => (img1URL = event.target.value)} placeholder="http://..."/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Image 2 URL  </label>
                  <input type="url" className="form-control" id="url2" onChange={event => (img2URL = event.target.value)} placeholder="http://..."/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Image 3 URL  </label>
                  <input type="url" className="form-control" id="url3" onChange={event => (img3URL = event.target.value)} placeholder="http://..."/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address">Description</label>
                  <textarea type="text" className="form-control" id="address" onChange={event => (description = event.target.value)} placeholder="e.g. This book tells the story of..." required=""/>
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <br></br>
                <div className='row'>
                    <div className="col-md-12 mb-0">
                      <button type="submit" className='btn btn-warning btn-lg btn-block' onClick={() => {newProduct()}}>Add This Product</button>
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
          
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a className="navbar-brand" href="#">Product Management</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link" onClick={() => {setNavItemSelected(0); setLoaded(false)}} href="#">View All Products<span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" onClick={() => {setNavItemSelected(1); setLoaded(false)}} href="#">Delivery List</a>
                    <a className="nav-item nav-link" onClick={() => {setNavItemSelected(2); setLoaded(false)}} href="#">Update Stock</a>
                    <a className="nav-item nav-link" onClick={() => {setNavItemSelected(3); setLoaded(false)}} href="#">Comments to be Approved</a>
                    <a className="nav-item nav-link" onClick={() => {setNavItemSelected(4); setLoaded(false)}} href="#">Add a New Product</a>
                    <a className="nav-item nav-link" onClick={() => {setNavItemSelected(5); setLoaded(false)}} href="#">View Invoices</a>
                    </div>
                </div>
                <a className="nav-item nav-link" href="/Account">Go Back to the Account Page</a>
            </nav>
            {
              !loaded ?
              <div className="d-flex justify-content-center">
                  <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
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
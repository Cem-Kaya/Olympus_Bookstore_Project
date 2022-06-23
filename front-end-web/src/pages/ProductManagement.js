import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import "../styles/App.css"
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProductManagerID } from '../helperFunctions/helperLogin'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCategories } from '../helperFunctions/helperCategories'
import { addNewCategory, fetchSalesManagers, fetchDeliveryList, fetchProductIds, 
        updateProductStock, fetchComments, fetchDeletedProducts, updateDelivery, commentApproval, 
        deleteProduct, undeleteProduct } from '../helperFunctions/helperProductManager'

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

const TextBoxLarge = styled.div`
    max-width: 2400px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin: 0 5px;
    text-align: left;
`;

const ProductManagement = () => {
    let params = useParams()
    let navigate = useNavigate()

    useEffect (() => {
      console.log(params["pmid"])
      console.log(getProductManagerID())
      if(params["pmid"] !== getProductManagerID().toString()){
       navigate("/")
      }
    }, [params, navigate])

    const [loaded, setLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [deliveryList, setDeliveryList] = useState([])
    const [salesManagers, setSalesManagers] = useState([])
    const [categories, setCategories] = useState([])
    const [comments, setComments] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(0)
    const [useNewCategory, setUseNewCategory] = useState(false)
    const [addProductValues, setAddPRoductValues] = useState({
    title: "",
    salesManager: "",
    category: "",
    categoryString: "",
    author: "",
    publisher: "",
    edition_number: 0,
    model: "",
    warranty: "",
    initial_price: 0,
    amountInStock: 0,
    img1URL: "",
    img2URL: "",
    img3URL: "",
    description: ""})

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
      const getDeletedProducts = async () => {
        const deletedProducts = await fetchDeletedProducts()
        setItems(deletedProducts)
      }
      if(navItemSelected === 0){
        getBooks()
      }
      else if(navItemSelected === 1){
        getDeliveryList()
      }
      else if(navItemSelected === 2){
        getBooks()
      }
      else if(navItemSelected === 3){
        getComments()
      }
      else if(navItemSelected === 4){
        getDeletedProducts()
        getSalesManagers()
        setAddPRoductValues({
          title: "",
          salesManager: "",
          category: "",
          categoryString: "",
          author: "",
          publisher: "",
          edition_number: 0,
          model: "",
          warranty: "",
          initial_price: 0,
          amountInStock: 0,
          img1URL: "",
          img2URL: "",
          img3URL: "",
          description: ""})
      }
      else if(navItemSelected === 5){
        getBooks()
      }
      else if(navItemSelected === 6){
        getDeliveryList()
      }
    }, [navItemSelected])

  const updateStock = async (index, amount) => {
    const serverAnswer = await updateProductStock(items[index], amount)
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
          body: JSON.stringify({"Pcid": addProductValues.category, "Sid": addProductValues.salesManager, "Pmid": getProductManagerID(), "name": addProductValues.title, 
            "model": addProductValues.model, "description": addProductValues.description, "edition_number": addProductValues.edition_number, "quantity": addProductValues.amountInStock,
            "amount_sold": 0, "price": addProductValues.initial_price, "raiting": 1.0, "author": addProductValues.author, "warranty": addProductValues.warranty,
            "distributor_Information": addProductValues.publisher, "sale": 1.0, 
            "picture_url0": addProductValues.img1URL, "picture_url1": addProductValues.img2URL, "picture_url2": addProductValues.img3URL})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new product")
    }
  }

  const newProduct = async () => {
    let addPValuesCopy = addProductValues
    if(addProductValues.category === ""){
      addPValuesCopy.category = categories[0]["cid"]
    }
    if(addProductValues.salesManager === ""){
      addPValuesCopy.salesManager = salesManagers[0]["Sid"]
    }

    if(useNewCategory)
    {
      if(addProductValues.categoryString === ""){
        console.log("Category name cannot be empty string")
      }
      else{
        let serverAnswer = await addNewCategory(addProductValues.categoryString)
        console.log(serverAnswer)
        let ctgrs = await fetchCategories()

        for (var key of Object.keys(ctgrs)) {
          ctgrs[key] === addProductValues.categoryString ? addPValuesCopy.category = key : addPValuesCopy.category = addPValuesCopy.category
        }
      }
    }
    setAddPRoductValues(addPValuesCopy)
    // console.log(addPValuesCopy.category)
    // console.log(addPValuesCopy.title) 
    // console.log(addPValuesCopy.salesManager )
    // console.log(addPValuesCopy.category )
    // console.log(addPValuesCopy.categoryString )
    // console.log( addPValuesCopy.author )
    // console.log( addPValuesCopy.publisher) 
    // console.log( addPValuesCopy.edition_number )
    // console.log( addPValuesCopy.model )
    // console.log( addPValuesCopy.warranty) 
    // console.log( addPValuesCopy.initial_price) 
    // console.log( addPValuesCopy.amountInStock )
    // console.log( addPValuesCopy.img1URL )
    // console.log( addPValuesCopy.img2URL )
    // console.log( addPValuesCopy.img3URL )
    // console.log( addPValuesCopy.description )
    const serverAnswer = await addNewProduct()
    console.log(serverAnswer)
  }

  const sendApprovalInfo = async (cid, approved) => {
    await commentApproval(cid, approved)
  }

  const updateDeliveryStatus = async (pid, purcid, newStatus) => {
    const serverAnswer = await updateDelivery(pid, purcid, newStatus)
    console.log(serverAnswer)
  }

  const removeThisProduct = async (item) => {
    const serverAnswer = await deleteProduct(item)
    console.log(serverAnswer)
  }

  const unRemoveThisProduct = async (item) => {
    const serverAnswer = await undeleteProduct(item)
    console.log(serverAnswer)
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
                <th scope="col" width="8%">Total Price</th>
                <th scope="col" width="12%">Order Date</th>
                <th scope="col" width="30%">Delivery Address</th>
                <th scope="col" width="10%">Delivery Status</th>
                <th scope="col" width="8%">Update Status</th>
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
                  <th scope="col">{element.date}</th>
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
                      <button type="submit" className='btn-danger btn-block' onClick={() => {updateDeliveryStatus(element["Pid"], element["purcid"], "Delivered"); setNavItemSelected(0); setLoaded(false)}}>Change to Delivered</button>
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
        case 4:
          return (
          <>
          {items.map(item => (
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
            </div>
            <br></br>
            <div className='row'>
              <button className='btn btn-primary btn-lg btn-block' onClick={() => {unRemoveThisProduct(item); setNavItemSelected(0); setLoaded(false)}}>Undo Remove</button>
            </div>
            </div>))}
          <Card>
            <div className={"container_exp" }>
              <br></br>
              <div className='upper'>
            <h2>Add A New Product</h2>
            </div>
            <div className='lower'>
            <form className="needs-validation" noValidate="">
              <div className="row">
                  <div className="col-md-9 mb-3">
                    <label htmlFor="text">Title  </label>
                    <input type="text" className="form-control" id="title" onChange={event => setAddPRoductValues({...addProductValues, title: event.target.value})} placeholder="e.g. Attak on Titan"/>
                    <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="sm">Sales Manager</label>
                    <select className="form-control" onChange={event => setAddPRoductValues({...addProductValues, salesManager: event.target.value})}>
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
                    <input type="text" className="form-control" id="firstName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, author: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="lastName">Publisher</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, publisher: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Amount In Stock</label>
                    <input type="number" className="form-control" id="lastName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, amountInStock: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2 mb-3">
                    <label htmlFor="firstName">Edition Number</label>
                    <input type="number" className="form-control" id="firstName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, edition_number: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Model</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, model: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Warranty</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, warranty: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="lastName">Initial Price</label>
                    <input type="number" className="form-control" id="lastName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, initial_price: event.target.value})} required=""/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">

                      <div class="form-check" onClick={() => {setUseNewCategory(false)}}>
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked={!useNewCategory}/>
                        <label>Use Existing Category</label>
                      </div>

                      <select className="form-control" disabled={useNewCategory} onChange={event => setAddPRoductValues({...addProductValues, category: event.target.value})}>
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

                      <input type="text" disabled={!useNewCategory} className="form-control" id="lastName" placeholder="" onChange={event => setAddPRoductValues({...addProductValues, categoryString: event.target.value})} required=""/>
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                </div>
                <div className="mb-3">
                  <label htmlFor="email">Image 1 URL  </label>
                  <input type="url" className="form-control" id="url1" onChange={event => setAddPRoductValues({...addProductValues, img1URL: event.target.value})} placeholder="http://..."/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Image 2 URL  </label>
                  <input type="url" className="form-control" id="url2" onChange={event => setAddPRoductValues({...addProductValues, img2URL: event.target.value})} placeholder="http://..."/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Image 3 URL  </label>
                  <input type="url" className="form-control" id="url3" onChange={event => setAddPRoductValues({...addProductValues, img3URL: event.target.value})} placeholder="http://..."/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address">Description</label>
                  <textarea type="text" className="form-control" id="address" onChange={event => setAddPRoductValues({...addProductValues, description: event.target.value})} placeholder="e.g. This book tells the story of..." required=""/>
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <br></br>
                <div className='row'>
                    <div className="col-md-12 mb-0">
                      <button type="submit" className='btn btn-warning btn-lg btn-block' onClick={() => {newProduct(); setNavItemSelected(0); setLoaded(false)}}>Add This Product</button>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </Card>
        </>)
        case 5:
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
            <div className='row'>
              <button className='btn btn-primary btn-lg btn-block' onClick={() => {removeThisProduct(item); setNavItemSelected(0); setLoaded(false)}}>Delete This Product</button>
            </div>
            </div>))
        case 6:
          return deliveryList.map((item, index) => (
            <div className='container mt-5 mb-5 bg-secondary text-white' style={{padding:"60px"}}>
              <div className='row'>
                <div className="col-md-6 mb-0 text-left">
                  <h5>Invoice Information</h5>
                </div>
                <div className="col-md-6 mb-0 text-left">
                  <h5>Product Information</h5>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-12 mb-3">
                  <hr className='bg-light'/>
                </div>
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
                </div>
              </div>
              <div className='row'>
                <div className="col-md-12 mb-3">
                  <hr className='bg-light'/>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-6 mb-3">
                  <TextBoxLarge><p>Order Date: {item.date.split(" ")[0]}</p></TextBoxLarge>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-6 mb-3">
                  <TextBoxLarge><p>Delivery Address: {item.address}</p></TextBoxLarge>
                </div>
              </div>
              <div className='row'>
                <div className="col-md-6 mb-3">
                  <TextBoxLarge><p>Shipment Information: {item.shipment}</p></TextBoxLarge>
                </div>
              </div>
            </div>))
        default:  
            return <></>
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
                    <a className={navItemSelected === 0 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(0); setLoaded(false)}} href="#">View All Products<span className="sr-only">(current)</span></a>
                    <a className={(navItemSelected === 1 || navItemSelected === 1.5) ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(1); setLoaded(false)}} href="#">Delivery List</a>
                    <a className={navItemSelected === 2 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(2); setLoaded(false)}} href="#">Update Stock</a>
                    <a className={navItemSelected === 3 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(3); setLoaded(false)}} href="#">Comments to be Approved</a>
                    <a className={navItemSelected === 4 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(4); setLoaded(false)}} href="#">Add/Undo Remove</a>
                    <a className={navItemSelected === 5 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(5); setLoaded(false)}} href="#">Remove a Product</a>
                    <a className={navItemSelected === 6 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(6); setLoaded(false)}} href="#">View Invoices</a>
                    </div>
                </div>
                <a className="nav-item nav-link" href="/">Go Back to the Main Page</a>
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
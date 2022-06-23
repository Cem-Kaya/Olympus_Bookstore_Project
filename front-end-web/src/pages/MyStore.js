import React from 'react'
import styled, { withTheme } from 'styled-components'
import { useState, useEffect } from 'react'
import { fetchBooks } from '../helperFunctions/helperGetProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getStoreManagerID } from '../helperFunctions/helperLogin'
import { useNavigate, useParams } from 'react-router-dom'
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { jsPDF } from "jspdf";
import { refundApproval, fetchProductIds, fetchRefundRequests, 
  updateProductPrice, fetchInvoices, fetchInvoicesFromDateRange,
  downloadInvoicesFromDateRange } from '../helperFunctions/helperStoreManager';

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

const TextBoxLarge = styled.div`
    max-width: 2400px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin: 0 5px;
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

    let startDate
    let endDate
    const getInvoicesFromDateRange = () => {
      console.log(startDate)
      console.log(endDate)
      if(startDate !== undefined && endDate !== undefined){
        let dateArray = []
        dateArray.push(startDate)
        dateArray.push(endDate)
        setDates(dateArray)
      }
      else if(startDate !== undefined){
        if(dates.length !== 0){
          let dateArray = dates
          dateArray[0] = startDate
          setDates(dateArray)
        }
        else{
          let dateArray = []
          dateArray.push(startDate)
          dateArray.push(undefined)
          setDates(dateArray)
        }
      }
      else if(endDate !== undefined){
        if(dates.length !== 0){
          let dateArray = dates
          dateArray[1] = endDate
          setDates(dateArray)
        }
        else{
          let dateArray = []
          dateArray.push(undefined)
          dateArray.push(endDate)
          setDates(dateArray)
        }
      }
    }

    useEffect (() => {
      console.log(params["sid"])
      console.log(getStoreManagerID())
      if(params["sid"] !== getStoreManagerID().toString()){
       navigate("/")
      }
    }, [params, navigate])

    const download = async () => {
      const pdf = await fetchInvoicesFromDateRange(dates[0], dates[1])
      console.log(pdf)
      var doc = new jsPDF();
      let invoiceCount = 0
      let pdfText = `INVOICES FROM ${dates[0]} TO ${dates[1]}\n\n\n`
      pdf.forEach(function(info, i){
        invoiceCount++
        pdfText += 
            "Delivery list id: " + info.did + "\n" +
            "Pid of product: " + info.Pid + "\n" + 
            "Email: " + info.email + "\n" + 
            "Address: " + info.address + "\n" + 
            "Purchase ID: " + info.purcid + "\n" + 
            "Title: " + info.title + "\n" + 
            "author: " + info.author + "\n" + 
            "rating: " + info.rating + "\n" + 
            "publisher: " + info.publisher + "\n" + 
            "item price: " + info["total price"] / info.quantity + "\n" + 
            "total price: " + info["total price"] + "\n" + 
            "shipment: " + info.shipment + "\n" + 
            "quantity: " + info.quantity + "\n" + 
            "model: " + info.model + "\n" + 
            "edition_number: " + info.edition_number + "\n" + 
            "description: " + info.description + "\n" + 
            "warranty: " + info.warranty + "\n" + 
            "discount: " + info.discount + "\n" + 
            "order date: " + info.date + "\n" + 
            "\n\n\n"
        if(invoiceCount % 2 === 0){
          doc.text( pdfText, 10, 10 )
          doc.addPage()
          pdfText = "\n\n"
        }
      });
      doc.text( pdfText, 10, 10 )
      doc.save('Invoices.pdf');
    }


    const [loaded, setLoaded] = useState(false)
    const [innerLoaded, setInnerLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [refundRequests, setRefundRequests] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(0)
    const [dates, setDates] = useState([])
    const [userData, setUserData] = useState();
    const [userData2, setUserData2] = useState();
    const [userData3, setUserData3] = useState();
    const [userData4, setUserData4] = useState();
    const [userData5, setUserData5] = useState();

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
      const getInvoices = async () => {
        let invoices = await fetchInvoices()
        if(invoices.hasOwnProperty("status")){
          invoices = []
        }
        else{
        console.log(invoices)

        let uniqueTitles = [...new Set(invoices.map((data) => data.title))];
        let uniquePrices = []
        uniqueTitles.forEach(elem => {
          let prices = invoices.filter(item => item.title === elem)
          let price = 0
          prices.forEach(pr => price += pr["total price"])
          uniquePrices.push(price)
        })
        let uniqueQuantities = []
        uniqueTitles.forEach(elem => {
          let prices = invoices.filter(item => item.title === elem)
          let quantity = 0
          prices.forEach(pr => quantity += pr.quantity)
          uniqueQuantities.push(quantity)
        })
        console.log(uniqueQuantities)
        let newUniqueTitles = []
        uniqueTitles.forEach(elem => {
          if(elem.length > 20){
            elem = elem.substring(0, 20)
            elem += "..."
          }
          newUniqueTitles.push(elem)
        })
        
        setUserData({
          labels: newUniqueTitles,
          datasets: [
            {
              label: "Sales Profit",
              data: uniquePrices,
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        })
        setUserData2(
          {
            labels: newUniqueTitles,
            title: {
              display: true,
              text: 'TEST'
            },
            datasets: [
              {
                label: "Sold Amount",
                data: uniqueQuantities,
                borderColor: "white",
                borderWidth: 2,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
              },
            ],
          }
        )
        }
        let uniqueDates = [...new Set(invoices.map((data) => data.date.split(" ")[0]))];
        console.log(uniqueDates)
        let uniquePrices = []
        uniqueDates.forEach(elem => {
          let prices = invoices.filter(item => item.date.split(" ")[0] === elem)
          let price = 0
          prices.forEach(pr => price += pr["total price"])
          uniquePrices.push(price)
        })
        console.log(uniquePrices)
        setUserData3(
          {
            labels: uniqueDates,
            datasets: [
              {
                label: "Sales with Dates",
                data: uniquePrices,
                borderColor: "white",
                borderWidth: 2,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
              },
            ],
          }
        )
        let refundedItems = await fetchRefundRequests()
        refundedItems = refundedItems.filter(item => item.refund_state === "Refunded")
        console.log(refundedItems)
        let refundedTotalPrice = 0
        let refundedTotalQuantity = 0
        refundedItems.forEach(item => {
          refundedTotalPrice += item.price * item.quantity
          refundedTotalQuantity += item.quantity
        })
        let soldTotalPrice = 0
        let soldTotalQuantity = 0
        invoices.forEach(item => {
          soldTotalPrice += item["total price"]
          soldTotalQuantity += item.quantity
        })
        console.log(refundedTotalPrice)
        console.log(soldTotalPrice)
        setUserData4(
          {
            labels: ["Sold", "Refunded"],
            datasets: [
              {
                label: "Sold vs Refunded Total Prices",
                data: [soldTotalPrice, refundedTotalPrice],
                borderColor: "white",
                borderWidth: 2,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
              },
            ],
          }
        )
        setUserData5(
          {
            labels: ["Sold", "Refunded"],
            datasets: [
              {
                label: "Sold vs Refunded Quantities",
                data: [soldTotalQuantity, refundedTotalQuantity],
                borderColor: "white",
                borderWidth: 2,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
              },
            ],
          }
        )
        
        setLoaded(true)
      }
      const getInvoicesFromDate = async () => {
        console.log(dates)
        if(dates.length !== 0 && dates[0] !== undefined && dates[1] !== undefined){
          const invoices = await fetchInvoicesFromDateRange(dates[0], dates[1])
          if(invoices.hasOwnProperty("status")){
            setItems([])
          }
          else{
            setItems(invoices)
          }
        }
        else{
          setItems([])
        }
        setLoaded(true)
      }
      if(navItemSelected === 0){
        getBooks()
      }
      else if(navItemSelected === 1){
        getInvoicesFromDate()
      }
      else if(navItemSelected === 1.5){
        getInvoicesFromDate()
      }
      else if(navItemSelected === 2){
        getInvoices()
      }
      else if(navItemSelected === 3){
        getRefundRequests()
      }
    }, [navItemSelected, innerLoaded, dates])

    const updatePrice = async (index, discount, price) => {
        let sale = (1 - (discount / 100)).toFixed(2)
        price = price * sale
        const serverAnswer = await updateProductPrice(items[index], sale, price)
        console.log(serverAnswer)
    }
    
      const sendApprovalInfo = async (id, approved) => {
        await refundApproval(id, approved)
      }

    const getPageBody = () => {
        switch(navItemSelected){

          case 1:
                return (items.map((item, index) => (
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
                        <div className="col-md-8 mb-3">
                          <div className='row'>
                            <TextBoxLarge><p>Order Date: {item.date.split(".")[0]}</p></TextBoxLarge>
                          </div>
                          <div className='row'>
                            <TextBoxLarge><p>Delivery Address: {item.address}</p></TextBoxLarge>
                          </div>
                          <div className='row'>
                            <TextBoxLarge><p>Shipment Information: {item.shipment}</p></TextBoxLarge>
                          </div>
                        </div>
                      </div>
                    </div>))
                    )
            case 1.5:
                return (items.map((item, index) => (
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
                        <div className="col-md-8 mb-3">
                          <div className='row'>
                            <TextBoxLarge><p>Order Date: {item.date.split(".")[0]}</p></TextBoxLarge>
                          </div>
                          <div className='row'>
                            <TextBoxLarge><p>Delivery Address: {item.address}</p></TextBoxLarge>
                          </div>
                          <div className='row'>
                            <TextBoxLarge><p>Shipment Information: {item.shipment}</p></TextBoxLarge>
                          </div>
                        </div>
                      </div>
                    </div>))
                    )
        case 2:
          return ( 
            <>
            {userData2 !== undefined && userData2 !== null && userData !== undefined && userData !== null ?     
            <div className='container mt-5 mb-5 bg-dark text-white'>
              <div className='row'>
                <div className="col-md-8 mb-0 text-left">
                  <BarChart chartData={userData} />
                </div>
                <div className="col-md-4 mb-0 text-left">
                  <PieChart chartData={userData} />
                </div>
              </div>
              <div className='row'>
                <div className="col-md-8 mb-0 text-left">
                  <LineChart chartData={userData2} />
                </div>
                <div className="col-md-4 mb-0 text-left">
                  <PieChart chartData={userData2} />
                </div>
              </div>
              <div className='row'>
                <div className="col-md-8 mb-0 text-left">
                  <LineChart chartData={userData3} />
                </div>
                <div className="col-md-4 mb-0 text-left">
                  <PieChart chartData={userData3} />
                </div>
              </div>
              <br></br><br></br>
              <div className='row'>
                <div className="col-md-6 mb-0 text-left">
                  <BarChart chartData={userData4} />
                </div>
                <div className="col-md-6 mb-0 text-left">
                  <BarChart chartData={userData5} />
                </div>
              </div>
            </div>
            :
            <></>
            }
            </>
          )
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
                    <a class={navItemSelected === 0 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(0); setLoaded(false)}} href="#">View/Update Products <span class="sr-only">(current)</span></a>
                    <a class={navItemSelected === 1 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(1); setLoaded(false)}} href="#">View/Print Invoices</a>
                    <a class={navItemSelected === 2 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(2); setLoaded(false)}} href="#">Calculate Revenue</a>
                    <a class={navItemSelected === 3 ? "nav-item nav-link btn disabled" : "nav-item nav-link"} onClick={() => {setNavItemSelected(3); setLoaded(false)}} href="#">View Refund/Return Requests</a>
                    </div>
                </div>
                <a class="nav-item nav-link" href="/">Go Back to the Main Page</a>
            </nav>
        {
        navItemSelected === 1 ?
        <>
        <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
          <div className='row'>
            <div className="col-md-3 mb-0 text-left">
              <label>{"From  "}</label>
              <input type="date"  onChange={event => (startDate = event.target.value)}/>
            </div>
            <div className="col-md-3 mb-0 text-left">
              <label>{"To  "}</label>
              <input type="date" onChange={event => (endDate = event.target.value)}/>
            </div>
            <div className="col-md-4 mb-0 text-left">
            </div>
            <div className="col-md-2 mb-0 text-left">
              <button className='btn-primary btn-block' onClick={() => { getInvoicesFromDateRange(); setNavItemSelected(1.5); setLoaded(false)}}>Search</button>
            </div>
          </div>
        </div>
        {!loaded ?
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          : 
          items.length !== 0 ?
          <>
            <div className='container mt-0 mb-0 bg-dark text-light' style={{padding:"40px"}}>
              <div className="row">
                <div className="col-md-6 mb-0">
                </div>
                <div className="col-md-6 mb-0">
                  <button className='btn-block btn-info btn-lg' onClick={() => {download()}}>Download All as PDF</button>
                </div>
              </div>
            </div>
            {getPageBody()}
          </>
          :
          getPageBody()
        }
        </>
        :
        navItemSelected === 1.5 ?
        <>
          <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
            <div className='row'>
              <div className="col-md-3 mb-0 text-left">
                <label>{"From  "}</label>
                <input type="date"  onChange={event => (startDate = event.target.value)}/>
              </div>
              <div className="col-md-3 mb-0 text-left">
                <label>{"To  "}</label>
                <input type="date" onChange={event => (endDate = event.target.value)}/>
              </div>
              <div className="col-md-4 mb-0 text-left">
              </div>
              <div className="col-md-2 mb-0 text-left">
                <button className='btn-primary btn-block' onClick={() => { getInvoicesFromDateRange(); setNavItemSelected(1); setLoaded(false)}}>Search</button>
              </div>
            </div>
          </div>
          {!loaded ?
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          : 
          items.length !== 0 ?
          <>
            <div className='container mt-0 mb-0 bg-dark text-light' style={{padding:"40px"}}>
              <div className="row">
                <div className="col-md-6 mb-0">
                </div>
                <div className="col-md-6 mb-0">
                  <button className='btn-block btn-info btn-lg' onClick={() => {download()}}>Download All as PDF</button>
                </div>
              </div>
            </div>
            {getPageBody()}
          </>
          :
            getPageBody()
          }
        </>
        :
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
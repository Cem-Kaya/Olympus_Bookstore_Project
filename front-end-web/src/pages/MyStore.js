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
import { UserData } from "../components/Data";
import { refundApproval, fetchProductIds, fetchRefundRequests, updateProductPrice } from '../helperFunctions/helperStoreManager'

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

    useEffect (() => {
      console.log(params["sid"])
      console.log(getStoreManagerID())
      if(params["sid"] !== getStoreManagerID().toString()){
       navigate("/")
      }
    }, [params, navigate])


    const [loaded, setLoaded] = useState(false)
    const [innerLoaded, setInnerLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [refundRequests, setRefundRequests] = useState([])
    const [navItemSelected, setNavItemSelected] = useState(0)
    const [userData, setUserData] = useState({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "Users Gained",
          data: UserData.map((data) => data.userGain),
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
    });
    const [userData2, setUserData2] = useState({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "Users Gained",
          data: UserData.map((data) => data.userGain),
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
    });

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
      else if(navItemSelected === 1.5){
        setInnerLoaded(true)
      }
      else if(navItemSelected === 2){
        setLoaded(true)
      }
      else if(navItemSelected === 3){
        getRefundRequests()
      }
    }, [navItemSelected, innerLoaded])

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
                            <TextBoxLarge><p>Delivery Address: {item.address}</p></TextBoxLarge>
                          </div>
                          <div className='row'>
                            <TextBoxLarge><p>Shipment Information: {item.shipment}</p></TextBoxLarge>
                          </div>
                        </div>
                        <div className="col-md-4 mb-0">
                          <button className='btn-block btn-info btn-lg'>Download as PDF</button>
                        </div>
                      </div>
                    </div>))
                    )
        case 2:
          return (      
            <div className='container mt-5 mb-5 bg-dark text-white'>
              <div className='row'>
                <div className="col-md-6 mb-0 text-left">
                  <BarChart chartData={userData} />
                </div>
                <div className="col-md-6 mb-0 text-left">
                  <LineChart chartData={userData2} />
                </div>
              </div>
              <br></br><br></br>
              <div className='row'>
                <div className="col-md-3 mb-0 text-left">
                  <PieChart chartData={userData} />
                </div>
                <div className="col-md-6 mb-0 text-left">
                  <PieChart chartData={userData} />
                </div>
                <div className="col-md-3 mb-0 text-left">
                  <PieChart chartData={userData} />
                </div>
              </div>
            </div>
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
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(0); setLoaded(false)}} href="#">View/Update Products <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(1); setLoaded(false)}} href="#">View/Print Invoices</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(2); setLoaded(false)}} href="#">Calculate Revenue</a>
                    <a class="nav-item nav-link" onClick={() => {setNavItemSelected(3); setLoaded(false)}} href="#">View Refund/Return Requests</a>
                    </div>
                </div>
                <a class="nav-item nav-link" href="/">Go Back to the Main Page</a>
            </nav>
        {
        navItemSelected === 1 ?
        <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
          <div className='row'>
            <div className="col-md-3 mb-0 text-left">
              <label>{"From  "}</label>
              <input type="date"/>
            </div>
            <div className="col-md-3 mb-0 text-left">
              <label>{"To  "}</label>
              <input type="date"/>
            </div>
            <div className="col-md-4 mb-0 text-left">
            </div>
            <div className="col-md-2 mb-0 text-left">
              <button className='btn-primary btn-block' onClick={() => {setNavItemSelected(1.5); setLoaded(false)}}>Search</button>
            </div>
          </div>
        </div>
        :
        navItemSelected === 1.5 ?
        <>
          <div className='container mt-5 mb-5 bg-secondary text-light' style={{padding:"40px"}}>
            <div className='row'>
              <div className="col-md-3 mb-0 text-left">
                <label>{"From  "}</label>
                <input type="date"/>
              </div>
              <div className="col-md-3 mb-0 text-left">
                <label>{"To  "}</label>
                <input type="date"/>
              </div>
              <div className="col-md-4 mb-0 text-left">
              </div>
              <div className="col-md-2 mb-0 text-left">
                <button className='btn-primary btn-block' onClick={() => {setInnerLoaded(false)}}>Search</button>
              </div>
            </div>
          </div>
          {!innerLoaded ?
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
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
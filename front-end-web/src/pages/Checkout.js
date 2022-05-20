import React from 'react'
import styled from 'styled-components'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState, useEffect } from 'react'
import { getCartItems, removeAllItem } from '../helperFunctions/helperCartItems'
import { getUserID } from "../helperFunctions/helperLogin";
import { useNavigate } from 'react-router-dom'
import { checkLogInStatus } from '../helperFunctions/helperLogin'

const Container = styled.div`
    padding-bottom: 50px;
    padding-top: 50px;
    min-height: 800px;
`;

const Checkout = () => {

  const [itemsBought, setItemsBought] = useState([])
  const [itemsNotBought, setItemsNotBought] = useState([])
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    if(checkLogInStatus() === false){
      navigate("/")
    }
    else{
      setItems(getCartItems())
      setLoaded(true)
    }
  }, [navigate]);

    const costOfItems = () => {
        let sum = 0;
        items.forEach(element => {
          sum += (element.price * element.quantity);
        });
        return sum;
    }
    let sfName = ""
    let slName = ""
    let email = ""
    let address1 = ""
    let address2 = ""
    let nameOnCard = ""
    let cardNumber = ""
    let cvv = ""
    let country = ""
    let month = "1"
    let year = "2022"

    const changesfName = (val) => {
        sfName = val
    }
    const changeslName = (val) => {
        slName = val
    }
    const changeemail = (val) => {
        email = val
    }
    const changeaddress1 = (val) => {
        address1 = val
    }
    const changeaddress2 = (val) => {
        address2 = val
    }
    const changesnameOnCard = (val) => {
        nameOnCard = val
    }
    const changecardNumber = (val) => {
        cardNumber = val
    }
    const changecvv = (val) => {
        cvv = val
    }
    const changecountry = (val) => {
        country = val
    }
    const changemonth = (val) => {
        month = val
    }
    const changeyear = (val) => {
        year = val
    }

    const getDidVal = async () => {
        try{
            const res = await fetch('/getnextdid', {
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                    },
            })
            const data = await res.json()
            console.log(data)
            return data
        }
        catch(e){
            console.log(e)
        }
    }

    const removeFromStock = async (item) => {
      try{
          const res = await fetch('/decreasestock/submit', {
          method: "POST",
          headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
              },
          body: JSON.stringify({"Pid": item.id, "quantity" : item.quantity})
          })
          const data = await res.json()

          return data
      }
      catch(e){
          console.log(e)
      }
  }
    
    const purchase = async (email, item, didVal) => {
        try{
            console.log(email)
            const res = await fetch('/to_purchase/submit', {
            method: "POST",
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
                },
            body: JSON.stringify({"email": email, "Pid": item.id, "quantity": item.quantity, "price": item.price , "sale": parseFloat(item.discount), "did": didVal })
            })
            const data = await res.json()
            console.log(data)

            return data
        }
        catch(e){
            console.log(e)
        }
    }

    const sendBankInfo = async () => {
      try{
        console.log(email)
        const res = await fetch('/bank/submit', {
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify({"creddit_card_number": cardNumber, "date": year, "cvc": cvv, "total_price": costOfItems() })
        })
        const data = await res.json()
        console.log(data)

        return data
    }
    catch(e){
        console.log(e)
    }
    }

    const purchaseAll = async () =>  {
      
      try{
        window.localStorage.setItem('old_cart', JSON.stringify(JSON.parse(window.localStorage.getItem('cart_items'))))
        await sendBankInfo()

        let did = await getDidVal()

        let email = getUserID()
        const cartItems = getCartItems()
  
        for (let item of cartItems) {
          let serverAnswer = await removeFromStock(item)
          if(serverAnswer["status"] === true){
            removeAllItem(item)
            let answer = await purchase(email, item, did)
            setItemsBought([...itemsBought, item])
          }
          else{
            setItemsNotBought([...itemsNotBought, item])
          }
        }
        window.localStorage.setItem('items_bought', JSON.stringify(itemsBought))
        window.localStorage.setItem('items_not_bought', JSON.stringify(itemsNotBought))

        return 0
      }
      catch(e){
        console.log(e)
      }
  }

  const PurchaseAllHelper = async () => {
    await purchaseAll()
  }

  const PurchaseAll = () => {
    PurchaseAllHelper()
    console.log(itemsBought)
    navigate(`/invoice`)
  }

  return (
      <div>
        <Header addToCartAllowed={false}></Header>
      <Container className='bg-light'>
      {
          !loaded ? 
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
            :
      <div className='container'>
    <body className='bg-light'>
        <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">{items.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {items.map((element,index) => 
                <li className="list-group-item d-flex justify-content-between lh-condensed" key={index}>
                    <div className="aside"><img src={element.img} alt="item-img" className="img-sm"/></div>
                    <div>
                        <h6 className="my-0">{element.title}</h6>
                        <small className="text-muted">{element.author}</small>
                        <h6 className="text-muted">{element.quantity + " in cart"}</h6>
                    </div>
                    <span className="text-muted">{(element.price * element.quantity).toFixed(2) + " TL"}</span>
                </li>
            )}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (TL)</span>
              <strong>{costOfItems().toFixed(2) + " TL"}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          {/*<h4 className="mb-3">Shipment address</h4>
          <form className="needs-validation" noValidate="">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" onChange={event => changesfName(event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" onChange={event => changeslName(event.target.value)} required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email  </label>
              <input type="email" className="form-control" id="email" onChange={event => changeemail(event.target.value)} placeholder="you@example.com"/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" onChange={event => changeaddress1(event.target.value)} placeholder="1234 Main St" required=""/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" onChange={event => changeaddress2(event.target.value)} placeholder="Apartment or suite"/>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" onChange={event => changecountry(event.target.value)} id="country" required="">
                  <option value="">Choose...</option>
                  <option value="Turkey">Turkey</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" required="">
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4"/>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="same-address"/>
              <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
            </div>
            <hr className="mb-4"/>
            
            <h4 className="mb-3">Billing address</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value="" required=""/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email  </label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required=""/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country" required="">
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" required="">
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4"/>*/}

            <form className="needs-validation" noValidate="">
            <h4 className="mb-3">Payment</h4>

            {/*<div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                <label className="custom-control-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                <label className="custom-control-label" htmlFor="debit">Debit card</label>
              </div>
            </div>*/}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input type="text" className="form-control" id="cc-name" onChange={event => changesnameOnCard(event.target.value)} placeholder="" required=""/>
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="number" className="form-control" id="cc-number" onChange={event => changecardNumber(event.target.value)} placeholder="" required=""/>
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration Month</label>
                    <div className="form-group">
                        <select className="form-control" onChange={event => changemonth(event.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration Year</label>
                    <div className="form-group">
                        <select className="form-control" onChange={event => changeyear(event.target.value)}>
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
                    </div>
                </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">CVV</label>
                <input className="form-control" type="number" id="cc-cvv" onChange={event => changecvv(event.target.value)} placeholder="" required=""/>
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>
            <hr className="mb-4"/>
            <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => {PurchaseAll()}}>Purchase</button>
          </form>
        </div>
        </div>
    </body>
    </div>
    }
    </Container>
    <Footer></Footer>
    </div>
  )
}

export default Checkout
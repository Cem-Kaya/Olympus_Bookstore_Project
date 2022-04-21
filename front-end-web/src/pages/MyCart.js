//Products.js and MyCart.js needs update

import React from 'react'
import CartItem from '../components/CartItem'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';
import { useLocation  } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const MyCart = ({params}) => {

  const history= useNavigate();
  const [items, setItems] = useState([]);
  
  //let location = useLocation();
  //console.log(location)
  //let itemList = location.state;
  //console.log(itemList)

  useEffect(() => {
    setItems(JSON.parse(window.localStorage.getItem('cart_items')));
  }, [/*itemList*/]);

  useEffect(() => {
    if(items === null)  {setItems([])}
    window.localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const costOfItems = () => {
    let sum = 0;
    items.forEach(element => {
      sum += (element.price * element.count);
    });
    return sum;
  }

  const RemoveAllFromCart = (item) => {

    let filteredState = items.filter((elem) => elem.id !== item.id)
    filteredState.length === 0 ? setItems([]) : setItems([...filteredState]) 
  }

  const RemoveFromCart = (item) => {
    let listOfItem = items.filter((elem) => elem.id === item.id)
    let count = listOfItem[0].count

    if(count !== 1){
      setItems(
        items.map(
          (elem) => elem.id === item.id ? { ...elem, count: elem.count - 1} : elem
        )
      )
    }
    else
    {
      let filteredState = items.filter((elem) => elem.id !== item.id)
      filteredState.length === 0 ? setItems([]) : setItems([...filteredState])
    }
  }

  const AddToCart = (item) => {

    let getItemAsList = items.filter((elem) => elem.id === item.id)
    if(getItemAsList.length === 0)
    {
      item = {...item, count: 1}
      if(items.length === 0){
        setItems([item])
      }
      else{
        setItems([...items, item])
      }
    } 
    else
    {
      setItems(
        items.map(
          (elem) => elem.id === item.id ? { ...elem, count: elem.count + 1} : elem
        )
      )
    }
  }

  return (

    <div className="App"> 
    {/*<div>
      <Header cartItems={items}/>
      <Container>
        <ProductBoxContainer>
          {items.length === 0 ? <h1>There are no products, start adding some!</h1>
           : <CartItems 
              items={items} 
              onRemoveAll={RemoveAllFromCart}
              onRemoveFromCart={RemoveFromCart}
              onAddToCart={AddToCart}/>}
        </ProductBoxContainer>
        <SummaryContainer>
          <TextHeader>Order Summary</TextHeader>
          <p>{`${items.length} Products`}</p>
          <p>{`Cost: ${costOfItems()} TL`}</p>
          <p>{`Shipment Cost: 10 TL`}</p>
          <p>{`Total Cost: ${costOfItems() + 10} TL`}</p>
          <p>{`Amount to Pay: ${costOfItems() + 10} TL`}</p>
          <ButtonStyle>Complete Transaction</ButtonStyle>
        </SummaryContainer>
      </Container>
      <Footer />
    </div>
  )
}*/}
      <Header itemsInCart={items}/>
        <section className="section-pagetop bg">
        <div className="container">
            <h2 className="title-page">Shopping cart</h2>
        </div> 
        </section>
        
        <section className="section-content padding-y">
        <div className="container">
        
        <div className="row">
            <main className="col-md-9">
        <div className="card">
        
        {items.length === 0 ? <h2>There are no products in your cart, start adding some!</h2>:
          <table className="table table-borderless table-shopping-cart">
          <thead className="text-muted">
          <tr className="small text-uppercase">
          <th scope="col">Product</th>
          <th scope="col"></th>
          <th scope="col" width="120">Quantity</th>
          <th scope="col"></th>
          <th scope="col" width="120">Price</th>
          <th scope="col" className="text-right" width="200"> </th>
          </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
            <CartItem 
              key={index}
              item={item}
              onAddToCart={AddToCart}
              onRemoveFromCart={RemoveFromCart}
              onRemoveAll={RemoveAllFromCart}
            />))}
          </tbody>
          
          </table>
        }
        
        <div className="card-body border-top">
            
            <button className="btn btn-danger float-md-right" style={{verticalAlign:"baseline"}} onClick={() => {setItems([])}}> Empty Cart <Delete/> </button>
            <button className="btn btn-light float-md-left" onClick={() => {history('/')}}> <i className="fa fa-chevron-left"></i> Continue shopping </button>
        </div>  
        </div> 
        
        <div className="alert alert-success mt-3">
            <p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
        </div>
        
            </main>
            <aside className="col-md-3">
                <div className="card mb-3">
                    <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Have coupon?</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="" placeholder="Coupon code" />
                                <span className="input-group-append"> 
                                    <button className="btn btn-primary">Apply</button>
                                </span>
                            </div>
                        </div>
                    </form>
                    </div> 
                </div>  
                <div className="card">
                    <div className="card-body">
                            <dl className="dlist-align">
                            <dt>Total price:</dt>
                            <dd className="text-right">{costOfItems().toFixed(2) + " TL"}</dd>
                            </dl>
                            <dl className="dlist-align">
                            <dt>Discount:</dt>
                            <dd className="text-right">0 TL</dd>
                            </dl>
                            <dl className="dlist-align">
                            <dt>Total:</dt>
                            <dd className="text-right  h5"><strong>{costOfItems().toFixed(2)  + " TL"}</strong></dd>
                            </dl>
                            <hr />
                            <dd>
                            <p className="text-center mb-3">
                                <img alt="payments" src="assets/images/misc/payments.png" height="26" />
                            </p>
                            </dd>
                            <hr />
                            <button className="btn btn-primary float-md-right"> Proceed to Checkout <i className="fa fa-chevron-right"></i> </button>
                    </div> 
                </div>  
            </aside> 
        </div>
        
        </div> 
        </section>
       
        <section className="section-name bg padding-y">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        </section>
        
    </div>
  );
}
export default MyCart;
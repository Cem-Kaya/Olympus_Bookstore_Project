import React from 'react'
import CartItem from '../components/CartItem'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { Delete } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { checkLogInStatus } from '../helperFunctions/helperLogin';
import { add1Item, remove1Item, emptyCart, removeAllItem, getCartItems } from '../helperFunctions/helperCartItems'

const MyCart = ({params}) => {

  const history= useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCartItems())
  }, []);

  const costOfItems = () => {
    let sum = 0;
    items.forEach(element => {
      sum += (element.price * element.quantity);
    });
    return sum;
  }

  const RemoveAllFromCart = (item) => {
    removeAllItem(item)
    setItems(getCartItems())
  }

  const RemoveFromCart = (item) => {
    remove1Item(item)
    setItems(getCartItems())
  }

  const AddToCart = (item) => {
    add1Item(item)
    setItems(getCartItems)
  }

  const EmptyCart = () => {
    emptyCart()
    setItems(getCartItems())
  }

  return (

    <div className="App">
      <Header itemsInCartChanged={items} addToCartAllowed={false} />
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
            
            <button className="btn btn-danger float-md-right" style={{verticalAlign:"baseline"}} onClick={() => {EmptyCart()}}> Empty Cart <Delete/> </button>
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
                            {
                              checkLogInStatus() ?
                              <button className="btn btn-primary float-md-right"> Proceed to Checkout <i className="fa fa-chevron-right"></i> </button>
                              :
                              <a className="page-link" href="/Login">Not Logged In Yet! Please Log In First</a>
                            }
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
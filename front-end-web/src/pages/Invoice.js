import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert'

const Body = styled.div`
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: 500px;
`;

const Invoice = () => {

    const [itemsBought, setItemsBought] = useState([])
    const [itemsNotBought, setItemsNotBought] = useState("")
    const [loaded, setLoaded] = useState(false)

    useEffect (() => {
        let bought_items = []
        let non_bought_items = []

        if(JSON.parse(window.localStorage.getItem('old_cart')) !== null 
            && JSON.parse(window.localStorage.getItem('old_cart')) !== undefined)
        {
            bought_items = JSON.parse(window.localStorage.getItem('old_cart'))
        }
        if(JSON.parse(window.localStorage.getItem('cart_items')) !== null 
            && JSON.parse(window.localStorage.getItem('cart_items')) !== undefined)
        {
            non_bought_items = JSON.parse(window.localStorage.getItem('cart_items'))
        }
        
        bought_items.forEach(elem => {
            non_bought_items.forEach((elem2) => {
                elem2.id === elem.id ? bought_items = bought_items.filter(elem3 => elem3.id !== elem.id) : bought_items = bought_items
            })
        })

        setItemsBought(bought_items)
        setItemsNotBought(non_bought_items)
        setLoaded(true)

    }, [])
    
  return (
    itemsNotBought === "" ?  <></>
    :
    <div>
        <Header></Header>
            <Body className='bg-dark'>
            {
                !loaded ? 
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className='container'>
                    {/* <div className="container mb-5 text-left">
                        <br></br>
                        <div className="media-body text-lightProduct  text-light">
                            <h3>Refresh this page if you think this page is showing wrong information</h3>
                            <br></br>
                        </div>
                    </div> */}
                    <Alert variant="success">
                        <Alert.Heading>Information About Your Order</Alert.Heading>
                        <p>
                            Refresh this page if you think this page is showing wrong information
                        </p>
                    </Alert>
                    <div className="container mt-5 mb-5 border bg-primary m-20">
                    <br></br>
                    <h3 className='text-white'>Products that you were unable to buy</h3><br></br>
                    <h5 className='text-white'>The amount of products in stock have been changed since the products were added to the cart for these items</h5>
                    <hr className='bg-white'/>
                    {
                        itemsNotBought.map((element) => (
                            <div className="container mt-4 mb-4 border bg-dark">
                                <br></br>
                                <div className="media-body text-lightProduct  text-light">
                                <h4 className="media-heading float-left">Product id: {element.id}</h4><br></br><br></br>
                                <h4 className="media-heading float-left">Product name: {element.title}</h4><br></br><br></br>
                                <h4 className="media-heading float-left">You would have bought {element.quantity} many of this item</h4><br></br><br></br>
                                <div className="d-flex justify-content-between align-items-center">
                                </div>
                                <br></br>
                                <br></br>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    <br></br>
                    <div className="container mt-5 mb-5 border bg-primary">
                    <br></br>
                    <h3 className='text-white'>Products that have been bought</h3>
                    <hr className='bg-white'/>
                    {
                        itemsBought.map((element) => (
                            <div className="container mt-4 mb-4 border bg-dark">
                                <br></br>
                                <div className="media-body text-lightProduct text-light">
                                <h4 className="media-heading float-left">Product id: {element.id}</h4><br></br><br></br>
                                <h4 className="media-heading float-left">Product name: {element.title}</h4><br></br><br></br>
                                <h4 className="media-heading float-left">You have bought {element.quantity} many of this item</h4><br></br><br></br>
                                <h4 className="media-heading float-left">It costed {element.quantity * element.price} TL</h4><br></br><br></br>
                                <div className="d-flex justify-content-between align-items-center">
                                </div>
                                <br></br>
                                <br></br>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    <br></br>
                </div>
            }
            </Body>
        <Footer></Footer>
    </div>
  )
}

export default Invoice
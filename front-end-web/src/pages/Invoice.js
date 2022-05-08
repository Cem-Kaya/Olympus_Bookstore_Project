import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Body = styled.div`
    padding-top: 100px;
    padding-bottom: 100px;
`;

const Invoice = () => {

    const [itemsBought, setItemsBought] = useState([])
    const [itemsNotBought, setItemsNotBought] = useState([])

    useEffect (() => {
        let bought_items = []
        let non_bought_items = []

        if(JSON.parse(window.localStorage.getItem('old_cart')) === null 
            || JSON.parse(window.localStorage.getItem('old_cart')) === undefined){}
        else{
            bought_items = JSON.parse(window.localStorage.getItem('old_cart'))
        }
        if(JSON.parse(window.localStorage.getItem('cart_items')) === null 
            || JSON.parse(window.localStorage.getItem('cart_items')) === undefined){}
        else{
            non_bought_items = JSON.parse(window.localStorage.getItem('cart_items'))
        }
        
        let bItems = []
        bought_items.forEach(element => {
            if(!non_bought_items.includes(element)){
                bItems.push(element)
            }
        });

        setItemsBought(bItems)
        setItemsNotBought(non_bought_items)

    }, [])
    
  return (
    itemsBought === "" ?  <></>
    :
    <div>
        <Header></Header>
            <Body className='bg-dark'>
                {console.log(itemsBought)}
                {
                    itemsBought.map((element) => (
                        <div className="container mt-5 mb-5 border">
                            <br></br>
                            <div className="media-body text-light">
                            <h4 className="media-heading float-left">Product id: {element.id}</h4><br></br><br></br>
                            <h4 className="media-heading float-left">Product name: {element.title}</h4><br></br><br></br>
                            <h4 className="media-heading float-left">You have bought {element.quantity} many of this item</h4><br></br><br></br>
                            <h4 className="media-heading float-left">It costed {element.quantity * element.price} TL</h4><br></br><br></br>
                            <div className="d-flex justify-content-between align-items-center">
                            </div>
                            <br></br>
                            <br></br><br></br>
                            </div>
                        </div>
                    ))
                }
            </Body>
        <Footer></Footer>
    </div>
  )
}

export default Invoice
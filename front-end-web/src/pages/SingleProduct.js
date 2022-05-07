import React from 'react'
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductPageDetails from '../components/ProductPageDetails';

const Container = styled.div`
    text-align: center;
    padding-bottom: 50px;
    padding-top: 50px;
`;

const SingleProduct = () => {
    let {pid} = useParams();
    const [item, setItem] = useState()

    useEffect (() => {
        const getBooks = async () =>  {
          const itemsFromServer = await fetchBooks()
          let itemFromServer = itemsFromServer.filter(elem => elem.id === parseInt(pid))[0]
          setItem(itemFromServer)
          console.log(itemFromServer)
        }
        getBooks()
    }, [pid])

    
    const fetchBooks = async () => {
        const res = await fetch(`/all_books`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        const data = await res.json()
        return data
    }

  return (
      <div>
            <Header></Header>
            <Container className='bg-dark'>
                <ProductPageDetails item={item}></ProductPageDetails>
            </Container>
            <Footer></Footer>
    </div>
  )
}

export default SingleProduct;
import React from 'react'
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductPageDetails from '../components/ProductPageDetails';
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems';
import { getUserID } from '../helperFunctions/helperLogin';
import { fetchBooks } from '../helperFunctions/helperGetProducts';
import { addToWishList } from '../helperFunctions/helperWishList';

const Container = styled.div`
    text-align: center;
    padding-bottom: 50px;
    padding-top: 50px;
`;

const SingleProduct = () => {
    let {pid} = useParams();
    const [item, setItem] = useState()
    const [cartItemsChanged, setCartItemsChanged] = useState(false)
    const [comments, setComments] = useState([])

    useEffect (() => {
        const getAndSetVars = async () =>  {
          const itemsFromServer = await fetchBooks()
          let itemFromServer = itemsFromServer.filter(elem => elem.id === parseInt(pid))[0]
          setItem(itemFromServer)
          const comments = await fetchComments()
          let commentList = []
          for (var key of Object.keys(comments)) {
            commentList.push(comments[key])
          }
          setComments(commentList)
          console.log(commentList)
        }
        getAndSetVars()
    }, [pid])


    const fetchComments = async () => {
        const res = await fetch(`/get_all_approved_comments/submit`     , {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({Pid : pid})
        })
        const data = await res.json()
        return data
    }

    const onSendComment = (comment, stars) => {
        const sendCom = async () => {
            let serverAnswer = await sendComment(comment, stars)
            console.log(serverAnswer)
        }
        sendCom()
    }

    const sendComment = async (comment, stars) => {
        let email = getUserID()
        console.log(stars)
        const res = await fetch(`/Comment_all_/submit`     , {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({Pid : pid, email: email, text: comment, stars: parseInt(stars) })
        })
        const data = await res.json()
        return data
    }

    const AddToCart = (item) => {
        addNewItem(item)
        setCartItemsChanged(!cartItemsChanged)
      }
    
      const HeaderAddToCart = (item) => {
        add1Item(item)
        setCartItemsChanged(!cartItemsChanged)
      }
    
      const HeaderRemoveFromCart = (item) => {
        remove1Item(item)
        setCartItemsChanged(!cartItemsChanged)
      }

      const AddToWishList = async (item) => {
        const answer = await addToWishList(item.id)
      }

  return (
      <div>
            <Header itemsInCartChanged={cartItemsChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
            <Container className='bg-dark'>
                <ProductPageDetails item={item} reviews={comments} onAddToCart={AddToCart} onSendComment={onSendComment} onAddToWishList={AddToWishList}></ProductPageDetails>
            </Container>
            <Footer></Footer>
    </div>
  )
}

export default SingleProduct;
import React from 'react'
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductPageDetails from '../components/ProductPageDetails';
import { addNewItem, add1Item, remove1Item } from '../helperFunctions/helperCartItems';
import { checkLogInStatus, getUserID } from '../helperFunctions/helperLogin';
import { fetchBooks } from '../helperFunctions/helperGetProducts';
import { addToWishList, fetchWishList, removeFromWishList } from '../helperFunctions/helperWishList';

const Container = styled.div`
    text-align: center;
    padding-bottom: 50px;
    padding-top: 50px;
    min-height: 1000px;
`;

const SingleProduct = () => {
    let {pid} = useParams();
    const [item, setItem] = useState()
    const [cartItemsChanged, setCartItemsChanged] = useState(false)
    const [wishListChanged, setWishListChanged] = useState(false)
    const [comments, setComments] = useState([])
    const [wishListed, setWishListed] = useState([])
    const [loaded, setLoaded] = useState(false)

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
          if(checkLogInStatus()){
            const wishList = await fetchWishList()
            wishList.filter(elem => elem.Pid === itemFromServer.id).length !== 0 ? setWishListed(true) : setWishListed(false)
          }
          else{
            setWishListed(undefined)
          }
          setComments(commentList)
          setLoaded(true)
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
        window.scrollTo({top: 0, behavior: 'smooth'})
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
        await addToWishList(item.id)
        setWishListChanged(!wishListChanged)
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
    
      const RemoveFromWishList = async (item) => {
        await removeFromWishList(item.id)
        setWishListChanged(!wishListChanged)
        window.scrollTo({top: 0, behavior: 'smooth'})
      }

  return (
      <div>
            <Header itemsInCartChanged={cartItemsChanged} wishListChanged={wishListChanged} onAddToCart={HeaderAddToCart} onRemoveFromCart={HeaderRemoveFromCart}></Header>
            <Container className='bg-dark'>
            {
              !loaded ? 
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                </div>
            :
                <ProductPageDetails wishListed={wishListed} item={item} reviews={comments} onAddToCart={AddToCart} onSendComment={onSendComment} onAddToWishList={AddToWishList} onRemoveFromWishList={RemoveFromWishList}></ProductPageDetails>         
            }
            </Container>
            <Footer></Footer>
    </div>
  )
}

export default SingleProduct;
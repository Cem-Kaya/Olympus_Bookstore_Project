import { checkLogInStatus } from "./helperLogin"

export const getCartItems = () => {
    if(checkLogInStatus())
    {

    }
    else
    {
        if(JSON.parse(window.localStorage.getItem('cart_items')) === null){
            return []
        }
        else{
            return JSON.parse(window.localStorage.getItem('cart_items'))
        }
    }
}

export const addNewItem = (item) => {
    if(checkLogInStatus())
    {

    }
    else
    {
        let cartItems = getCartItems()
        let getItemAsList = cartItems.filter((elem) => elem.id === item.id)
        if(getItemAsList.length === 0)
        {
          item = {...item, quantity: 1}
          if(cartItems.length === 0){
            window.localStorage.setItem('cart_items', JSON.stringify([item]))
          }
          else{
            window.localStorage.setItem('cart_items', JSON.stringify([...cartItems, item]))
          }
        }
    }
}

export const add1Item = (item) => {
    if(checkLogInStatus())
    {

    }
    else
    {
        let cartItems = getCartItems()
        let getItemAsList = cartItems.filter((elem) => elem.id === item.id)
        if(getItemAsList.length === 0)
        {
          item = {...item, quantity: 1}
          if(cartItems.length === 0){
            window.localStorage.setItem('cart_items', JSON.stringify([item]))
          }
          else{
            window.localStorage.setItem('cart_items', JSON.stringify([...cartItems, item]))
          }
        } 
        else
        {
            let filteredItems = cartItems.map(
              (elem) => elem.id === item.id ? { ...elem, quantity: elem.quantity + 1} : elem
            )
            window.localStorage.setItem('cart_items', JSON.stringify([...filteredItems]))
        }
    }
}

export const remove1Item = (item) => {
    if(checkLogInStatus())
    {

    }
    else
    {
        let cartItems = getCartItems()
        let listOfItem = cartItems.filter((elem) => elem.id === item.id)
        let quantity = listOfItem[0].quantity
    
        if(quantity <= 0){
            let filteredState = cartItems.filter((elem) => elem.id !== item.id)
            filteredState.length === 0 ? 
              window.localStorage.setItem('cart_items', JSON.stringify([])) 
              : window.localStorage.setItem('cart_items', JSON.stringify([...filteredState]))
        }
        else if(quantity !== 1){
            let removedList = cartItems.map(
              (elem) => elem.id === item.id ? { ...elem, quantity: elem.quantity - 1} : elem
            )
            window.localStorage.setItem('cart_items', JSON.stringify(removedList)) 
        }
        else
        {
          let filteredState = cartItems.filter((elem) => elem.id !== item.id)
          filteredState.length === 0 ? 
            window.localStorage.setItem('cart_items', JSON.stringify([])) 
            : window.localStorage.setItem('cart_items', JSON.stringify([...filteredState]))
        }
    }
}

export const removeAllItem = (item) => {
    if(checkLogInStatus())
    {

    }
    else
    {
        let cartItems = getCartItems()
        let filteredState = cartItems.filter((elem) => elem.id !== item.id)
        filteredState.length === 0 ? 
            window.localStorage.setItem('cart_items', JSON.stringify([])) 
            : window.localStorage.setItem('cart_items', JSON.stringify([...filteredState])) 
    }
}

export const emptyCart = () => {
    if(checkLogInStatus())
    {

    }
    else
    {
        window.localStorage.setItem('cart_items', JSON.stringify([])) 
    }
}
import { checkLogInStatus, getUserID } from "./helperLogin"
import { fetchBooks } from "./helperGetProducts"

const AddNItemToCart = async (email, item, n) =>  {
  const serverAnswer = await tryAddNItem(email, item, n)
  console.log("Server answer: " , serverAnswer)
}

const tryAddNItem = async ( email, item, n ) => {    
  try{
    const res = await fetch('/Shopping_Cart/submit', {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify({Pid : item.id, email: email, quantity: n})
    })
    const data = await res.json()
    return data
  }
  catch(e){
    console.log(e)
  }
}

export const synchronizeWithDb = async () => {
  let email = getUserID()
        
  const GetAndSetCart = async (email) =>  {
    
    let cartItems = getCartItems()
    for(var i = 0; i < cartItems.length; i++){
      await AddNItemToCart(email, cartItems[i], cartItems[i].quantity)
    }

    const serverAnswer = await tryGetCart(email)
    console.log("Server answer: " , serverAnswer)

    if(Object.keys(serverAnswer).length === 0){
      console.log("empty")
    }
    else{
      let itemArray = []
      for (var key of Object.keys(serverAnswer)) {
        itemArray.push(serverAnswer[key])
      }
      let books
      const getProducts = async () => {
        let products = await fetchBooks()
        books = products
      }
      await getProducts()
      console.log(books)

      let items = []
      itemArray.forEach(element => {
        let ix
        books.forEach(function (elem, index) {
          if(elem.id === element.Pid){
            ix = index
          }
        });
        let item = {...books[ix], quantity: element.quantity}
        items.push(item)
      });
      console.log(items)

      window.localStorage.setItem('cart_items', JSON.stringify(items))
    }
  }
  const tryGetCart = async ( email ) => {    
      try{
          const res = await fetch('/get_shoping/submit', {
          method: "POST",
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify({uid : email})
        })
        const data = await res.json()
        return data
      }
      catch(e){
        console.log(e)
      }
  }
  GetAndSetCart(email)
}

export const getCartItems = () => {
    console.log(JSON.parse(window.localStorage.getItem('cart_items')))
    if(JSON.parse(window.localStorage.getItem('cart_items')) === null){
        return []
    }
    else{
        return JSON.parse(window.localStorage.getItem('cart_items'))
    }

}

export const addNewItem = (item) => {
  if(item.in_stock > 0)
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
    if(checkLogInStatus())
    {
      let email = getUserID()
      AddNItemToCart(email, item, 1)
    }

    return true
  }
  else{
    return false
  }
}

export const add1Item = (item) => {

  let cartItems = getCartItems()
  let getItemAsList = cartItems.filter((elem) => elem.id === item.id)

  if(getItemAsList.length === 0)
  {
    if(item.in_stock > 0)
    {
      item = {...item, quantity: 1}
      if(cartItems.length === 0){
        window.localStorage.setItem('cart_items', JSON.stringify([item]))
      }
      else{
        window.localStorage.setItem('cart_items', JSON.stringify([...cartItems, item]))
      }
    }
    else{
      return false
    }
  } 
  else
  {
    console.log(getItemAsList[0].quantity)

    let filteredItems = cartItems.map(
      (elem) => elem.id === item.id ? { ...elem, quantity: elem.quantity + 1} : elem
    )
    window.localStorage.setItem('cart_items', JSON.stringify([...filteredItems]))
  }

  if(checkLogInStatus())
  {
    const email = getUserID()
    AddNItemToCart(email, item, 1)
  }
      
  return true
}


export const remove1Item = (item) => {
  let cartItems = getCartItems()
  let listOfItem = cartItems.filter((elem) => elem.id === item.id)
  let quantityOfTheItem = listOfItem[0].quantity

  if(quantityOfTheItem <= 0){
      let filteredState = cartItems.filter((elem) => elem.id !== item.id)
      filteredState.length === 0 ? 
        window.localStorage.setItem('cart_items', JSON.stringify([])) 
        : window.localStorage.setItem('cart_items', JSON.stringify([...filteredState]))
  }
  else if(quantityOfTheItem !== 1){
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

  if(checkLogInStatus() && quantityOfTheItem > 0)
  {
      const email = getUserID()
      
      const RemoveItemFromCart = async (email, item) =>  {
          const serverAnswer = await tryRemoveItem(email, item)
          console.log("Server answer: " , serverAnswer)
          if(serverAnswer === undefined){
            console.log(serverAnswer)
          }
      }
      const tryRemoveItem = async ( email, item ) => {    
          try{
            const res = await fetch('/remove_from_cart/submit', {
              method: "POST",
              headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
                },
                body: JSON.stringify({Pid : item.id, email: email, quantity: quantityOfTheItem - 1})
            })
            const data = await res.json()
            return data
          }
          catch(e){
            console.log(e)
          }
      }
      RemoveItemFromCart(email, item)
  }
    return true
}

export const removeAllItem = (item) => {
 
  let cartItems = getCartItems()
  let filteredState = cartItems.filter((elem) => elem.id !== item.id)
  filteredState.length === 0 ? 
      window.localStorage.setItem('cart_items', JSON.stringify([])) 
      : window.localStorage.setItem('cart_items', JSON.stringify([...filteredState])) 
  
  if(checkLogInStatus())
  {
      const email = getUserID()
      
      const RemoveAllFromCart = async (email, item) =>  {
          const serverAnswer = await tryRemoveAllItem(email, item)
          console.log("Server answer: " , serverAnswer)
          if(serverAnswer === undefined){
            console.log(serverAnswer)
          }
      }
      const tryRemoveAllItem = async ( email, item ) => {    
          try{
            const res = await fetch('/remove_from_cart/submit', {
              method: "POST",
              headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
                },
                body: JSON.stringify({Pid : item.id, email: email, quantity: 0 })
            })
            const data = await res.json()
            return data
          }
          catch(e){
            console.log(e)
          }
      }
      RemoveAllFromCart(email, item)
  }
    return true
}

export const emptyCart = () => {
  
  let cartItems = getCartItems()
  window.localStorage.setItem('cart_items', JSON.stringify([])) 

  if(checkLogInStatus())
  {
    const email = getUserID()

    const RemoveAllFromCart = async (email, item) =>  {
      const serverAnswer = await tryRemoveAllItem(email, item)
      console.log("Server answer: " , serverAnswer)
      if(serverAnswer === undefined){
        console.log(serverAnswer)
      }
    }
    const tryRemoveAllItem = async ( email, item ) => {    
        try{
          const res = await fetch('/remove_from_cart/submit', {
            method: "POST",
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
              },
              body: JSON.stringify({Pid : item.id, email: email, quantity: 0 })
          })
          const data = await res.json()
          return data
        }
        catch(e){
          console.log(e)
        }
    }

    for(var i = 0; i < cartItems.length; i++){
      console.log(cartItems[i])
      RemoveAllFromCart(email, cartItems[i])
    }
  }

  return true
}
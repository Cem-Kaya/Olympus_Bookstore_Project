import { checkLogInStatus, getUserID } from "./helperLogin"
//checkLogInStatus()
export const getCartItems = () => {
    if(false)
    {
        const email = getUserID()
        
        const GetAndSetCart = async (email) =>  {
            const serverAnswer = await tryGetCart(email)
            console.log("Server answer: " , serverAnswer)
        }
        const tryGetCart = async ( email ) => {    
            try{
                console.log(JSON.stringify({"uid" : email}))
              const res = await fetch('/get_shoping/submit', {
                method: "POST",
                headers: {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify({"uid" : email})
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
    
    if(JSON.parse(window.localStorage.getItem('cart_items')) === null){
        return []
    }
    else{
        return JSON.parse(window.localStorage.getItem('cart_items'))
    }

}

export const addNewItem = async (item) => {
    if(false)
    {
        const email = getUserID()
        
        const AddNewItemToCart = async (email, item) =>  {
            const serverAnswer = await tryAddNewItem(email, item)
            console.log("Server answer: " , serverAnswer)
            if(serverAnswer === undefined){
                window.localStorage.setItem('cart_items', JSON.stringify([]))
            }
        }
        const tryAddNewItem = async ( email, item ) => {    
            try{
              const res = await fetch('/Shopping_Cart/submit', {
                method: "POST",
                headers: {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify({"Pid" : item.id, "email": email, "quantity": 1})
              })
              const data = await res.json()
              return data
            }
            catch(e){
              console.log(e)
            }
        }
        await AddNewItemToCart(email, item)
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
    return
}

export const add1Item = async (item) => {
    if(false)
    {
        const email = getUserID()
        
        const AddItemToCart = async (email, item) =>  {
            const serverAnswer = await tryAddItem(email, item)
            console.log("Server answer: " , serverAnswer)
            if(serverAnswer === undefined){
                window.localStorage.setItem('cart_items', JSON.stringify([]))
            }
        }
        const tryAddItem = async ( email, item ) => {    
            try{
              const res = await fetch('/Shopping_Cart/submit', {
                method: "POST",
                headers: {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify({"Pid" : item.id, "email": email, "quantity": item.quantity + 1})
              })
              const data = await res.json()
              return data
            }
            catch(e){
              console.log(e)
            }
        }
        await AddItemToCart(email, item)
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
    return
}

export const remove1Item = async (item) => {
    if(false)
    {
        const email = getUserID()
        
        const RemoveItemFromCart = async (email, item) =>  {
            const serverAnswer = await tryRemoveItem(email, item)
            console.log("Server answer: " , serverAnswer)
            if(serverAnswer === undefined){
                window.localStorage.setItem('cart_items', JSON.stringify([]))
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
                  body: JSON.stringify({"Pid" : item.id, "email": email, "quantity": item.quantity - 1})
              })
              const data = await res.json()
              return data
            }
            catch(e){
              console.log(e)
            }
        }
        await RemoveItemFromCart(email, item)
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
    return
}

export const removeAllItem = async (item) => {
    if(false)
    {
        const email = getUserID()
        
        const RemoveAllFromCart = async (email, item) =>  {
            const serverAnswer = await tryRemoveAllItem(email, item)
            console.log("Server answer: " , serverAnswer)
            if(serverAnswer === undefined){
                window.localStorage.setItem('cart_items', JSON.stringify([]))
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
                  body: JSON.stringify({"Pid" : item.id, "email": email, "quantity": 0})
              })
              const data = await res.json()
              return data
            }
            catch(e){
              console.log(e)
            }
        }
        await RemoveAllFromCart(email, item)
    }
    else
    {
        let cartItems = getCartItems()
        let filteredState = cartItems.filter((elem) => elem.id !== item.id)
        filteredState.length === 0 ? 
            window.localStorage.setItem('cart_items', JSON.stringify([])) 
            : window.localStorage.setItem('cart_items', JSON.stringify([...filteredState])) 
    }
    return
}

export const emptyCart = async () => {
    if(false)
    {

    }
    else
    {
        window.localStorage.setItem('cart_items', JSON.stringify([])) 
    }
    return
}
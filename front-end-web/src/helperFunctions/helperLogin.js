export const logIn = async (email, passHash) => {
    try{
        console.log(email)
        const res = await fetch('/login/submit', {
          method: "POST",
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
          body: JSON.stringify({email: email, pass_hash: passHash})
        })
        const data = await res.json()
        window.localStorage.setItem('logged_in', JSON.stringify(data["status"]))
        window.localStorage.setItem('user_id', JSON.stringify(data["uid"]))
        console.log(data)

        return data
    }
    catch(e){
        throw e
    }
}

export const signUp = async (username, email, passHash, homeAddress) =>  {
    try{
        const res = await fetch(`/signup/submit`, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            name: username,
            email: email,
            pass_hash: passHash,
            homeadress: homeAddress
          }),
        })
        const data = await res.json()
        window.localStorage.setItem('logged_in', JSON.stringify(data["status"]))
        window.localStorage.setItem('user_id', JSON.stringify(data["uid"]))
        console.log(data)

        return data
    }
    catch(e){
        throw e
    }
}

export const checkLogInStatus = () => {
    if(JSON.parse(window.localStorage.getItem('logged_in')) !== null && 
        JSON.parse(window.localStorage.getItem('logged_in')) === true){
      return true
    }
    return false
}

export const logOut = () => {
    window.localStorage.setItem('logged_in', JSON.stringify(false))
    window.localStorage.setItem('user_id', JSON.stringify(""))
}

export const getUserID = () => {
    return JSON.parse(window.localStorage.getItem('user_id'))
}

export const checkStoreLogInStatus = () => {
  if(JSON.parse(window.localStorage.getItem('store_logged_in')) !== null && 
      JSON.parse(window.localStorage.getItem('store_logged_in')) === true){
    return true
  }
  return false
}

export const getStoreManagerID = () => {
  return JSON.parse(window.localStorage.getItem('store_manager_id'))
}

export const checkProductManagerLogInStatus = () => {
  if(JSON.parse(window.localStorage.getItem('pm_logged_in')) !== null && 
      JSON.parse(window.localStorage.getItem('pm_logged_in')) === true){
    return true
  }
  return false
}

export const getProductManagerID = () => {
  return JSON.parse(window.localStorage.getItem('pm_manager_id'))
}

export const storeLogIn = async (name, passHash) => {
  try{
      console.log(name)
      const res = await fetch('/login_salesmanager/submit', {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
          },
        body: JSON.stringify({name: name, pass_hash: passHash})
      })
      const data = await res.json()
      window.localStorage.setItem('store_logged_in', JSON.stringify(data["status"]))
      window.localStorage.setItem('store_manager_id', JSON.stringify(data["Sid"] === false ? null : data["Sid"]))
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}

export const storeSignUp = async (username, passHash) =>  {
  try{
      const res = await fetch(`Sales_manager_reg/submit`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          name: username,
          pass_hash: passHash,
        }),
      })
      const data = await res.json()
      window.localStorage.setItem('store_logged_in', JSON.stringify(data["status"]))
      window.localStorage.setItem('store_manager_id', JSON.stringify(data["Sid"]))
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}

export const productManLogIn = async (username, passHash) => {
  try{
      console.log(username)
      const res = await fetch('/login_productmanager/submit', {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
          },
        body: JSON.stringify({name: username, pass_hash: passHash})
      })
      const data = await res.json()
      window.localStorage.setItem('pm_logged_in', JSON.stringify(data["status"]))
      window.localStorage.setItem('pm_manager_id', JSON.stringify(data["Pmid"] === false ? null : data["Pmid"]))
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}

export const productManSignUp = async (username, passHash) =>  {
  try{
      const res = await fetch(`/Product_manager_reg/submit`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          name: username,
          pass_hash: passHash,
        }),
      })
      const data = await res.json()
      window.localStorage.setItem('pm_logged_in', JSON.stringify(data["status"]))
      window.localStorage.setItem('pm_manager_id', JSON.stringify(data["Pmid"]))
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}
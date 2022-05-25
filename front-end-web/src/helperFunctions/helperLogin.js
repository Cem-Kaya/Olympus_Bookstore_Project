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

export const storeLogIn = async (email, passHash) => {
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
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}

export const storeSignUp = async (username, email, passHash, homeAddress) =>  {
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
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}

export const productManLogIn = async (email, passHash) => {
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
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}

export const productManSignUp = async (username, email, passHash, homeAddress) =>  {
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
      console.log(data)

      return data
  }
  catch(e){
      throw e
  }
}
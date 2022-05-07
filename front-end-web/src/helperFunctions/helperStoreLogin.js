
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
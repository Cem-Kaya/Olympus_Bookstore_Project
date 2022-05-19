import { getUserID } from "./helperLogin"

export const fetchWishList = async () => {
    const res = await fetch(`/Wishes_get_email/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST" ,
        body: JSON.stringify({email: getUserID()})
      }
        )
    const data = await res.json()
    return data
}

export const addToWishList = async ( pid ) => {
    const res = await fetch(`/Wishes/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST" ,
        body: JSON.stringify({Pid: pid, email: getUserID() })
      }
        )
    const data = await res.json()
    return data
}


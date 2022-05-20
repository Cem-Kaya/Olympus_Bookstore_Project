export const fetchCategories = async () => {
    const res = await fetch(`/all_category`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }}
     )
    const data = await res.json()

    console.log(data)
    return data
  }
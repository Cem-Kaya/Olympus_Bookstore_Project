import { getProductManagerID } from "./helperLogin"

  export const addNewCategory = async (categoryString) => {
    try
    {
      const res = await fetch(`/Product_Catogary_reg/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({name: categoryString})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

  export const fetchSalesManagers = async () => {
    const res = await fetch(`/all_salesmanagers`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }}
        )
    const data = await res.json()
    return data
  }
  
  export const fetchDeliveryList = async () => {
    const res = await fetch(`/pmid_deliverylist/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Pmid: getProductManagerID()})
        }
        )
    const data = await res.json()
    return data
}

export const fetchProductIds = async () => {
  const res = await fetch(`/products_pmid/submit`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({Pmid: getProductManagerID()})
      }
      )
  const data = await res.json()
  return data
}

export const updateProductStock = async (item, amount) => {
  let sale = 1 - (parseFloat(item["discount"]) / 100)
  console.log(sale)
  const res = await fetch(`/update_book/submit`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({Pid: item["id"], name: item["title"], description: item["description"],
                  quantity: amount, amount_sold: item["amount_sold"], price: item["price"], sale: sale})
      }
      )
  const data = await res.json()
  return data
}

export const fetchComments = async () => {
    const res = await fetch(`/get_comments_for_approval/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Pmid: getProductManagerID()})
        }
        )
    const data = await res.json()
    return data
  }

  export const fetchDeletedProducts = async () => {
    const res = await fetch(`/deleted_products_pmid/submit`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },          
      method: "POST",
      body: JSON.stringify({Pmid: getProductManagerID()})
      }
    )
    const data = await res.json()
    return data
  }

  export const updateDelivery = async (pid, purcid, newStatus) => {
    try
    {
      const res = await fetch(`/delivery_process/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Process: newStatus, Pmid: getProductManagerID(), Pid: pid, purcid: purcid})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

  export const commentApproval = async (cid, approved) => {
    try
    {
      const res = await fetch(`/Approval/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pmid: getProductManagerID(), cid: cid, approved: approved})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

  export const deleteProduct = async (item) => {
    try
    {
      const res = await fetch(`/delete_product/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pid: item.id})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }

  export const undeleteProduct = async (item) => {
    try
    {
      const res = await fetch(`/undelete_product/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({Pid: item.id})
          }
          )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not add new category")
    }
  }


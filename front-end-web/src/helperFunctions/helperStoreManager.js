import { getStoreManagerID } from "./helperLogin"

export const refundApproval = async (id, newStatus) => {
    try
    {
      const res = await fetch(`/refunds_update/submit`     , {headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({id: id, status: newStatus})
          }
        )
      const data = await res.json()
      return data
    }
    catch{
      console.log("could not change refund status")
    }
  }

  export const fetchProductIds = async () => {
    const res = await fetch(`/products_sid/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Sid: getStoreManagerID()})
        }
        )
    const data = await res.json()
    return data
  }

  export const fetchRefundRequests = async () => {
    const res = await fetch(`/refunds_get_sid/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Sid: getStoreManagerID()})
        }
        )
    const data = await res.json()
    return data
  }

  export const updateProductPrice = async (item, sale, price) => {

    const res = await fetch(`/update_book/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Pid: item["id"], name: item["title"], description: item["description"],
                    quantity: item["in_stock"], amount_sold: item["amount_sold"], price: price, sale: sale})
        }
        )
    const data = await res.json()
    return data
}

export const fetchInvoices = async () => {
  const res = await fetch(`/sid_deliverylist/submit`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({Sid: getStoreManagerID()})
      }
      )
  const data = await res.json()
  return data
}

export const fetchInvoicesFromDateRange = async (startDate, endDate) => {
  const res = await fetch(`/sid_deliverylist_date/submit`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({Sid: getStoreManagerID(), start_date: startDate, end_date: endDate})
      }
      )
  const data = await res.json()
  return data
}

export const downloadInvoicesFromDateRange = async (startDate, endDate) => {
  const res = await fetch(`/sid_deliverylist_date_pdf/submit`     , {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({Sid: getStoreManagerID(), start_date: startDate, end_date: endDate})
      }
      )
  return res
}
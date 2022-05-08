
export const fetchBooks = async () => {
        const res = await fetch(`/all_books`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        const data = await res.json()
        return data
}

export const fetchBooksFromCategory = async (categoryId) => {
    const res = await fetch(`/all_books_category_ranged/submit`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({Pcid: categoryId, min: 0, max: 1000})
        }
        )
    const data = await res.json()
    return data
}
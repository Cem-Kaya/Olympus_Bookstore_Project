
export const fetchBooks = async () => {
        const res = await fetch(`/all_books`     , {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }}
            )
        const data = await res.json()
        return data
}
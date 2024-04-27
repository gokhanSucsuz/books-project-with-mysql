import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export const Books = () => {
    const [books, setBooks] = useState([])


    const fetchAllBooks = async () => {
        try {
            const res = await axios.get("http://localhost:8080/books")
            setBooks(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/books/${id}`)
            fetchAllBooks()
        } catch (error) {
            if (error) console.log(error)
        }
    }


    return (
        <div>
            <h1>Book Store</h1>
            <div className="bookList">
                {books.map(book =>
                    <div key={book.id} className="books">
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <p>{book.price}</p>
                        <button onClick={() => handleDelete(book.id)} className="delete">Delete</button>
                        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>)
                }
            </div >
            <button><Link to="/add">Add New Book</Link></button>
        </div >
    )
}

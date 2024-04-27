import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddBook = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/books", book)
            navigate("/")
        } catch (error) {
            if (error) console.log(error)
        }

    }
    console.log(book)
    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" onChange={handleChange} name="title" id="title" placeholder="title" />
            <input type="text" onChange={handleChange} name="desc" id="desc" placeholder="desc" />
            <input type="text" onChange={handleChange} name="cover" id="cover" placeholder="cover" />
            <input type="number" onChange={handleChange} name="price" id="price" placeholder="price" />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

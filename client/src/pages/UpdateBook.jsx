import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const UpdateBook = () => {
  const [book, setBook] = useState()
  const [values, setValues] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2]

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/books/${bookId}`)
      setValues(res.data[0])
      console.log(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  const handleChange = (e) => {

    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8080/books/${bookId}`, book)
      navigate("/")
    } catch (error) {
      if (error) console.log(error)
    }

  }
  return (
    <div>
      <h1>Update Book</h1>
      <div className="form">
        <input type="text" onChange={handleChange} name="title" id="title" placeholder={values?.title} />
        <input type="text" onChange={handleChange} name="desc" id="desc" placeholder={values?.desc} />
        <input type="text" onChange={handleChange} name="cover" id="cover" placeholder={values?.cover} />
        <input type="number" onChange={handleChange} name="price" id="price" placeholder={values?.price} />
        <button onClick={handleClick}>Update</button>
      </div>
    </div>

  )
}

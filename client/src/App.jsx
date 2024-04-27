import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Books } from './pages/Books'
import { AddBook } from './pages/AddBook'
import { UpdateBook } from './pages/UpdateBook'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/add' element={<AddBook />} />
        <Route path='/update/:id' element={<UpdateBook />} />
      </Routes>


    </div>
  )
}

export default App


import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Text from './Pages/Text'
import { useState } from 'react'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/text/:id' element={<Text />} />
      </Routes>
    </>
  )
}

export default App
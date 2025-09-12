import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import CardQuote from './CardQuote'
import NewQuote from './NewQuote'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CardQuote />} />
        <Route path="/new-quote" element={<NewQuote />} />
      </Routes>
    </Router>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import CardQuote from './CardQuote'
import NewQuote from './NewQuote'
import EditQuote from './EditQuote'
//import ViewSingleQuote from './ViewSingleQuote'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CardQuote />} />
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="/edit-quote/:id" element={<EditQuote />} />
        {/* <Route path="/view-single-quote/:id" element={<ViewSingleQuote />} /> */}
      </Routes>
    </Router>
  )
}

export default App
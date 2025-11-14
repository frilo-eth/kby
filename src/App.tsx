import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ComponentPage from './pages/components/ComponentPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components/:id" element={<ComponentPage />} />
    </Routes>
  )
}

export default App

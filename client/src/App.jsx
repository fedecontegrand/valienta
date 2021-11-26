import './App.css'
import { Route, Routes } from 'react-router'
import LandingPage from './views/LandingPage'
import Home from './views/Home'
import Episodes from './views/Episodes'
import Locations from './views/Locations'

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/> 
      <Route path="/home" element={<Home/>}/>
    </Routes>
  )
}

export default App

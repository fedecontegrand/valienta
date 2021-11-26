import './App.css'
import { Route, Routes } from 'react-router'
import LandingPage from './views/LandingPage'
import Home from './views/Home'
import Characters from './views/Characters'
import Episodes from './views/Episodes'
import Locations from './views/Locations'

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home children={<Characters/>}/>}/>
      <Route path="/episodes" element={<Home children={<Episodes/>}/>}/>
      <Route path="/locations" element={<Home children={<Locations/>}/>}/>
    </Routes>
  )
}

export default App

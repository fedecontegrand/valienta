import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from '../components/Navbar'
import styles from "../styles/Home.scss"
import Characters from './Characters'
import Episodes from './Episodes'
import Locations from './Locations'

export default function Home() {

    const [page,setPage]=useState(1)
    const [characters,setCharacters]=useState([])

    useEffect(()=>{

    },[])

    
    return (
        <div className="containerHome">
            <Navbar />
            <Routes>
                <Route path="/" element={<Characters/>} /> 
                <Route exact path="/episodes" element={<Episodes/>}/>
                <Route exact path="/locations" element={<Locations/>}/>
            </Routes>
            
        </div>
    )
}

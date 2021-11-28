import React, { Children, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from "../styles/Home.scss"
import Characters from './Characters'
import Episodes from './Episodes'
import Locations from './Locations'

export default function Home({children}) {

    const location=useLocation()   
    return (
        <>
        <Navbar />
        <div className="containerHome">
            {children}
        </div>
        </>
    )
}

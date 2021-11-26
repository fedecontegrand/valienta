import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "../styles/Navbar.scss"

export default function Navbar() {
    return (
        <nav>
            <NavLink to="/home" activeClassName="active">Home</NavLink>
            <NavLink to="/episodes" activeClassName="active">Episodes</NavLink>
            <NavLink to="/locations" activeClassName="active">Locations</NavLink>
        </nav>
    )
}

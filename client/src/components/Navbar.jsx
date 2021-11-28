import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "../styles/Navbar.scss"
import logo from "../../../LogoRick&Morty.svg"

export default function Navbar() {
    return (
        <nav>
            <div>
                <img src={logo} alt="logo"/>
            </div>
            <div className="linksDiv">
            <NavLink to="/home" activeClassName="active">Home</NavLink>
            <NavLink to="/episodes" activeClassName="active">Episodes</NavLink>
            <NavLink to="/locations" activeClassName="active">Locations</NavLink>
            </div>
        </nav>
    )
}

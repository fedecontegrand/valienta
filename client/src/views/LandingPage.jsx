import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import styles from "../styles/LandingPage.scss"

export default function LandingPage() {
    const navigate=useNavigate()
    return (
        <div className="container">
            <div className="banner">
               <h2 className="landingTitle">Hey Dani 👋</h2>
               <p  className="landingText">With this app Im going to change your mind. Here you will be able to search all the great and
                   funny characters of the amazing Rick & Morty show.
                </p> 
                <ul>
                    <li> <p className="landingText">Search by location, episode, or see them all.</p></li>
                    <li><p className="landingText">Filter according gender, name, status, episodes, dimension and more.</p></li>
                    <li><p className="landingText">Dont worry about your internet speed, once you see the characters, they are stored
                    on your browser.</p></li>
                </ul>  
               <button onClick={()=>navigate("/home")}>Enter</button>
            </div>            
        </div>
    )
}

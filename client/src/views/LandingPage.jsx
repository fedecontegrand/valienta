import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import styles from "../styles/LandingPage.scss"

export default function LandingPage() {
    const navigate=useNavigate()
    return (
        <div className="container">
            <div className="banner">
               <h2>Hey Dani 👋</h2>
               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore quam excepturi reprehenderit odit perferendis est nostrum ullam! Voluptatem suscipit corrupti amet nesciunt quisquam, delectus, laudantium error deserunt id nisi corporis.</p> 
               <button onClick={()=>navigate("/home")}>Enter</button>
            </div>            
        </div>
    )
}

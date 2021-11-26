import React from 'react'
import styles from "../styles/CharacterCard.scss"

export default function CharacterCard({name,status,species,gender,image}) {
    return (
        <div className="card">
            <img src={image} alt="chimg"/>
            <span className="name">{name}</span>
            <div className="tags">
            <span>{status}</span>
            <span>{gender}</span>
            <span>{species}</span>
            </div>
        </div>
    )
}

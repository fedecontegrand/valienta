import React from 'react'
import styles from "../styles/CharacterCard.scss"

export default function CharacterCard({name,status,species,gender,image}) {
    return (
        <div className="card">
            <img src={image} alt="chimg"/>
            <span>{name}</span>
            <span>Status: {status}</span>
            <span>Gender: {gender}</span>
            <span>Species: {species}</span>
        </div>
    )
}

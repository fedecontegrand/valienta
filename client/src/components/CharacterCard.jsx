import React, { useEffect } from 'react'
import styles from "../styles/CharacterCard.scss"

export default function CharacterCard({name,status,species,gender,image,origin,location}) {

    return (
        <div className="card">
            <img src={image} alt="chimg"/>
            <span className="name">{name}</span>
            <div className="tags">
            <span><div className={status}/>{status}</span>
            <span><div className={gender}/>{gender}</span>
            <span>{species}</span>
            </div>
        </div>
    )
}

import React from 'react'
import styles from "../styles/EpisodeBanner.scss"

export default function Banner({title,subtitle1,subtitle2,handleClick,id,handleClose,active}) {
    return (
        <div className="bannerDiv">
        <h4>{title}</h4>
        <span>{subtitle1}</span>
        <span>{subtitle2}</span>
        {active==id ? <button onClick={handleClose}>x</button> :
        <button name={id} onClick={handleClick}>See characters</button>}
        </div>
    )
}

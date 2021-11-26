import React from 'react'
import styles from "../styles/Footer.scss"

export default function Footer({handlePageChange,page}) {
    const reactToClick=(e)=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
      handlePageChange(e)
    }
    return (
        <div className="footerDiv">
            <button onClick={reactToClick} name="prev" disabled={page===1}>Anterior</button>
            <button onClick={reactToClick} name="next">Siguiente</button>
        </div>
    )
}

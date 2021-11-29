import React from 'react'
import styles from "../styles/Footer.scss"

export default function Footer({handlePageChange,page,limitPage}) {
    const reactToClick=(e)=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
      handlePageChange(e)
    }
    return (
        <div className="footerDiv">
            <button onClick={reactToClick} name="prev" disabled={page===1}>Anterior</button>
            <span>{page}</span>
            <button onClick={reactToClick} name="next" disabled={limitPage==page}>Siguiente</button>
        </div>
    )
}

import React from 'react'
import styles from "../styles/Filters.scss"

export default function Filters({type,filters,handleChange}) {
   
    if(type==="characters"){
        return (
            <div className="filterContainer">
            <div className="filterDiv">
                <div className="filter">
                <label>Gender:</label>
                <select defaultValue={filters.gender} name="gender"  onChange={handleChange}>
                    <option value="any" >Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>
                <div className="filter">
                <label>Name:</label>
                <input type="text" defaultValue={filters.name !=="any" ? filters.name :""} name="name" onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="filter">
                <label>Status:</label>
                <select defaultValue={filters.status} name="status" onChange={handleChange}>
                    <option value="any">Any</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                </div>
            </div>
            </div>
        )
    }
}

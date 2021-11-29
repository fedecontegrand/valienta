import React from 'react'
import styles from "../styles/Filters.scss"

export default function Filters({type,filters,handleChange}) {
   

        return (
            <div className="filterContainer">

            {type==="characters" ? (

             <div className="filterDiv">
                <div className="filter">
                <label>Gender:</label>
                <select defaultValue={filters.gender} name="gender"  onChange={handleChange}>
                    <option value="any" >Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unkwnown</option>
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

            ):type==="episodes" ? (
                <div className="filterDiv">
                    <div className="filter">
                        <label>Episode (1-51):</label>
                        <input type="number"  min={1} max={51} name="episode" onChange={handleChange} />
                    </div>
                    <div className="filter">
                        <label>Episode's name:</label>
                        <input type="text" name="name" placeholder="Search here your episode.." onChange={handleChange}></input>
                    </div>
                </div>

            ):(
                <div className="filterDiv">
                 <div className="filter">
                     <label>Name:</label>
                     <input type="text" name="name"  onChange={handleChange}/>
                 </div>
                 <div className="filter">
                     <label>Type:</label>
                     <input type="text" name="type" onChange={handleChange} />
                 </div>
                 <div className="filter">
                     <label>Dimension:</label>
                     <input type="text" name="dimension"  onChange={handleChange}/>
                 </div>
                </div>
            )}
            </div>
        )
}

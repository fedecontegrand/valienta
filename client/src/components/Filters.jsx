import React from 'react'

export default function Filters({type,filters,setFilters}) {

    const handleChange=e=>{
        setFilters({
            ...filters,
            [e.target.name]:e.target.value
        })
    }

    
    if(type==="characters"){
        return (
            <div>
                <>
                <label>Gender:</label>
                <select value={filters.gender} name="gender"  onSelect={handleChange}>
                    <option value="any" >Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </>
                <>
                <label>Name:</label>
                <input type="text" value={filters.name !=="any" ? filters.name :""} name="name" onChange={handleChange}/>
                </>
                <>
                <label>Status:</label>
                <select value={filters.status} name="status" onSelect={handleChange}>
                    <option value="any">Any</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                </>
            </div>
        )
    }
}

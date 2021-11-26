import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import {useDispatch,useSelector} from "react-redux"
import { closeCharactersofLocation, getAllLocations, getCharactersOfLocation } from '../redux/actions'
import CharacterCard from '../components/CharacterCard'

export default function Locations() {

    const [filters,setFilters]=useState({
        name:"any",
        type:"any",
        dimension:"any"
    })

    const [active,setActive]=useState(undefined)

    const [page,setPage]=useState(1)

    const allLocations=useSelector(state=>state.allLocations)

    const locationCharacters=useSelector(state=>state.locationCharacters)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAllLocations(page,filters))
    },[filters,page])

    const handleChange=e=>{
        setFilters(filters=>({
            ...filters,
            [e.target.name]:e.target.value
        }))
    }

    const handleClick=e=>{
        dispatch(closeCharactersofLocation())
        setActive(e.target.name)
        dispatch(getCharactersOfLocation(e.target.name))
    }

    const handleClose=e=>{
        setActive(undefined)
        dispatch(closeCharactersofLocation())
    }

    return (
        <>
        <Filters handleChange={handleChange} filters={filters} type="locations"/>
        {allLocations.map(loc=>
        <>
            <h4>{loc.name}</h4>
            <span>{loc.type}</span>
            <span>{loc.dimension}</span>
            <button onClick={handleClick} name={loc.id}>Ver personajes</button>
            {active ==loc.id ? (
                <>
                <button onClick={handleClose}>x</button>
                <div className="cardsDiv">
                {locationCharacters.length ? (
                    locationCharacters.map(char=>
                        <CharacterCard 
                        key={char.id}
                        name={char.name}
                        status={char.status}
                        species={char.species}
                        gender={char.gender}
                        image={char.image}
                        />
                        )
                    ):<span>Cargando...</span>}
                </div>
                </>
            ):null}
        </>
        )}
        </>
    )
}

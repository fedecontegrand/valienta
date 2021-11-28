import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import {useDispatch,useSelector} from "react-redux"
import { closeCharactersofLocation, getAllLocations, getCharactersOfLocation } from '../redux/actions'
import CharacterCard from '../components/CharacterCard'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

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

    function handlePageChange(e){
        e.target.name==="next" ? setPage(page=>page+1) : setPage(page=>page-1)
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
        <div  key={loc.id} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>  
            <Banner 
            id={loc.id}
            title={loc.name}
            subtitle1={loc.dimension}
            subtitle2={loc.type}
            active={active}
            handleClick={handleClick}
            handleClose={handleClose}
            />
            <div className="cardsDiv">
            {active ==loc.id ? (
                <>
                {locationCharacters.length ? (
                    locationCharacters.map(char=>
                        <CharacterCard 
                        key={char.id}
                        name={char.name}
                        status={char.status}
                        species={char.species}
                        gender={char.gender}
                        image={char.image}
                        origin={char.origin.name}
                        location={char.location.name}
                        />
                        )
                    ):<span>Cargando...</span>}
                </>    
                ):null}
                </div>
        </div>
        )}
        <Footer handlePageChange={handlePageChange} page={page}/>
        </>
    )
}

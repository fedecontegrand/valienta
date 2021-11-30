import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import {useDispatch,useSelector} from "react-redux"
import { clearLocations, closeCharactersofLocation, getAllLocations, getCharactersOfLocation } from '../redux/actions'
import CharacterCard from '../components/CharacterCard'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'

export default function Locations() {

    const [filters,setFilters]=useState({
        name:"any",
        type:"any",
        dimension:"any"
    })

    const [active,setActive]=useState(undefined)

    const [page,setPage]=useState(1)

    const allLocations=useSelector(state=>state.allLocations.results)

    const locationsError=useSelector(state=>state.allLocations?.error)

    const limitPage=useSelector(state=>state.allLocations?.info?.pages)

    const locationCharacters=useSelector(state=>state.locationCharacters)

    const locationCharactersError=useSelector(state=>state.locationCharacters?.error)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAllLocations(page,filters))
        return ()=>{
            dispatch(clearLocations())
        }
    },[filters,page])

    const handleChange=e=>{
        setPage(1)
        if(e.target.name==="name" && e.target.value===""){
            setFilters(filters=>({...filters,name:"any"}))
        }
        else setFilters(filters=>({
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
        {allLocations ? allLocations.map(loc=>
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
                    ):locationCharactersError ? (
                        <h2 className="emptyResult">{locationCharactersError}</h2>
                    ):<Spinner/>}
                </>    
                ):null}
                </div>
        </div>
        ): locationsError ? (
            <h2 className="emptyResult">{locationsError}</h2>
        ):<Spinner/>}
        {allLocations ? <Footer handlePageChange={handlePageChange} page={page} limitPage={limitPage}/>:null}
        </>
    )
}

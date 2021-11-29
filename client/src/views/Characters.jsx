import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharacterCard from '../components/CharacterCard'
import Filters from "../components/Filters"
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { getCharacters } from '../redux/actions'
import styles from "../styles/Characters.scss"

export default function Characters() {

    const [filters,setFilters]=useState({
       gender:"any",
       name:"any",
       status:"any"
    })
    const [page,setPage]=useState(1)
    const dispatch=useDispatch()

    const characters=useSelector(state=>state.characters?.results)
    const limitPage=useSelector(state=>state.characters?.info?.pages)


    useEffect(()=>{
        dispatch(getCharacters(page,filters))
    },[filters,page])

    function handleChange(e){
        setFilters((filters)=>({
            ...filters,
            [e.target.name]:e.target.value
        }))
    }

    function handlePageChange(e){
        e.target.name==="next" ? setPage(page=>page+1) : setPage(page=>page-1)
    }
    return (
      <>
       <Filters handleChange={handleChange} filters={filters} type="characters"/>
       <div className="cardsDiv">
       {characters ? characters.map(character=>(
           <CharacterCard 
           key={character.id}
           image={character.image}
           name={character.name}
           status={character.status}
           gender={character.gender}
           origin={character.origin.name}
           location={character.location.name}
           species={character.species}
           />))     
           :<Spinner/>}
       </div>
        {characters ? <Footer handlePageChange={handlePageChange} page={page} limitPage={limitPage}/>:null}
      </>
    )
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharacterCard from '../components/CharacterCard'
import Filters from "../components/Filters"
import { getCharacters } from '../redux/actions'
import styles from "../styles/Characters.scss"

export default function Characters() {

    const [filters,setFilters]=useState({
       gender:"any",
       name:"any",
       status:"any"
    })

    const [page,setPage]=useState(1)

    const characters=useSelector(state=>state.characters)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getCharacters(page,filters))
    },[filters,page])

    console.log(characters)


    return (
      <>
       <Filters setFilters={setFilters} filters={filters} type="characters"/>
       <div className="cardsDiv">
       {characters[0] ? characters.map(character=>(
           <CharacterCard 
           key={character.id}
           image={character.image}
           name={character.name}
           status={character.status}
           gender={character.gender}
           species={character.species}
           />
       )):null}
       </div>
      </>
    )
}

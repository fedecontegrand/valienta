import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharacterCard from '../components/CharacterCard'
import Banner from '../components/Banner'
import Filters from '../components/Filters'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { clearEpisodes, closeCharactersofEpisode, getAllEpisodes, getCharactersOfEpisode } from '../redux/actions'

export default function Episodes() {
    
     const [filters,setFilters]=useState({
        name:"any",
        episode:"any"
     })
     const [active,setActive]=useState(undefined)
     const [page,setPage]=useState(1)
     const dispatch=useDispatch()
 
     const episodes=useSelector(state=>state.episodes?.results)
     const episodesError=useSelector(state=>state.episodes?.error)
     const limitPage=useSelector(state=>state.episodes?.info?.pages)

     const charactersOfEpisode=useSelector(state=>state.charactersOfEpisode)
     const errorCharacterOfEpisode=useSelector(state=>state.charactersOfEpisode?.error)

     useEffect(()=>{
         dispatch(getAllEpisodes(page,filters))
         return ()=>{
             dispatch(clearEpisodes())
         }
     },[filters,page])
 
     function handleChange(e){
         setPage(1)
         if(e.target.name==="episode" && !e.target.value){
            setFilters((filters)=>({
                ...filters,
                [e.target.name]:"any"
            }))    
         }
         else setFilters((filters)=>({
             ...filters,
             [e.target.name]:e.target.value
         }))
     }
 
     function handlePageChange(e){
         e.target.name==="next" ? setPage(page=>page+1) : setPage(page=>page-1)
     }

     function handleClick(e){
        dispatch(closeCharactersofEpisode())
        setActive(e.target.name)
        dispatch(getCharactersOfEpisode(e.target.name))
     }

     function handleCloseCharactersOfEpisode(e){
         setActive(undefined)
         dispatch(closeCharactersofEpisode())
     }

    return (
       <>
        <Filters handleChange={handleChange} filters={filters} type="episodes"/>
        {episodes ? episodes.map(ep=>(
            <div key={ep.id} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Banner
             id={ep.id}
             title={ep.name}
             subtitle1={ep.episode}
             subtitle2={ep.air_date}
             active={active}
             handleClick={handleClick}
             handleClose={handleCloseCharactersOfEpisode}
            />
            <div className="cardsDiv">
            {active==ep.id ? charactersOfEpisode.length ? (
                
                charactersOfEpisode.map(char=>
                    <CharacterCard 
                    key={char.id}
                    name={char.name}
                    species={char.species}
                    status={char.status}
                    gender={char.gender}
                    image={char.image}
                    origin={char.origin.name}
                    location={char.location.name}
                    />
                    )
                    ) : errorCharacterOfEpisode ? (
                        <h2 className="emptyResult">{errorCharacterOfEpisode}</h2>
                    ):<Spinner/>
                    :null}
            </div>
            </div>
            )): episodesError? (
                <h2 className="emptyResult">{episodesError}</h2>
            ):<Spinner/>}
            {episodes ? <Footer handlePageChange={handlePageChange} page={page} limitPage={limitPage}/>:null}
       </>
    )
}

// <div key={ep.id}>
//     <h4>{ep.name} {ep.episode}</h4>
//     <button name={ep.id} onClick={handleClick}>Ver personajes</button>
//     {active==ep.id ? charactersOfEpisode.length ? (
//         <>
//         <button onClick={handleCloseCharactersOfEpisode}>x</button>
//         <div className="cardsDiv">
//             {charactersOfEpisode.map(char=>
//                 <CharacterCard 
//                 key={char.id}
//                    name={char.name}
//                    species={char.species}
//                    status={char.status}
//                    gender={char.gender}
//                    image={char.image}
//                    />
//                 )}
//         </div>
//         </>) :<span>Cargando..</span>
 
//         :null}
// </div>

import axios from "axios"

export const GET_CHARACTERS="GET_CHARACTERS"
export const SET_FILTERS="SET_FILTERS"
export const GET_EPISODES="GET_EPISODES"
export const GET_EPISODES_CHARACTERS="GET_EPISODES_CHARACTERS"
export const CLOSE_EPISODES_CHARACTERS="CLOSE_EPISODES_CHARACTERS"
export const GET_ALL_LOCATIONS="GET_ALL_LOCATIONS"
export const GET_LOCATION_CHARACTERS="GET_LOCATION_CHARACTERS"
export const CLOSE_LOCATION_CHARACTERS="CLOSE_LOCATION_CHARACTERS"

export function getCharacters(page,filters){
    return (dispatch)=>{
        axios.get(`http://localhost:3001/characters/${page}?name=${filters.name}&gender=${filters.gender}&status=${filters.status}`)
        .then(res=>{
          dispatch({payload:res.data,type:GET_CHARACTERS})  
        })
        .catch(err=>console.log(err))
    }
}

export function getAllEpisodes(page,filters){
  return (dispatch)=>{
    axios.get(`http://localhost:3001/episodes/${page}?name=${filters.name}`)  //filtro del back
    .then((res)=>{
      let results=res.data
      let finalResults=results
      if(filters.episode!=="any") finalResults= results.filter(episode=>episode.id==filters.episode) // filtro del front
      dispatch({type:GET_EPISODES,payload:finalResults})
    })
    .catch(err=>console.log(err))
  }
}

export function getCharactersOfEpisode(episodeId){
  return (dispatch)=>{
    axios.get(`http://localhost:3001/charOfEpisode?episodeId=${episodeId}`)
    .then(result=>{
      dispatch({type:GET_EPISODES_CHARACTERS,payload:result.data})
    })
    .catch(err=>console.log(err))
  }
}

export function closeCharactersofEpisode(){
  return {type:CLOSE_EPISODES_CHARACTERS,payload:null}
}

export function getAllLocations(page,filters){
  return (dispatch)=>{
    axios.get(`http://localhost:3001/locations/${page}?type=${filters.type}&dimension=${filters.dimension}`)
    .then(result=>{
      dispatch({type:GET_ALL_LOCATIONS,payload:result.data})
    })
    .catch(err=>console.log("Error al traer todas las ubicaciones"))
  }
}

export function getCharactersOfLocation(locationId){
  return (dispatch)=>{
    axios.get(`http://localhost:3001/charOfLocation?locationId=${locationId}`)
    .then(res=>{
      dispatch({type:GET_LOCATION_CHARACTERS,payload:res.data})
    })
    .catch(err=>console.log(err))
  }
}

export function closeCharactersofLocation(){
  return {type:CLOSE_LOCATION_CHARACTERS,payload:null}
}
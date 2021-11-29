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
    if(filters.episode==="any"){
      axios.get(`http://localhost:3001/episodes/${page}?name=${filters.name}`)  //filtro del back (name)
      .then((res)=>{
        let results=res.data
        let finalResults=results
        if(filters.episode!=="any") finalResults= results.filter(episode=>episode["id"]==filters.episode) // filtro del front
        dispatch({type:GET_EPISODES,payload:finalResults})                                                //     (id)
      })
      .catch(err=>console.log(err))
    }
    else {
      axios.get(`https://rickandmortyapi.com/api/episode/${filters.episode}`)
      .then((res)=>{
        dispatch({type:GET_EPISODES,payload:{results:[res.data],info:{pages:1}}})
      })
      .catch(err=>console.log(err))
    }
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
  return async(dispatch)=>{
    if(filters.name==="any"){
      axios.get(`http://localhost:3001/locations/${page}?type=${filters.type}&dimension=${filters.dimension}`) // filtro del back
      .then(result=>{                                                                                          // (type,dimension)
        dispatch({type:GET_ALL_LOCATIONS,payload:result.data})
      })
      .catch(err=>console.log("Error al traer todas las ubicaciones"))
    }
    else {
      let allLocations=[]
      let url=`https://rickandmortyapi.com/api/location/`
       try {

         let firstCall=await axios.get(url)
         let numberOfPages=firstCall.data.info.pages
         for(let i=1;i<=numberOfPages;i++){
             let epsiodesOfPage=await axios.get(`${url}?page=${i}`)
             allLocations=allLocations.concat(epsiodesOfPage.data.results)
         } 
         let filteredLocations=allLocations.filter(location=>location.name.toLowerCase().includes(filters.name.toLowerCase()))
         if(filters.type!=="any") filteredLocations=filteredLocations.filter(location=>location.type.toLowerCase().includes(filters.type.toLowerCase()))
         if(filters.dimension!=="any") filteredLocations=filteredLocations.filter(location=>location.dimension.toLowerCase().includes(filters.dimension.toLowerCase()))
         dispatch({type:GET_ALL_LOCATIONS, payload:{results:filteredLocations,info:{pages:1}}})
         
     } catch (error) {
        console.log(error)     
     }
    }
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
import axios from "axios"

export const GET_CHARACTERS="GET_CHARACTERS"
export const SET_FILTERS="SET_FILTERS"
export const GET_EPISODES="GET_EPISODES"
export const GET_EPISODES_CHARACTERS="GET_EPISODES_CHARACTERS"
export const CLOSE_EPISODES_CHARACTERS="CLOSE_EPISODES_CHARACTERS"
export const GET_ALL_LOCATIONS="GET_ALL_LOCATIONS"
export const GET_LOCATION_CHARACTERS="GET_LOCATION_CHARACTERS"
export const CLOSE_LOCATION_CHARACTERS="CLOSE_LOCATION_CHARACTERS"
export const CLEAR_CHARACTERS="CLEAR_CHARACTERS"
export const CLEAR_EPISODES="CLEAR_EPISODES"
export const CLEAR_LOCATIONS="CLEAR_LOCATIONS"

export function getCharacters(page,filters){
    return (dispatch)=>{
        axios.get(`http://localhost:3001/characters/${page}?name=${filters.name}&gender=${filters.gender}&status=${filters.status}`)
        .then(res=>{
          dispatch({payload:res.data,type:GET_CHARACTERS})  
        })
        .catch(err=>dispatch({type:GET_CHARACTERS,payload:{error:err.response.data}}))
    }
}

export function clearCharacters(){
  return {type:CLEAR_CHARACTERS,payload:null}
}

export function getAllEpisodes(page,filters){
  return async(dispatch)=>{

    if(filters.episode==="any"){
      axios.get(`http://localhost:3001/episodes/${page}?name=${filters.name}`)  //filtro del back (name)
      .then((res)=>{
        let results=res.data
        let finalResults=results
        dispatch({type:GET_EPISODES,payload:finalResults})                                                
      })
      .catch(err=>dispatch({type:GET_EPISODES,payload:{error:err.response.data}}))
    }
    else {
      let url=`https://rickandmortyapi.com/api/episode/`
      let allEpisodes=[]
        try {
          let firstCall=await axios.get(url)
          let numberOfPages=firstCall.data.info.pages
          for(let i=1;i<=numberOfPages;i++){               // traigo todos los episodios del back para poder filtrar en el front
              let episodesOfPage=await axios.get(`${url}?page=${i}`)
              allEpisodes=allEpisodes.concat(episodesOfPage.data.results)
          } 
          let filteredEpisodes=allEpisodes.filter(episode=>episode.id==filters.episode)  // filtro del front (episode)
          if(filters.name!=="any") filteredEpisodes=filteredEpisodes.filter(episode=>episode.name.toLowerCase().includes(filters.name.toLowerCase()))

          //paginado no tiene sentido debido a que solo puede haber 1 o 0 resultados

          if(filteredEpisodes.length) dispatch({type:GET_EPISODES, payload:{results:filteredEpisodes,info:{pages:1}}})
          else dispatch({type:GET_EPISODES,payload:{error:"There is nothing here"}})
      } catch (error) {
         console.log(error.response)     
      }
    }
  }
}
export function clearEpisodes(){
  return({type:CLEAR_EPISODES,payload:null})
}

export function getCharactersOfEpisode(episodeId){
  return (dispatch)=>{
        let storedCharacters=localStorage.getItem("characters")
        if(storedCharacters==null) storedCharacters={location:{},episode:{}}
        else storedCharacters=JSON.parse(storedCharacters)

        if(storedCharacters.episode.hasOwnProperty(episodeId)){
           return dispatch({type:GET_EPISODES_CHARACTERS,payload:storedCharacters.episode[`${episodeId}`]})
        }

        else axios.get(`http://localhost:3001/charOfEpisode?episodeId=${episodeId}`)
        .then(result=>{
          storedCharacters.episode[`${episodeId}`]=result.data
          localStorage.setItem("characters",JSON.stringify(storedCharacters))
          dispatch({type:GET_EPISODES_CHARACTERS,payload:result.data})
        })
        .catch(err=>dispatch({type:GET_EPISODES_CHARACTERS,payload:{error:err.response.data}}))
      
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
      .catch(err=>dispatch({type:GET_ALL_LOCATIONS,payload:{error:err.response.data}}))
    }
    else {
      let allLocations=[]
      let url=`https://rickandmortyapi.com/api/location/`
       try {

         let firstCall=await axios.get(url)
         let numberOfPages=firstCall.data.info.pages
         for(let i=1;i<=numberOfPages;i++){           // traigo todos las ubicaciones del back para filtrarlas en el front
             let locationsOfPage=await axios.get(`${url}?page=${i}`)
             allLocations=allLocations.concat(locationsOfPage.data.results)
         } 
         let filteredLocations=allLocations.filter(location=>location.name.toLowerCase().includes(filters.name.toLowerCase()))  // filtro del front (name)
         if(filters.type!=="any") filteredLocations=filteredLocations.filter(location=>location.type.toLowerCase().includes(filters.type.toLowerCase()))
         if(filters.dimension!=="any") filteredLocations=filteredLocations.filter(location=>location.dimension.toLowerCase().includes(filters.dimension.toLowerCase()))
         if(filteredLocations.length) dispatch({type:GET_ALL_LOCATIONS, payload:{results:filteredLocations,info:{pages:1}}})
         else dispatch({type:GET_ALL_LOCATIONS,payload:{error:"There is nothing here"}})
     } catch (error) {
        console.log(error)     
     }
    }
  }
}

export function clearLocations(){
  return({type:CLEAR_LOCATIONS,payload:null})
}

export function getCharactersOfLocation(locationId){
  return (dispatch)=>{
    let storedCharacters=localStorage.getItem("characters")
    if(storedCharacters==null) storedCharacters={location:{},episode:{}}
    else storedCharacters=JSON.parse(storedCharacters)

    if(storedCharacters.location.hasOwnProperty(locationId)){
       return dispatch({type:GET_LOCATION_CHARACTERS,payload:storedCharacters.location[`${locationId}`]})
    }
    else axios.get(`http://localhost:3001/charOfLocation?locationId=${locationId}`)
    .then(res=>{
      storedCharacters.location[`${locationId}`]=res.data
      localStorage.setItem("characters",JSON.stringify(storedCharacters))
      dispatch({type:GET_LOCATION_CHARACTERS,payload:res.data})
    })
    .catch(err=>dispatch({type:GET_LOCATION_CHARACTERS,payload:{error:err.response.data}}))
  }
}

export function closeCharactersofLocation(){
  return {type:CLOSE_LOCATION_CHARACTERS,payload:null}
}
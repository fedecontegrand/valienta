import axios from "axios"

export const GET_CHARACTERS="GET_CHARACTERS"
export const SET_FILTERS="SET_FILTERS"

export function getCharacters(page,filters){
    return (dispatch)=>{
        axios.get(`http://localhost:3001/characters/${page}?name=${filters.name}&gender=${filters.gender}&status=${filters.status}`)
        .then(res=>{
          dispatch({payload:res.data,type:GET_CHARACTERS})  
        })
        .catch(err=>console.log(err))
    }
}
export function setFilters(filters){
    return {
      type:SET_FILTERS,
      payload:filters
    }
}
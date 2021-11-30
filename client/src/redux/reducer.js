import { CLEAR_CHARACTERS, CLEAR_EPISODES, CLEAR_LOCATIONS, CLOSE_EPISODES_CHARACTERS, CLOSE_LOCATION_CHARACTERS, GET_ALL_LOCATIONS, GET_CHARACTERS, GET_EPISODES, GET_EPISODES_CHARACTERS, GET_LOCATION_CHARACTERS, SET_FILTERS } from "./actions"

const initialState = {
    characters:[],
    episodes:[],
    charactersOfEpisode:[],
    allLocations:[],
    locationCharacters:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_CHARACTERS:
        return { ...state, characters:payload }
    case CLEAR_CHARACTERS:
        return {...state,characters:undefined}
    case GET_EPISODES:
        return {...state,episodes:payload}
    case CLEAR_EPISODES:
        return {...state,episodes:[]}
    case GET_EPISODES_CHARACTERS:
        return {...state,charactersOfEpisode:payload}
    case CLOSE_EPISODES_CHARACTERS:
        return {...state,charactersOfEpisode:[]}
    case GET_ALL_LOCATIONS:
        return {...state,allLocations:payload}
    case CLEAR_LOCATIONS:
        return {...state,allLocations:[]}
    case GET_LOCATION_CHARACTERS:
        return {...state,locationCharacters:payload}
    case CLOSE_LOCATION_CHARACTERS:
        return {...state,locationCharacters:[]}
    default:
        return state
    }
}

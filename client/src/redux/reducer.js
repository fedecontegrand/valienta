import { CLOSE_EPISODES_CHARACTERS, GET_CHARACTERS, GET_EPISODES, GET_EPISODES_CHARACTERS, SET_FILTERS } from "./actions"

const initialState = {
    characters:[],
    filters:{},
    episodes:[],
    charactersOfEpisode:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_CHARACTERS:
        return { ...state, characters:payload }
    case SET_FILTERS:
        return {...state,filters:payload}
    case GET_EPISODES:
        return {...state,episodes:payload}
    case GET_EPISODES_CHARACTERS:
        return {...state,charactersOfEpisode:payload}
    case CLOSE_EPISODES_CHARACTERS:
        return {...state,charactersOfEpisode:[]}
    default:
        return state
    }
}

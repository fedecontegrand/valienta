import { GET_CHARACTERS, SET_FILTERS } from "./actions"

const initialState = {
    characters:[],
    filters:{},
    
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_CHARACTERS:
        return { ...state, characters:payload }
    case SET_FILTERS:
        return {...state,filters:payload}
    default:
        return state
    }
}

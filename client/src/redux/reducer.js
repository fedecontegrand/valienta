import { GET_CHARACTERS } from "./actions"

const initialState = {
    characters:[],
    filters:{},
    
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_CHARACTERS:
        return { ...state, characters:payload }

    default:
        return state
    }
}

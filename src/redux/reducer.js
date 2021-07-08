import {
    GET_ALL_PROPERTIES,
    GET_PROPERTIES,
    LOADING
} from './actionTypes'

const initialState = {
    properties: [],
    isLoading: false
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PROPERTIES:
            return {
                ...state,
                properties: action.properties,
                isLoading: false
            }
        case GET_PROPERTIES:
            return {
                ...state,
                properties: action.properties,
                isLoading: false
            }
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

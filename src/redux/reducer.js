import {
    GET_ALL_PROPERTIES,
    GET_PROPERTIES,
    LOADING,
    SET_SEARCH
} from './actionTypes'

const initialState = {
    searchCity: null,
    searchCountry: null,
    searchGuests: null,
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
        case SET_SEARCH:
            return {
                ...state,
                searchCity: action.city,
                searchCountry: action.country,
                searchGuests: action.guests
            }
        default:
            return state
    }
}

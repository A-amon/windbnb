import {
    SET_SEARCH
} from '../actionTypes'

export const setSearch = (city, country, guests) => {
    return {
        type: SET_SEARCH,
        city,
        country,
        guests
    }
}
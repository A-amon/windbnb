import {
    GET_ALL_PROPERTIES,
    GET_PROPERTIES,
    LOADING
} from '../actionTypes'
import properties from '../../stays.json'

const loadingProperties = () => {
    return {
        type: LOADING
    }
}

export const getAllProperties = () => {
    return dispatch => {
        dispatch(loadingProperties())
        dispatch({
            type: GET_ALL_PROPERTIES,
            properties: properties.sort(compareRatings)
        })
    }
}

export const getProperties = (city, country, guests = null) => {
    const filteredProperties = properties.filter(
        property =>
            (
                property.city === city &&
                property.country === country
            ) ||
            (guests !== null && guests <= property.maxGuests)
    ).sort(compareRatings)

    console.log(city, filteredProperties)
    return dispatch => {
        dispatch(loadingProperties())
        dispatch({
            type: GET_PROPERTIES,
            properties: filteredProperties
        })
    }
}

const compareRatings = (propertyA, propertyB) => {
    return propertyA.rating > propertyB.rating ? -1 : 1
}

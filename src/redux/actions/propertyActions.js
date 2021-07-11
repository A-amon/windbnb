import {
    GET_PROPERTIES,
    LOADING
} from '../actionTypes'
import properties from '../../stays.json'

const loadingProperties = () => {
    return {
        type: LOADING
    }
}

//  filter properties by location (city & country)
const filterByLocation = (city, country, properties) => {
    return properties.filter(property =>
        property.city === city &&
        property.country === country
    )
}

//  filter properties by max number of guests
const filterByMaxGuests = (guests, properties) => {
    return properties.filter(property =>
        guests <= property.maxGuests)
}

//  get properties
//  return all properties if city, country & guests = null
export const getProperties = (city, country, guests) => {
    let filteredProperties = properties

    if (city !== null) {
        filteredProperties = filterByLocation(city, country, filteredProperties)
    }
    if (guests !== null) {
        filteredProperties = filterByMaxGuests(guests, filteredProperties)
    }

    filteredProperties = filteredProperties.sort(compareRatings)

    return dispatch => {
        dispatch(loadingProperties())
        dispatch({
            type: GET_PROPERTIES,
            properties: filteredProperties
        })
    }
}

//  for sorting by rating in descending order
const compareRatings = (propertyA, propertyB) => {
    return propertyA.rating > propertyB.rating ? -1 : 1
}

import properties from '../../stays.json'

const matchValue = (valA, valB) => {
    return valA.toLowerCase().includes(valB.toLowerCase())
}

export const searchLocation = (value) => {
    const filteredLocations = []
    for (const property of properties) {
        if (matchValue(property.city, value) || matchValue(property.country, value)) {
            const location = { city: property.city, country: property.country }
            if (!filteredLocations.find(loc => loc.city === property.city)) {
                filteredLocations.push(location)
            }
        }
    }

    return filteredLocations
}

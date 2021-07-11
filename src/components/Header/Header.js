import { useState } from 'react'
import { useHistory } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import Searchbar from '../Searchbar/Searchbar'
import { searchLocation } from '../../redux/actions/searchActions'
import './css/Header.css'

export default function Header () {
    const history = useHistory()

    const { city, country } = useParams()
    const [searchResults, setSearchResults] = useState([])

    const searchHandler = (values) => {
        const searchParams = new URLSearchParams()
        const location = values.location
        if (location) {
            searchParams.set('city', location.city)
            searchParams.set('country', location.country)
        }

        const guests = values.guests
        if (guests) {
            searchParams.set('adults', guests.adults)
            searchParams.set('children', guests.children)
        }

        history.push({
            pathname: '/',
            search: `?${searchParams.toString()}`
        })
    }

    const onLocationChange = (value) => {
        setSearchResults(searchLocation(value))
    }

    return (
        <header className="header">
            <Link to='/'>
                <img src={Logo} alt='Windbnb logo | Click to visit Homepage' />
            </Link>
            <Searchbar onSearch={searchHandler} onLocationChange={onLocationChange} results={searchResults} initLocation={city ? `${city}, ${country}` : ''} />
        </header>
    )
}

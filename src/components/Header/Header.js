import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import Searchbar from '../Searchbar/Searchbar'
import { searchLocation } from '../../redux/actions/searchActions'
import './css/Header.css'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

export default function Header () {
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)
    const [adults, setAdults] = useState(0)
    const [children, setChildren] = useState(0)

    const query = useQuery()
    const location = useLocation()

    const history = useHistory()

    const [searchResults, setSearchResults] = useState([])

    //  update states when route changes
    useEffect(() => {
        setCity(query.get('city'))
        setCountry(query.get('country'))
        setAdults(parseInt(query.get('adults')))
        setChildren(parseInt(query.get('children')))
    }, [location])

    //  update URL search params
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

    //  run search
    const onLocationChange = (value) => {
        setSearchResults(searchLocation(value))
    }

    return (
        <header className="header">
            <Link to='/'>
                <img src={Logo} alt='Windbnb logo | Click to visit Homepage' />
            </Link>
            <Searchbar onSearch={searchHandler}
                onLocationChange={onLocationChange}
                results={searchResults}
                initLocation={{ city, country }}
                initGuests={{ adults, children }} />
        </header>
    )
}

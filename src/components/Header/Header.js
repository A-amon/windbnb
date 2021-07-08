import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import Searchbar from '../Searchbar/Searchbar'
import { searchLocation } from '../../redux/actions/searchActions'
import './css/Header.css'

export default function Header () {
    const { city, country } = useParams()
    const [searchResults, setSearchResults] = useState([])

    const searchHandler = (values) => {
        if (values.location) {
            setSearchResults(searchLocation(values.location))
        }
    }

    return (
        <header className="header">
            <Link to='/'>
                <img src={Logo} alt='Windbnb logo | Click to visit Homepage' />
            </Link>
            <Searchbar onSearch={searchHandler} results={searchResults} initLocation={city ? `${city}, ${country}` : ''} />
        </header>
    )
}

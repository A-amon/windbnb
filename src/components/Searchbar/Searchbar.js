import { useState } from 'react'
import PropTypes from 'prop-types'
import SearchImg from '../../assets/icons/search.svg'
import './css/Searchbar.css'

Searchbar.propTypes = {
    onSearch: PropTypes.func
}

export default function Searchbar ({ onSearch }) {
    const [location, setLocation] = useState(null)
    const [guests, setGuests] = useState(null)

    const submitHandler = () => {
        const search = {}
        if (location !== null) {
            search.location = location
        }

        if (guests !== null) {
            search.guests = guests
        }

        onSearch(search)
    }

    return (
        <>
            <span className="aria--hide">Search by Location and Guests</span>
            <form className='searchbar' onSubmit={e => submitHandler()}>
                <div className="searchbar__group">
                    <label htmlFor="searchLocation">Location</label>
                    <input type="text"
                        id="searchLocation"
                        placeholder="Choose location"
                        value={location}
                        onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="searchbar__group">
                    <label htmlFor="searchGuests">Guests</label>
                    <input type="text"
                        id="searchGuests"
                        placeholder="Add guests"
                        value={guests}
                        onChange={e => setGuests(e.target.value)} />
                </div>
                <button className="searchbar__submit" type="submit">
                    <img src={SearchImg} alt="" />
                    <span>Search</span>
                </button>
            </form>
        </>
    )
}

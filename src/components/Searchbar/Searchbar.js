import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import SearchImgSienna from '../../assets/icons/search--sienna.svg'
import SearchImgConcrete from '../../assets/icons/search--concrete.svg'
import CloseImg from '../../assets/icons/close.svg'
import Location from '../Location/Location'
import './css/Searchbar.css'

Searchbar.propTypes = {
    onSearch: PropTypes.func,
    results: PropTypes.array,
    initLocation: PropTypes.string
}

export default function Searchbar ({ onSearch, results, initLocation }) {
    const history = useHistory()

    const [isFocus, setIsFocus] = useState(false)
    const [location, setLocation] = useState('')
    const [guests, setGuests] = useState('')

    useEffect(() => {
        setLocation(initLocation)
    }, [initLocation])

    const submitHandler = (event) => {
        event.preventDefault()

        const search = {}
        if (location !== null && location.length > 0) {
            search.location = location
        }

        if (guests !== null && guests.length > 0) {
            search.guests = guests
        }

        onSearch(search)
    }

    const resultClicked = (value) => {
        setLocation(`${value.city}, ${value.country}`)
        setIsFocus(false)
        history.push(`/city=${value.city}&country=${value.country}`)
    }

    return (
        <div className={`searchbar ${isFocus ? 'searchbar--focused' : ''}`}>
            {
                isFocus
                    ? <div className="searchbar__header">
                        <span>Edit your search</span>
                        <button onClick={e => setIsFocus(false)}>
                            <img src={CloseImg} alt="Close search" />
                        </button>
                    </div>
                    : null
            }
            <span className="aria--hide">Search by Location and Guests</span>
            <form className='searchbar__form' onSubmit={submitHandler}>
                <div className="searchbar__group">
                    <label htmlFor="searchLocation">Location</label>
                    <input type="text"
                        id="searchLocation"
                        placeholder="Choose location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        onFocus={e => setIsFocus(true)}
                    />
                </div>
                <div className="searchbar__group">
                    <label htmlFor="searchGuests">Guests</label>
                    <input type="text"
                        id="searchGuests"
                        placeholder="Add guests"
                        value={guests}
                        onChange={e => setGuests(e.target.value)}
                        onFocus={e => setIsFocus(true)}
                    />
                </div>
                {
                    isFocus
                        ? <ul role='listbox' className="searchbar__locations">
                            {
                                results.map((result, ind) => <Location key={ind}
                                    role='listitem'
                                    city={result.city}
                                    country={result.country}
                                    onClick={resultClicked} />)
                            }
                        </ul>
                        : null
                }
                <button className="searchbar__submit" type="submit">
                    {
                        isFocus
                            ? <img src={SearchImgConcrete} alt="" />
                            : <img src={SearchImgSienna} alt="" />
                    }
                    <span>Search</span>
                </button>
            </form>
        </div>
    )
}

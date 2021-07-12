import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SearchImgSienna from '../../assets/icons/search--sienna.svg'
import SearchImgConcrete from '../../assets/icons/search--concrete.svg'
import CloseImg from '../../assets/icons/close.svg'
import Location from '../Location/Location'
import Counter from '../Counter/Counter'
import './css/Searchbar.css'

Searchbar.propTypes = {
    onLocationChange: PropTypes.func,
    onSearch: PropTypes.func,
    results: PropTypes.array,
    initLocation: PropTypes.object,
    initGuests: PropTypes.object
}

export default function Searchbar ({ onLocationChange, onSearch, results, initLocation, initGuests }) {
    const [searchLocation, setSearchLocation] = useState('')//  location input value
    const [isFocus, setIsFocus] = useState({})//    focus state of either location/guests input

    const [location, setLocation] = useState({ city: null, country: null })//   location search params
    const [guests, setGuests] = useState({ adults: 0, children: 0 })//  guests search parmas

    //  set location input value
    //  based on existing search params
    useEffect(() => {
        const { city, country } = initLocation
        if (city && country) {
            setLocation({ city, country })
            setSearchLocation(`${city}, ${country}`)
        }

        const { adults, children } = initGuests
        if (adults || children) {
            console.log(adults, children)
            setGuests({ adults, children })
        }
    }, [initLocation])

    //  run search
    const submitHandler = (event) => {
        event.preventDefault()

        onSearch(getSearchObject())
    }

    //  get location/guests values to be searched
    //  if they are valid
    const getSearchObject = () => {
        const search = {}

        if (location.city !== null) {
            search.location = location
        }

        if (guests.adults > 0 || guests.children > 0) {
            search.guests = guests
        }

        return search
    }

    //  handle location result click event
    const resultClicked = ({ city, country }) => {
        setLocation({ city, country })
        setSearchLocation(`${city}, ${country}`)
    }

    //  check if isFocus === {}
    //  none of either location/guests input is onFocused
    const isFocusEmpty = () => {
        return Object.keys(isFocus).length === 0
    }

    return (
        <div aria-live='assertive' className={`searchbar ${!isFocusEmpty() ? 'searchbar--focused' : ''}`}>
            <div className="searchbar__header">
                <span>Edit your search</span>
                <button onClick={e => setIsFocus({})}>
                    <img src={CloseImg} alt="Close search" />
                </button>
            </div>
            <span className="aria--hide">Search by Location and Guests</span>
            <form className='searchbar__form' onSubmit={submitHandler}>
                <div className="searchbar__group">
                    <label htmlFor="searchLocation">Location</label>
                    <input type="text"
                        id="searchLocation"
                        placeholder="Choose location"
                        value={searchLocation}
                        onChange={e => {
                            setSearchLocation(e.target.value)// update input value
                            onLocationChange(e.target.value)//  search for location results
                        }}
                        onFocus={e => setIsFocus({ location: true })}
                    />
                </div>
                <div className="searchbar__group">
                    <label htmlFor="searchGuests">Guests</label>
                    <input type="number"
                        id="searchGuests"
                        placeholder="Add guests"
                        value={(guests.adults + guests.children === 0// show placeholder when adults + children = 0
                            ? false
                            : guests.adults + guests.children)}
                        onFocus={e => setIsFocus({ guests: true })}
                        readOnly
                    />
                </div>
                {
                    //  if location input is onFocused
                    //  show location results
                    isFocus.location
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
                {
                    //  if guests input is onFocused
                    //  show guests counters
                    isFocus.guests
                        ? <div className="searchbar__counters">
                            <Counter
                                title='Adults'
                                desc='Ages 13 or above'
                                initVal={guests.adults}
                                onChange={count => setGuests({ children: guests.children, adults: count })} />
                            <Counter
                                title='Children'
                                desc='Ages 2 - 12'
                                initVal={guests.children}
                                onChange={count => setGuests({ children: count, adults: guests.adults })} />
                        </div>
                        : null
                }
                <button className="searchbar__submit" type="submit">
                    {
                        !isFocusEmpty()
                            ? <img src={SearchImgConcrete} alt="" />
                            : <img src={SearchImgSienna} alt="" />
                    }
                    <span>Search</span>
                </button>
            </form>
        </div>
    )
}

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Stay from '../../components/Stay/Stay'
import { getProperties } from '../../redux/actions/propertyActions'

import './css/Home.css'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

export default function Home () {
    const query = useQuery()
    const location = useLocation()

    const { properties } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const city = query.get('city')
        const country = query.get('country')
        const adults = parseInt(query.get('adults'))
        const children = parseInt(query.get('children'))
        const maxGuests = adults ? (adults + children) : 0

        dispatch(getProperties(city, country, maxGuests))
    }, [location])

    return (
        <section className="home" aria-live="polite">
            <div className="home__header">
                <h1 className="home__country">
                    {
                        query.get('country')
                            ? `Stays in ${query.get('country')}`
                            : 'All stays'
                    }
                </h1>
                <span className="home__count">
                    {properties.length} stays
                </span>
            </div>
            {
                properties.length > 0
                    ? (
                        <ul className="home__stays">
                            <TransitionGroup component={null} appear>
                                {
                                    properties.map((property, ind) =>
                                        <CSSTransition key={ind} timeout={1000}>
                                            <Stay
                                                image={property.photo}
                                                isSuperHost={property.superHost}
                                                type={property.type}
                                                bedCount={property.beds}
                                                rating={property.rating}
                                                title={property.title}
                                            />
                                        </CSSTransition>
                                    )
                                }
                            </TransitionGroup>
                        </ul>
                    )
                    : <span>No results</span>
            }
        </section>
    )
}

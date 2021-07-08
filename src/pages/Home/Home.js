import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Stay from '../../components/Stay/Stay'
import { getAllProperties, getProperties } from '../../redux/actions/propertyActions'
import { useParams } from 'react-router'

import './css/Home.css'

export default function Home () {
    const { city, country } = useParams()
    const { properties } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (city && country) {
            dispatch(getProperties(city, country))
        } else {
            dispatch(getAllProperties())
        }
    }, [city])

    return (
        <section className="home">
            <div className="home__header">
                <h1 className="home__country">
                    {
                        country
                            ? `Stays in ${country}`
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
                            {
                                properties.map((property, ind) =>
                                    <Stay
                                        key={ind}
                                        image={property.photo}
                                        isSuperHost={property.superHost}
                                        type={property.type}
                                        bedCount={property.beds}
                                        rating={property.rating}
                                        title={property.title} />
                                )
                            }
                        </ul>
                    )
                    : null
            }
        </section>
    )
}

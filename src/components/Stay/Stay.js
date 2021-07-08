import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './css/Stay.css'

Stay.propTypes = {
    image: PropTypes.string,
    isSuperHost: PropTypes.bool,
    type: PropTypes.string,
    bedCount: PropTypes.number,
    rating: PropTypes.number,
    title: PropTypes.string
}

export default function Stay ({ image, isSuperHost, type, bedCount, rating, title }) {
    return (
        <li className="stay">
            <h2 className="stay__title">{title}</h2>
            <div className="stay__image">
                <img loading='lazy' src={image} alt='' aria-hidden='true' />
            </div>
            <div className="stay__info">
                {
                    isSuperHost
                        ? <span className="stay__tag">SUPER HOST</span>
                        : null
                }
                <span className="stay__content">
                    {type}{bedCount !== null ? ` . ${bedCount} beds` : null}
                </span>
                <span className="stay__rating">
                    {rating}
                </span>
            </div>
            <Link to='/'></Link>
        </li>
    )
}

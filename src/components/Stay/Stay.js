import PropTypes from 'prop-types'
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
            <img src={image} alt='' aria-hidden='true' />
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
        </li>
    )
}

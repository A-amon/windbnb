import PropTypes from 'prop-types'
import PlaceImg from '../../assets/icons/place.svg'
import './css/Location.css'

Location.propTypes = {
    city: PropTypes.string,
    country: PropTypes.string,
    role: PropTypes.string,
    onClick: PropTypes.func
}

export default function Location ({ role, city, country, onClick }) {
    return (
        <li className="location" role={role} onClick={e => onClick({ city, country })}>
            <img src={PlaceImg} alt="Location" />
            <span>{city}, {country}</span>
        </li>
    )
}

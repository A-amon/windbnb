import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import Searchbar from '../Searchbar/Searchbar'
import './css/Header.css'

export default function Header () {
    const searchHandler = (values) => {

    }

    return (
        <header>
            <Link to='/'>
                <img src={Logo} alt='Windbnb logo | Click to visit Homepage' />
            </Link>
            <Searchbar onSearch={searchHandler} />
        </header>
    )
}

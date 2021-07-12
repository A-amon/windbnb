import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './css/Counter.css'

Counter.propTypes = {
    onChange: PropTypes.func,
    title: PropTypes.string,
    desc: PropTypes.string,
    initVal: PropTypes.number
}

export default function Counter ({ onChange, title, desc, initVal }) {
    const [count, setCount] = useState(0)

    //  use initial value if available
    useEffect(() => {
        if (initVal) {
            setCount(initVal)
        }
    }, [])

    return (
        <div className="counter">
            <span className="counter__title">{title}</span>
            <p className="counter__desc">{desc}</p>
            <div className="counter__wrapper">
                <button className="counter__button"
                    onClick={e => {
                        if (count > 0) {
                            setCount(count - 1)
                        }
                        onChange(count - 1)
                    }}>
                    -
                </button>
                <span className="counter__value">
                    {count}
                </span>
                <button className="counter__button"
                    onClick={e => {
                        setCount(count + 1)
                        onChange(count + 1)
                    }}>
                    +
                </button>
            </div>
        </div>
    )
}

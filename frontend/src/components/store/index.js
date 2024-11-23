import React from 'react'
import './store.scss'
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

function Store(props) {
    const navigate = useNavigate()
    const onClickHandler = (storeId) => navigate(`/stores/${storeId}`)
    return (
        <div className='d-flex store-home__shop__container card-store'  onClick={() => onClickHandler(props.id)}>
            <img className='store-home__shop__logo' src={process.env.REACT_APP_API_URL + props.avatar} />
            <div className='store-home__shop__active'>
                <div className='store-home__shop__active__title'>{props.name}</div>
                <div className='d-flex mb-4'>
                    <span className="store-home__shop__active__icon" />
                    <span className="store-home__shop__active__status">online</span>
                </div>
            </div>
        </div>
    )
}

export default Store

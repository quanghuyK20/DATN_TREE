import React from 'react'
import { LikeOutlined, StarOutlined } from '@ant-design/icons'
import './card.scss'

function Card(props) {
    return (
        <div className='product-detail__detail__card__contain'>
            <img className='product-detail__detail__card__contain__img' src={process.env.REACT_APP_API_URL + props.product.img} />
            <div className='card-title'>Cây bonsai mini</div>
            <div className='card-money'>500000 VND</div>
            <div className="wrapper mt-5">
                <div className="bootstrap-line"></div>
            </div>
        </div>
    )
}

export default Card

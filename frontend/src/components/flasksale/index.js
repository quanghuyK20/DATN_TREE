import React from 'react'
import {useNavigate } from 'react-router-dom'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'
import * as defaultUrl from 'shared/constants/defaultImageUrl' 
import '../header/baseHeader.scss'
import './flasksale.scss'

function FlaskSale(props) {

    const navigate = useNavigate()
    const onClickHandler = (productId) => navigate(`/product-detail/${productId}`)
    return (
        <div className="grid-column-2-4" 
            onClick={() => onClickHandler(props.id)}
        >
            <div className="home-flask-item">
                <img
                    src={props.img ? process.env.REACT_APP_API_URL + props.img : process.env.REACT_APP_API_URL + defaultUrl.PRODUCT_IMG}
                    alt={'QR code'}
                    className="home-flask-item__img" />

                <div className='home-product-item__price'>
                    <span className="home-product-item__price-current">{props.price}0 đ</span>
                </div>
                <div className="home-product-item__favoure">
                    <i className="fas fa-check"></i>
                    <span>Yêu thích</span>
                </div>
                <div className="home-product-item__safe-off">
                    <span className="home-product-item__sale-off-percent">10%</span>
                    <span className="home-product-item__sale-off-label">GIẢM</span>
                </div>
                <div className="home-search-product-item__flask">
                    <span className="home-product-item__flask__quantity">Đã bán 10</span>
                </div>
            </div>
        </div>
    )
}

export default FlaskSale

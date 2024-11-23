import React from 'react'
import {useNavigate } from 'react-router-dom'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'
import * as defaultUrl from 'shared/constants/defaultImageUrl' 
import '../header/baseHeader.scss'
import './searchproduct.scss'

function SearchProduct(props) {

    const navigate = useNavigate()
    const onClickHandler = (productId) => navigate(`/product-detail/${productId}`)
    return (
        <div className="card-search" 
            onClick={() => onClickHandler(props.id)}
        >
            <div className="home-search-product-item">
                <img
                    src={props.img ? process.env.REACT_APP_API_URL + props.img : process.env.REACT_APP_API_URL + defaultUrl.PRODUCT_IMG}
                    alt={'QR code'}
                    className="home-search-product-item__img" />
                <h4 className="home-search-product-item__name">{props.name}</h4>
                <div className="home-search-product-item__safe-off">
                    <span className="home-search-product-item__sale-off-label">TOP</span>
                </div>
                <div className="home-search-product-item__amount">
                    <span className="home-product-item__amount__quantity">Bán 200k+ / tháng</span>
                </div>
            </div>
        </div>
    )
}

export default SearchProduct

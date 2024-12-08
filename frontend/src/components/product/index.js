import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'
import * as defaultUrl from 'shared/constants/defaultImageUrl'
import '../header/baseHeader.scss'
import './product.scss'

function Product(props) {

    const navigate = useNavigate()
    const onClickHandler = (productId) => navigate(`/product-detail/${productId}`)
    return (
        <div className="grid-column-2-4"
            onClick={() => onClickHandler(props.id)}
        >
            <div className="home-product-item">
                <img
                    src={props.img ? process.env.REACT_APP_API_URL + props.img : process.env.REACT_APP_API_URL + defaultUrl.PRODUCT_IMG}
                    alt={'QR code'}
                    className="home-product-item__img" />
                <h4 className="home-product-item__name">{props.name}</h4>
                <div className="home-product-item__price">
                    {/* HuyLQ Fix format currency 20242311 */}
                    <span className="home-product-item__price-old">999.000 đ</span>
                    <span className="home-product-item__price-current">{props.price}</span>
                </div>
                <div className="home-product-item__action">
                    <span className="home-product-item__like home-product-item__like--liked">
                        <i className="home-product-item_like-icon-empty far fa-heart">
                            <HeartOutlined />
                        </i>
                        <i className="home-product-item_like-icon-fill fas fa-heart">
                            <HeartOutlined />
                        </i>
                    </span>
                    <div className="home-product-item__rating">
                        <i className="home-product-item__star-gold"><StarOutlined /></i>
                        <i className="home-product-item__star-gold"><StarOutlined /></i>
                        <i className="home-product-item__star-gold"><StarOutlined /></i>
                        <i className="home-product-item__star-gold"><StarOutlined /></i>
                        <i className=" fas fa-star"><StarOutlined /></i>
                    </div>
                    <span className="home-product-item__sold">Đã bán 88</span>
                </div>
                <div className="home-product-item__origin">
                    <span className="home-product-item__brand">TvaT</span>
                    <span className="home-product-item__origin-name">Việt Nam</span>
                </div>
                <div className="home-product-item__favoure">
                    <i className="fas fa-check"></i>
                    <span>Yêu thích</span>
                </div>
                <div className="home-product-item__safe-off">
                    <span className="home-product-item__sale-off-percent">10%</span>
                    <span className="home-product-item__sale-off-label">GIẢM</span>
                </div>
            </div>
        </div>
    )
}

export default Product

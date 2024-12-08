import React, { useState, useEffect } from 'react'
import Product from "components/product"
import Slide from 'components/slide/home'
import Store from 'components/store'
import {
    RightOutlined
} from '@ant-design/icons'
import { BeatLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.scss"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SearchProduct from 'components/searchproduct'
import flaskSaleImg from '../../../assets/images/flasksale.png'
import FlaskSale from 'components/flasksale'
import CountDown from 'components/countdown'
import YouTube from 'react-youtube';
import MyModal from 'components/modal'
import Live1 from '../../../assets/images/live-1.jpg'
import Live2 from '../../../assets/images/live-2.jpg'
import Live3 from '../../../assets/images/live-3.jpg'
import { useDispatch, useSelector, batch } from 'react-redux'
import { getProducts } from 'redux/actions/product'
import { getStores } from 'redux/actions/store'


function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products.data)
    const loading = useSelector(state => state.products.products.isLoading);
    const stores = useSelector(state => state.stores.stores.data)
    const [productList, setProductList] = useState([]);
    const [storeList, setStoreList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    useEffect(() => {
        setIsLoading(loading);
        batch(() => {
            dispatch(getProducts({}))
            dispatch(getStores({}))
        })
    }, [])

    useEffect(() => {
        setIsLoading(false);
        setStoreList(stores)
        setProductList(products)
    }, [products, stores])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 2700, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const responsiveSearch = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
            slidesToSlide: 5
        },
        desktop: {
            breakpoint: { max: 2700, min: 1024 },
            items: 5,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const optsMain = {
        height: '503px',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className="app__container">
            <div className="grid">

                {
                    isLoading ? (
                        <div className="loading-spinner">
                            <BeatLoader color={'#00483d'} loading={isLoading} />
                        </div>
                    ) : (

                        <div>
                            <Slide />
                            <div className='home-store'>
                                <div className='home-store__header'>
                                    <div className='home-store__header__title'>Cửa hàng</div>
                                </div>
                                <Carousel responsive={responsive} className='pt-4 '>
                                    {storeList?.map((store, index) => (
                                        <Store
                                            key={index}
                                            id={store.id}
                                            name={store.name}
                                            avatar={store.avatar}
                                        />
                                    ))}
                                </Carousel>
                            </div>

                            <div className='home-flask'>
                                <div className='home-flask__header'>
                                    <div className='home-flask__header__title'>
                                        <img className='home-flask__header__img' src={flaskSaleImg}></img>
                                        <CountDown time={3600} />
                                    </div>

                                    <div className='home-flask__header__all'>
                                        <div className='home-flask__header__all__text'>Xem tất cả</div>
                                        <div className='home-flask__header__all__icon'><RightOutlined /></div>
                                    </div>
                                </div>
                                {/* <Carousel responsive={responsiveSearch} className='pt-4 '>
                                    {
                                        productList?.map((product, index) => (
                                            <FlaskSale
                                                key={index}
                                                id={product.id}
                                                img={product.img}
                                                name={product.name}
                                                price={product.price}
                                            />
                                        ))
                                    }
                                </Carousel> */}
                                <Carousel responsive={responsiveSearch} className='pt-4 '>
                                    {productList?.map((product, index) => (
                                        <FlaskSale
                                            key={index}
                                            id={product.id}
                                            img={product.img}
                                            name={product.name}
                                            price={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                        />
                                    ))}
                                </Carousel>

                            </div>

                            <div className='home-live'>
                                <div className='home-live__header'>
                                    <div className='home-live__header__title'>Tin tức</div>
                                    <div className='home-live__header__all'>
                                        <div className='home-live__header__all__text'>Xem tất cả</div>
                                        <div className='home-live__header__all__icon'><RightOutlined /></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <YouTube videoId="TJOJu7Wvtpo" opts={optsMain} />
                                    </div>
                                    <div className='col-md-4'>
                                        <MyModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            videoId={videoId}
                                        />
                                        <div className='row' onClick={() => {
                                            setModalShow(true);
                                            setVideoId("1zsdaygl6tU")
                                        }} >
                                            <img className='col-md-7 home-live__img' src={Live1} alt='live-1' />
                                            <div className='col-md-5'>
                                                <div className='home-live__text'>Giới thiệu dàn Bonsai mini mới đang giao lưu tháng 10 vườn Hữu Quang</div>
                                            </div>
                                        </div>
                                        <div className='row mt-5' onClick={() => {
                                            setModalShow(true);
                                            setVideoId("XGTaP6D34uw")
                                        }}
                                        >
                                            <img className='col-md-7 home-live__img' src={Live2} alt='live-1' />
                                            <div className='col-md-5'>
                                                <div className='home-live__text'>Cây tùng la hán: Ý nghĩa, đặc điểm, cách trồng và chăm sóc | Vườn An Nam</div>
                                            </div>
                                        </div>
                                        <div className='row mt-5' onClick={() => {
                                            setModalShow(true);
                                            setVideoId("oUFW44qp5iY")
                                        }}>
                                            <img className='col-md-7 home-live__img' src={Live3} alt='live-1' />
                                            <div className='col-md-5'>
                                                <div className='home-live__text'>Các mẫu tiểu cảnh sân vườn đẹp theo phong thủy tăng may mắn tài lộc</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='home-search'>
                                <div className='home-search__header'>
                                    <div className='home-search__header__title'>Tìm kiếm hàng đầu</div>
                                    <div className='home-search__header__all'>
                                        <div className='home-search__header__all__text'>Xem tất cả</div>
                                        <div className='home-search__header__all__icon'><RightOutlined /></div>
                                    </div>
                                </div>
                                {/* HuyLQ Fix format currency 20211123 */}
                                {/* <Carousel responsive={responsiveSearch} className='pt-4 '>
                                    {
                                        productList?.map((product, index) => (
                                            <SearchProduct
                                                key={index}
                                                id={product.id}
                                                img={product.img}
                                                name={product.name}
                                                price={product.price}
                                            />
                                        ))
                                    }
                                </Carousel> */}
                                <Carousel responsive={responsiveSearch} className='pt-4'>
                                    {productList?.map((product, index) => (
                                        <SearchProduct
                                            key={index}
                                            id={product.id}
                                            img={product.img}
                                            name={product.name}
                                            price={product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        />
                                    ))}
                                </Carousel>
                            </div>

                            <div className="grid mt-4">
                                <div className='home-product__header'>
                                    <div className='home-product__header__title'>GỢI Ý HÔM NAY</div>
                                </div>
                                <div className="home-product__contain">
                                    {/* HuyLQ Fix format currency 20241123 */}
                                    {/* <div className="grid__row">
                                        {
                                            productList?.map((product, index) => (
                                                <Product
                                                    key={index}
                                                    id={product.id}
                                                    img={product.img}
                                                    name={product.name}
                                                    price={product.price}
                                                />
                                            ))
                                        }
                                    </div> */}
                                    <div className="grid__row">
                                        {productList?.map((product, index) => (
                                            <Product
                                                key={index}
                                                id={product.id}
                                                img={product.img}
                                                name={product.name}
                                                price={product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            />
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Home

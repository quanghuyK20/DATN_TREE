import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Input } from "antd/lib"
import productApi from "api/productApi"
import {
    ShopOutlined,
    MessageOutlined,
    TeamOutlined,
    StarOutlined,
    UsergroupAddOutlined,
    UserAddOutlined,
    PlusOutlined,
    CommentOutlined
} from '@ant-design/icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './store.scss'
import Product from 'components/product'
import { BeatLoader } from 'react-spinners';
import useAuth from 'hooks/useAuth'
import followApi from 'api/followApi'
import Voucher from 'components/voucher'
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux'
import 'react-multi-carousel/lib/styles.css';
import { getProductByStoreId } from 'redux/actions/product'
import { getStoreInfoById } from 'redux/actions/store'
import { getVoucherByStoreId, resetFlag } from 'redux/actions/voucher'
import Notification from 'components/notification'
import ProductStore from 'components/product-store'
import axios from 'axios'
import nodeJSClient from 'api/nodeJSClient'
import messageNodeApi from 'api/messageNodeApi'

function Store() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { id } = useParams();
    const [productList, setProductList] = useState([]);
    const [voucherList, setVoucherList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [store, setStore] = useState({});
    const [follow, setFollow] = useState({});
    const [flagFollow, setFlagFollow] = useState(false);

    const productsByStoreId = useSelector(state => state.productsByStoreId.productsByStoreId);
    const storeInfoById = useSelector(state => state.storeInfoById.storeInfoById);
    const vouchersByStoreId = useSelector(state => state.vouchersByStoreId.vouchersByStoreId);
    const isSaveVoucher = useSelector(state => state.saveVoucherByUser.saveVoucherByUser.isSucces);
    const error = useSelector(state => state.saveVoucherByUser.saveVoucherByUser.err);
    if (isSaveVoucher) {
        setTimeout(() => {
            dispatch(resetFlag());
        }, 1000);
    }


    const loading = useMemo(() => (
        productsByStoreId.isLoading || storeInfoById.isLoading || vouchersByStoreId.isLoading
    ), [productsByStoreId.isLoading, storeInfoById.isLoading, vouchersByStoreId.isLoading]);


    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    useEffect(() => {
        dispatch(getProductByStoreId(id));
        dispatch(getStoreInfoById(id));
        dispatch(getVoucherByStoreId(id));
    }, [dispatch, id]);

    useEffect(() => {
        setIsLoading(loading);
        setProductList(productsByStoreId.data);
        setStore(storeInfoById.data);
        setVoucherList(vouchersByStoreId.data);
    }, [loading, productsByStoreId.data, storeInfoById.data, vouchersByStoreId.data]);

    useEffect(() => {
        followApi.getFollowByUserId().then((response) => {
            if (response.data) {
                setFollow(response.data)
                setFlagFollow(true)
            } else {
                setFlagFollow(false)
            }
        })

    }, [flagFollow])


    const createFollow = async () => {
        try {
            const folow = {
                user_id: user.id,
                store_id: id,
            }
            if (!user) {
                navigator('/login')
            }
            if (!flagFollow) {
                await followApi.createNew(folow)
                setFlagFollow(true);
            } else {
                await followApi.deleteFollow(folow)
                setFlagFollow(false);
            }

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 2700, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const createConversation = async () => {
        try {
            const newConversation = {
                sender_id: store.owner_id,
                receiver_id: user.id
            }
            const response = await messageNodeApi.createNewConversation(newConversation);
        } catch (e) {

        }
    }

    return (

        <div className="bg-store">

            {isLoading ? (
                <div className="loading-spinner">
                    <BeatLoader color={'#00483d'} loading={isLoading} />
                </div>
            ) : (
                <div>
                    {
                        isSaveVoucher ? (
                            <Notification type="success" message="Voucher đã được lưu" />)
                            : (
                                <Notification type="error" message={error} />
                            )

                    }
                    <div className="container pb-4">
                        <div className='row store-detail__shop'>
                            <div className='col-md-4 d-flex store-detail__shop__container'>
                                <img className='store-detail__shop__logo' src={process.env.REACT_APP_API_URL + store.avatar} />
                                <div className='store-detail__shop__active'>
                                    <div className='store-detail__shop__active__title'>{store.name}</div>
                                    <div className='d-flex mb-4'>
                                        <span className="store-detail__shop__active__icon" />
                                        <span className="store-detail__shop__active__status">online</span>
                                    </div>
                                    <div className='store-detail__shop__active__btn'>
                                        <Button className='store-detail__shop__active__btn__play' onClick={() => createFollow()}>
                                            {
                                                flagFollow ? (
                                                    <div>
                                                        ĐANG THEO
                                                    </div>

                                                ) : (
                                                    <div>
                                                        <PlusOutlined />
                                                        THEO Dõi
                                                    </div>
                                                )
                                            }
                                        </Button>
                                        <Button className='store-detail__shop__active__btn__shop' onClick={() => createConversation()}>
                                            <CommentOutlined />
                                            CHAT
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-8 d-flex justify-content-around align-items-center'>
                                <div className='col-md-4'>
                                    <div className='d-flex mt-4'>
                                        <ShopOutlined className='store-icon' />
                                        <div className='d-flex justify-content-between'>
                                            <div className='label'>Sản phẩm : </div>
                                            <div className='store-value'>{store.product_count}</div>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-4'>
                                        <TeamOutlined className='store-icon' />
                                        <div className='d-flex justify-content-between'>
                                            <div className='label'>Đang theo : </div>
                                            <div className='store-value'>{store.follow_count}</div>
                                        </div>
                                    </div>
                                    <div className='d-flex mt-4'>
                                        <MessageOutlined className='store-icon' />
                                        <div className='d-flex justify-content-between'>
                                            <div className='label'>Tỉ lệ phản hồi chat : </div>
                                            <div className='store-value'>50%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='d-flex mt-4'>
                                        <UsergroupAddOutlined className='store-icon' />
                                        <div className='label'>Người theo dõi : </div>
                                        <div className='store-value'>{store.follow_count}</div>
                                    </div>
                                    <div className='d-flex mt-4'>
                                        <StarOutlined className='store-icon' />
                                        <div className='label'>Đánh giá : </div>
                                        <div className='store-value'>{store.follow_count}</div>
                                    </div>
                                    <div className='d-flex mt-4'>
                                        <UserAddOutlined className='store-icon' />
                                        <div className='label'>Tham gia :</div>
                                        <div className='store-value'>{store.participation_time}</div>
                                    </div>
                                    <div className='d-flex mt-4'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* HUYLQ50 REMOVE  HEADER 20241123 */}
                        {/* <div className="shop-page-menu mt-5">
                                <div className="navbar-with-more-menu__items">
                                    <a className="navbar-with-more-menu__item navbar-with-more-menu__item--active" href="">
                                        <span>Dạo</span>
                                    </a>
                                    <a className="navbar-with-more-menu__item" href="/">
                                        <span>Sản phẩm trả góp</span>
                                    </a>
                                    <a className="navbar-with-more-menu__item" href="/">
                                        <span>Tất cả sản phẩm</span>
                                    </a><a className="navbar-with-more-menu__item" href="/">
                                        <span>Sản phẩm bán chạy nhất</span>
                                    </a>
                                    <a className="navbar-with-more-menu__item" href="/">
                                        <span>Sản phẩm ưu đãi</span>
                                    </a>
                                    <a className="navbar-with-more-menu__item" href="/">
                                        <span>Thêm</span>
                                    </a>
                                </div>
                            </div> */}
                    </div>
                    <div className="store-product">
                        <div className="store-product__suggest container">
                            {/* <div className='store-product__suggest__title'>MÃ GIẢM GIÁ HIỆN CÓ</div>
                                <Carousel responsive={responsive}>
                                    {voucherList?.map((voucher, index) => (
                                            <Voucher
                                                key={index}
                                                id={voucher.id}
                                                name={voucher.name}
                                                percent_reduction={voucher.percent_reduction}
                                                end_date={voucher.end_date}
                                            />
                                    ))}
                                </Carousel> */}
                            {voucherList?.length > 0 && (
                                <>
                                    <div className='store-product__suggest__title'>MÃ GIẢM GIÁ HIỆN CÓ</div>
                                    <Carousel responsive={responsive}>
                                        {voucherList.map((voucher, index) => (
                                            <Voucher
                                                key={index}
                                                id={voucher.id}
                                                name={voucher.name}
                                                percent_reduction={voucher.percent_reduction}
                                                end_date={voucher.end_date}
                                            />
                                        ))}
                                    </Carousel>
                                </>
                            )}

                            {/* HUYLQ Fix layout store 20241123 */}
                            {/* <div className='store-product__suggest__title'>SẢN PHẨM BÁN CHẠY</div>
                            <div className="grid__row">
                                {productList.slice(0, 5)?.map((product, index) => (
                                    <ProductStore
                                        key={index}
                                        id={product.id}
                                        img={product.img}
                                        name={product.name}
                                        price={product.price}
                                    />
                                ))}
                            </div> */}
                            {productList?.length > 0 && (
                                <>
                                    <div className='store-product__suggest__title'>SẢN PHẨM BÁN CHẠY</div>
                                    <div className="grid__row">
                                        {productList.slice(0, 5).map((product, index) => (
                                            <ProductStore
                                                key={index}
                                                id={product.id}
                                                img={product.img}
                                                name={product.product_name}
                                                price={product.price}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="row mt-5">
                                <img src={process.env.REACT_APP_API_URL + 'images/stores/2-min.png'} alt='store-baner'></img>
                            </div>
                            <div className="grid__row mt-5">
                                {productList.slice(5, productList.lenght)?.map((product, index) => (
                                    <ProductStore
                                        key={index}
                                        id={product.id}
                                        img={product.img}
                                        name={product.product_name}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Store
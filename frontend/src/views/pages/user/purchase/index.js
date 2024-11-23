import React, { useState, useEffect, useRef} from 'react'
import Product from "components/product"
import { BeatLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, batch } from 'react-redux'
import * as orderStatus from '../../../../shared/constants/orderStatus'
import orderApi from 'api/orderApi';
import { StarOutlined,CameraOutlined } from '@ant-design/icons'
import { Modal, Button, Input , Form, Image} from 'antd';
import messages from '../../../../assets/lang/messages'
import './purchase.scss'
import feedbackApi from 'api/feedbackApi';
import uploadImgApi from 'api/uploadApi';
import useAuth from 'hooks/useAuth';
import Notification from 'components/notification';

function Purchase() {
    const { user } = useAuth()
    const isSuccesNewOrder = useSelector(state => state.newOrder.newOrder.isSucces);
    const [productList, setProductList] = useState([]);
    const [productListFilter, setProductListFilter] = useState(productList)
    const [tabAll, setTabAll] = useState(isSuccesNewOrder ? false : true);
    const [tabWattingPayment, setTabWattingPayment] = useState(isSuccesNewOrder ? true : false);
    const [tabTransport, setTabTransport] = useState(false);
    const [tabDelivering, setTabDelivering] = useState(false);
    const [tabDone, setTabDone] = useState(false);
    const [tabRefund, setTabRefund] = useState(false);
    const [tabCancel, setTabCancel] = useState(false);
    const [isShowModal,setIsShowModal] = useState(false);
    const [orderModal,setOrderModal] = useState({});
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        const response = orderApi.getProductsOrdersByUser().then((response) => {
            setProductList(response.data)
            setProductListFilter(response.data)
        })
    }, [isSuccesNewOrder])

    const [uploadImg, setUploadImg] = useState()
    const feedbackImgRef = useRef(null);

    const handleUploadImage = (e) => {
        feedbackImgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadImg(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            const feedback = {
                user_id: user.id,
                product_id : orderModal.id,
                star: '3',
                content: values.content
            }
            const response = await feedbackApi.createNew(feedback)
            if (uploadImg) {
                const postData = new FormData()
                postData.append('img', uploadImg)
                uploadImgApi.uploadFeedbackImg(response.data.feedback.id, postData)
            }
            setIsShowModal(false)
            setIsSuccess(true)
        } catch (error) {
            alert(error)
        }
    }


    const filterProductOrders = ((option) => {
        switch (option) {
            case option = 'All':
                return setProductListFilter(productList)
            case option = orderStatus.ORDER_PLACED:
                return setProductListFilter(productList?.filter((row) => row.status === orderStatus.ORDER_PLACED))
            case option = orderStatus.OUT_FOR_DELIVERY:
                return setProductListFilter(productList?.filter((row) => row.status === orderStatus.OUT_FOR_DELIVERY))
            case option = orderStatus.ON_THE_WAY_DELIVERY:
                return setProductListFilter(productList?.filter((row) => row.status === orderStatus.ON_THE_WAY_DELIVERY))
            case option = orderStatus.SUCCESS_DELIVERED:
                return setProductListFilter(productList?.filter((row) => row.status === orderStatus.SUCCESS_DELIVERED))
            case option = orderStatus.REFUND:
                return setProductListFilter(productList?.filter((row) => row.status === orderStatus.REFUND))
            case option = orderStatus.ORDER_CANCEL:
                return setProductListFilter(productList?.filter((row) => row.status === orderStatus.ORDER_CANCEL))
            default:
                return setProductListFilter(productList)
        }
    })

    return (
        <div className="grid__column-10">
            <div className="home-filter">
                <button className={
                    tabAll === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders('All')
                        setTabAll(true)
                        setTabWattingPayment(false)
                        setTabTransport(false)
                        setTabDelivering(false)
                        setTabDone(false)
                        setTabRefund(false)
                        setTabCancel(false)
                    }}
                >Tất cả</button>
                <button className={
                    tabWattingPayment === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders(orderStatus.ORDER_PLACED)
                        setTabWattingPayment(true)
                        setTabTransport(false)
                        setTabAll(false)
                        setTabDelivering(false)
                        setTabDone(false)
                        setTabRefund(false)
                        setTabCancel(false)
                    }}
                >Chờ thanh toán</button>
                <button className={
                    tabTransport === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders(orderStatus.OUT_FOR_DELIVERY)
                        setTabTransport(true)
                        setTabAll(false)
                        setTabWattingPayment(false)
                        setTabDelivering(false)
                        setTabDone(false)
                        setTabRefund(false)
                        setTabCancel(false)
                    }}
                >Vận chuyển</button>

                <button className={
                    tabDelivering === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders(orderStatus.ON_THE_WAY_DELIVERY)
                        setTabDelivering(true)
                        setTabTransport(false)
                        setTabAll(false)
                        setTabWattingPayment(false)
                        setTabDone(false)
                        setTabRefund(false)
                        setTabCancel(false)
                    }}
                >Đang giao</button>

                <button className={
                    tabDone === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders(orderStatus.SUCCESS_DELIVERED)
                        setTabDone(true)
                        setTabDelivering(false)
                        setTabTransport(false)
                        setTabAll(false)
                        setTabWattingPayment(false)
                        setTabRefund(false)
                        setTabCancel(false)
                    }}
                >Hoàn thành</button>

                <button className={
                    tabCancel === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders(orderStatus.ORDER_CANCEL)
                        setTabCancel(true)
                        setTabRefund(false)
                        setTabTransport(false)
                        setTabAll(false)
                        setTabWattingPayment(false)
                        setTabDelivering(false)
                        setTabDone(false)
                    }}
                >Đã hủy</button>

                <button className={
                    tabRefund === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
                }
                    onClick={(e) => {
                        filterProductOrders(orderStatus.REFUND)
                        setTabRefund(true)
                        setTabTransport(false)
                        setTabAll(false)
                        setTabWattingPayment(false)
                        setTabDelivering(false)
                        setTabDone(false)
                        setTabCancel(false)
                    }}
                >Trả hàng/Hoàn tiền</button>
            </div>
            {
                isSuccess ? (
                    <Notification type="success" message="Đáng giá thành công"/>)
                :(
                    <div></div>
                )
              
            } 
            {
                productListFilter?.map((productOrder, index) => (
                    <div className="card mt-2" key={index}>
                        <div className="card-body">
                            <div className='p-2'>
                            </div>
                            <div className="row mb-3 mt-4">
                                <div className="col-sm-3 purchase_img">
                                    <Image src={process.env.REACT_APP_API_URL + productOrder.img} />
                                </div>
                                <div className="col-sm-8 text-secondary">
                                    <h4>{productOrder.product_name}</h4>
                                    <h4>x {productOrder.product_amount}</h4>
                                </div>
                                <div className="col-sm-2 text-secondary">
                                    <h4>{productOrder.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-9" />
                                <div className="col-sm-3 d-flex">
                                    <div className="col-sm-6">
                                        <h6 className="mb-0">Thành tiền: </h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <h3>₫135.000</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6"></div>
                                {
                                    productOrder.status === orderStatus.SUCCESS_DELIVERED ? (
                                        <div className="col-sm-6 d-flex justify-content-between">
                                            <Button className="px-4 purchase_btn__payment" onClick={()=>
                                                    {
                                                        setIsShowModal(true)
                                                        setOrderModal(productOrder);
                                                    }
                                                }>Đánh Giá</Button>
                                            <Button className="px-4">Liên Hệ Người Bán</Button>
                                            <Button className="px-4">Mua Lại</Button>
                                        </div>
                                    )
                                        : productOrder.status === orderStatus.ORDER_PLACED ? (
                                            <div className="col-sm-6 d-flex justify-content-between">
                                                <Button className="px-4 purchase_btn__payment">Chờ</Button>
                                                <Button className="px-4">Liên Hệ Người Bán</Button>
                                                <Button className="px-4">Hủy Đơn Hàng</Button>
                                            </div>
                                        )
                                            : productOrder.status === orderStatus.ON_THE_WAY_DELIVERY ? (
                                                <div className="col-sm-4 d-flex justify-content-between">
                                                    <Button className="px-4 purchase_btn__payment">Chờ</Button>
                                                    <Button className="px-4">Liên Hệ Người Bán</Button>
                                                </div>
                                            )
                                                : productOrder.status === orderStatus.OUT_FOR_DELIVERY ? (
                                                    <div className="col-sm-4 d-flex justify-content-between">
                                                        <Button className="px-4 purchase_btn__payment">Chờ</Button>
                                                        <Button className="px-4">Liên Hệ Người Bán</Button>
                                                    </div>
                                                )
                                                    :
                                                    (
                                                        <div className="col-sm-6 d-flex justify-content-between">
                                                            <Button className="px-4 purchase_btn__payment">Mua lại</Button>
                                                            <Button className="px-4">Xem chi tiết hủy đơn</Button>
                                                            <Button className="px-4">Liên hệ người bán</Button>
                                                        </div>
                                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))
            }

            <Modal
                className="purchase-modal"
                title="Đánh giá sản phẩm"
                visible={isShowModal}
                closable={(()=>{setIsShowModal(false)})}
                onCancel={(()=>{setIsShowModal(false)})}
                >
                <div className="row">
                    <div className="payment-container__sub__content payment-content">
                        <Form
                            name="register"
                            className="payment-container__sub__content__form"
                            onFinish={handleSubmit}
                        >
                            <div className="card mt-2">
                                <div className="card-body">
                                    <div className='p-2'>
                                    </div>
                                    <div className="row mb-3 mt-4">
                                        <div className="col-sm-4 purchase_img">
                                            <Image src={process.env.REACT_APP_API_URL + orderModal.img} />
                                        </div>
                                        <div className="col-sm-6 text-secondary">
                                            <h4>{orderModal.product_name}</h4>
                                            <h4>x {orderModal.product_amount}</h4>
                                        </div>
                                        <div className="col-sm-4 text-secondary">
                                            <h4>{orderModal.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-9 d-flex">
                                            <div className="col-sm-6">
                                                <h5 className="mb-0">Thành tiền: </h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <h3>₫135.000</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-space-between'>
                                <h5 className='mt-2'>Chất lượng sản phẩm :</h5>
                                <div>
                                    <StarOutlined className='product-detail__detail__rating-icon' />
                                    <StarOutlined className='product-detail__detail__rating-icon' />
                                    <StarOutlined className='product-detail__detail__rating-icon' />
                                    <StarOutlined className='product-detail__detail__rating-icon' />
                                    <StarOutlined className='product-detail__detail__rating-icon' />
                                </div>
                            </div>

                            <div className="purchase-content__sub__avatar">
                                <img
                                    id="user-avatar"
                                    ref={feedbackImgRef}
                                    src={process.env.REACT_APP_API_URL + 'images/feedbacks/feedback-default.png'}
                                    alt="avatar"
                                />
                                <div className="purchase-content__sub__avatar__button-upload">
                                    <label for="image-input">
                                        <CameraOutlined className="purchase-content__sub__avatar__icon" />
                                    </label>
                                    <input
                                        id="image-input"
                                        accept="image/*"
                                        type="file"
                                        onChange={handleUploadImage}
                                    />
                                </div>
                            </div>
                            <div className="payment-container__sub__content__form__item">
                                <i>
                                    {/* <UserOutlined /> */}
                                </i>
                                <Form.Item
                                    className="form-item"
                                    name="content"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['name_required'],
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Đánh giá sản"
                                        className="input email"
                                    />
                                </Form.Item>
                            </div>

                            <Button
                                className="button-submit"
                                type="primary"
                                htmlType="submit"
                            >
                                Hoàn thành
                            </Button>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Purchase

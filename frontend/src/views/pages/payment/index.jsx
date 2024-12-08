import React, { useState, useEffect } from "react";
import { Modal, Radio, Button, Input , Form} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsCartByUser } from 'redux/actions/cart'
import {FireOutlined, CarOutlined,GiftOutlined} from '@ant-design/icons'
import "./payment.scss"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import orderReceiverApi from "api/orderReceiverApi";
import shippingUnitApi from "api/shippingUnitApi";

import {
    UserOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'
import messages from '../../../assets/lang/messages'
import Notification from "components/notification";
import userVoucherApi from "api/userVoucherApi";
import { createOrder } from "redux/actions/order";
import mailApi from "api/mailApi";

function Payment() {
    const dispatch = useDispatch();
    const cartPaymentData = useSelector(state=> state.cartPayment.cartPayment);
    const isSuccesNewOrder = useSelector(state => state.newOrder.newOrder.isSucces);
    const isErrorNewOrder = useSelector(state => state.newOrder.newOrder.err);
    const {user} = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [productByCartList, setProductByCartList] = useState([]);
    const [orderReceiverList, setOrderReceiverList] = useState([]);
    const [modalOrderReceiverVisible, setModalOrderReceiverVisible] = useState(false);
    const [orderReceiverSelected, setOrderReceiverSelected] = useState({});
    const [shippingUnitList, setShippingUnitList] = useState([]);
    const [voucherList,setVoucherList] = useState([]);
    const [modalSUVisible, setModalSUVisible] = useState(false);
    const [SUSelected, setSUSelected] = useState({});
    const [isShowNewAddress,setIsShowNewAddress] = useState(false);
    const [isShowModalVoucher,setIsShowModalVoucher] = useState(false);
    const [selectedItemVoucher,setSelectedItemVoucher] = useState({});

    useEffect(()=>{
        orderReceiverApi.getAllByOwnerId(user.id).then((response)=>{
            setOrderReceiverList(response.data[0])
            if(response.data[0].length === 0){
                setIsShowNewAddress(true)
            }
            setSelectedItemOR(response.data[0][0].id)
            setOrderReceiverSelected(response.data[0])
        })

        shippingUnitApi.getAll().then((response)=>{
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            setShippingUnitList(response.data)
            setSelectedItemSU(response.data[0].id)
            setSUSelected(response.data)
        })

        userVoucherApi.getVoucherByUserId().then((response)=>{
            setVoucherList(response.data)
        })
    },[user])


    const [selectedItemOR, setSelectedItemOR] = useState(null);
    const [selectedItemSU, setSelectedItemSU] = useState(null);
    const [selectedVoucher,setSelectedVoucher] = useState(null);


    const handleCloseModalOrderReceiver = () => {
        setModalOrderReceiverVisible(false);
    };

    /**
     * handle event change radio address shipping
     */
    const handleRadioORChange = (e) => {
        setSelectedItemOR(e.target.value);
        setOrderReceiverSelected(orderReceiverList.filter((row)=>row.id !== selectedItemOR))
    };

    const handleSaveOrderReceiver = () => {
        setModalOrderReceiverVisible(false);
    };

    useEffect(()=>{
        getProductsCartByUser({})
    })

    useEffect(()=>{
        setProductByCartList(cartPaymentData);
    }, [cartPaymentData])

    
    useEffect(() =>{
        if(isSuccesNewOrder === true){
            navigate("/user/purchase")
        }

        if(isSuccesNewOrder === false){
            <Modal
                className="product-detail__modal"
                title={isErrorNewOrder}
                centered
                open={true}
                onOk={() => false}
                onCancel={null}
            >
                <Button className="btn-modal__OK" onClick={ ( () => false)}>OK</Button>
            </Modal>
        }
    },[isSuccesNewOrder,isErrorNewOrder])
    
    //Shipping Unit
    const handleCloseModalSU = () => {
        setModalSUVisible(false);
    };

    /**
     * handle event change radio ship unit
     */
    const handleRadioSUChange = (e) => {
        setSelectedItemSU(e.target.value);
        setSUSelected(shippingUnitList.filter((row)=>row.id !== selectedItemSU))
    };

    /**
     * handle event change radio voucher
     */
    const handleRadioVoucherChange = (e) => {
        setSelectedVoucher(e.target.value);
        setSelectedItemVoucher(voucherList.filter((row)=>row.id !== selectedVoucher))
    }


    const handleSaveSU= () => {
        setModalSUVisible(false);
    };

    /**
     * create New orider receiver
     */
    const handleSubmit = async (values) => {
        try {
            const response = await orderReceiverApi.createNew(values)
            if (response.request.status === 200) {
                setIsSuccess(true);
            }
            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            setIsError(true);
        }
    }

    /**
     * Cal total bill
     */
    const handleCalBillTotal = () => {
        let totalBill = 0;
        if(cartPaymentData != undefined){
            if(cartPaymentData.length === 0){
                return 0;
            }else {
                cartPaymentData?.forEach((oItem)=>{
                    totalBill +=oItem.amount * oItem.product.price;
                })
                return totalBill;
            }

        }
    }

    const navigate = useNavigate();

    const voucherBill = () => {
        if(selectedItemVoucher[0]){
            return (selectedItemVoucher[0]?.percent_reduction) * handleCalBillTotal() / 100;
        }else {
            return 0;
        }
    }

    const priceTotal = () => {
        const total = handleCalBillTotal() + SUSelected[0]?.price;
        console.log('====================================');
        console.log("SUSelected", SUSelected);
        console.log('====================================');
        if(!selectedItemVoucher[0]){
            return total;
        }
        return total - voucherBill();
    }

    const handleCreateOrder = () => {
        try {
            const productList = [];
            productByCartList.forEach((oItem)=>{
                productList.push({
                    product_name: oItem.product.name,
                    product_id: oItem.product.id,
                    product_amount : oItem.amount,
                    product_img: oItem.product.img,
                    product_price: oItem.product.price,
                    product_desc: oItem.product.desc
                })
            })
            const order = {
                email: user.email,
                transport_id: SUSelected[0]?.id,
                receiver_id : selectedItemOR,
                price : priceTotal(),
                message : document.getElementById('id_message').value,
                voucher_id : selectedItemVoucher[0]?.voucher_id ,
                user_voucher_id : selectedItemVoucher[0]?.id,
                products: productList
            }
            //remove key null, undefined, ""
            const orderWithoutEmptyValues = Object.entries(order).reduce((acc, [key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                  acc[key] = value;
                }
                return acc;
            }, {});

            if(!order.transport_id){
                <Modal
                    className="product-detail__modal"
                    title={"Vui lòng chọn đơn vị vận chuyển"}
                    centered
                    open={true}
                    onOk={() => false}
                    onCancel={null}
                >
                    <Button className="btn-modal__OK" onClick={ ( () => false)}>OK</Button>
                </Modal>
            }

            if(!order.receiver_id){
                <Modal
                    className="product-detail__modal"
                    title={"Vui lòng chọn người nhận hàng"}
                    centered
                    open={true}
                    onOk={() => false}
                    onCancel={null}
                >
                    <Button className="btn-modal__OK" onClick={ ( () => false)}>OK</Button>
                </Modal>
            }

            dispatch(createOrder(orderWithoutEmptyValues))
            const response = mailApi.sendMailOrder(order).then((response)=>{
                console.log(response);
            })
        }catch(error){

        }


    }

    return (
            <div className="mb-5 bg-cart">
                    {
                        isSuccess ? (
                                <Notification type="success" message="Đăng kí thành công địa chỉ giao hàng!"/>)
                            :(
                                <div></div>
                            )

                        }
                        {
                            isError ? (
                                <Notification type="error" message="Vui lòng thử lại!" />)
                            :(
                                <div></div>
                            )
                        }
                    <Modal
                        title="Địa Chỉ Của Tôi"
                        visible={modalOrderReceiverVisible}
                        onCancel={handleSaveOrderReceiver}
                        closable={(()=>{setModalOrderReceiverVisible(false)})}
                        footer={[
                            <Button key="cancel" onClick={handleCloseModalOrderReceiver}>
                            Thoát
                            </Button>,
                            <Button key="save" type="primary" onClick={handleSaveOrderReceiver}>
                            Lưu thay đổi
                            </Button>,
                        ]}

                        >
                            {orderReceiverList.map((item, index) => (
                                <div className="row mt-5 modal-radio" key={index}>
                                    <div className="col-md-1">
                                        <Radio.Group onChange={handleRadioORChange} value={selectedItemOR}>
                                            <Radio value={item.id}></Radio>
                                        </Radio.Group>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-5">{item.name}</div>
                                            <div className="col-md-7">{item.phone_number}</div>
                                        </div>
                                        <div className="row"></div>
                                        <div className="row">{item.address}</div>
                                    </div>
                                    {/* <div className="col-md-2">
                                        <Link className="modal-radio__link">Cập nhật</Link>
                                    </div> */}
                                </div>
                            ))}
                             <Link
                                    className="payment-btn__modal__address"
                                    onClick={(
                                        ()=>{

                                            handleCloseModalOrderReceiver()
                                            setIsShowNewAddress(true)
                                        })}
                                >
                                <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                                <span>Thêm địa chỉ mới</span>
                            </Link>

                    </Modal>

                    <Modal
                        className="payment-new-address__modal"
                        title="Địa chỉ mới"
                        visible={isShowNewAddress}
                        closable={(()=>{setIsShowNewAddress(false)})}
                        onCancel={(()=>{setIsShowNewAddress(false)})}
                        >
                        <div className="row">
                            <div className="payment-container__sub__content payment-content">
                                <Form
                                    name="register"
                                    className="payment-container__sub__content__form"
                                    onFinish={handleSubmit}
                                >
                                    <img
                                        className="image-avatar"
                                        src={process.env.REACT_APP_API_URL + 'images/stores/store-default.png'}
                                        alt={'avatar'}
                                    />
                                    <h6>Để đặt hàng vui lòng thêm địa chỉ nhận hàng</h6>
                                    <div className="payment-container__sub__content__form__item">
                                        <i>
                                            <UserOutlined />
                                        </i>
                                        <Form.Item
                                            className="form-item"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: messages['name_required'],
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Họ và Tên"
                                                className="input email"
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="payment-container__sub__content__form__item">
                                        <i>
                                            <EnvironmentOutlined />
                                        </i>
                                        <Form.Item
                                            className="form-item"
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: messages['address_required'],
                                                },
                                                {
                                                    type: 'string',
                                                    message: messages['address_required'],
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Địa chỉ"
                                                className="input address"
                                            />
                                        </Form.Item>
                                    </div>


                                    <div className="payment-container__sub__content__form__item">
                                        <i>
                                            <PhoneOutlined />
                                        </i>
                                        <Form.Item
                                            className="form-item"
                                            name="phone_number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: messages['phone_number_required'],
                                                },
                                                {
                                                    type: 'string',
                                                    min: 10,
                                                    max: 10,
                                                    message:
                                                        messages['invalid_phone_number'],
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Số điện thoại"
                                                className="input password"
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

                    <Modal
                        title="Đơn vị giao hàng"
                        visible={modalSUVisible}
                        onCancel={handleCloseModalSU}
                        footer={[
                            <Button key="cancel" onClick={handleCloseModalSU}>
                            Cancel
                            </Button>,
                            <Button key="save" type="primary" onClick={handleSaveSU}>
                            Save
                            </Button>,
                        ]}

                        >
                            {shippingUnitList.map((item, index) => (
                                <div className="row mt-5 modal-radio" key={index}>
                                    <div className="col-md-1">
                                        <Radio.Group onChange={handleRadioSUChange} value={selectedItemSU}>
                                            <Radio value={item.id}></Radio>
                                        </Radio.Group>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-5">{item.name}</div>
                                            <div className="col-md-7 modal-shippingUnit__price">{item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        </div>
                                        <div className="row"></div>
                                        <div className="row">{item.address}</div>
                                    </div>
                                    <div className="col-md-2">
                                        <Link className="modal-radio__link">Cập nhật</Link>
                                    </div>
                                </div>
                            ))}

                    </Modal>

                    <Modal
                        title="Voucher của bạn"
                        visible={isShowModalVoucher}
                        onCancel={(()=>setIsShowModalVoucher(false))}
                        footer={[
                            <Button key="cancel" onClick={(()=>setIsShowModalVoucher(false))}>
                            Cancel
                            </Button>,
                            <Button key="save" type="primary" onClick={(()=>setIsShowModalVoucher(false))}>
                            Save
                            </Button>,
                        ]}

                        >
                            {voucherList.map((item, index) => (
                                <div className="row mt-5 modal-radio" key={index}>
                                    <div className="col-md-1">
                                        <Radio.Group onChange={handleRadioVoucherChange} value={selectedVoucher}>
                                            <Radio value={item.id}></Radio>
                                        </Radio.Group>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <img src={process.env.REACT_APP_API_URL + item.img}></img>
                                            <div>Hạn sử dụng: {item.end_date}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <Link className="modal-radio__link">Cập nhật</Link>
                                    </div>
                                </div>
                            ))}

                    </Modal>

                <div className="container mt-5">
                    <div className="container payment-address">
                        <div className="d-flex">
                            <div className="payment-address__title__icon mr-4"><EnvironmentOutlined /></div>
                            <div className="payment-address__title__text h4">Địa chỉ nhận hàng</div>
                        </div>
                        <div className="d-flex">
                            <div className="container-info-receiver">
                                <div className="payment-address__info__name">{orderReceiverSelected[0]?.name}</div>
                                <div className="payment-address__info__phone">{orderReceiverSelected[0]?.phone_number}</div>
                                <div className="payment-address__info__local">{orderReceiverSelected[0]?.address}</div>
                            </div>
                            <Link className="payment-address__info__link" onClick={()=> setModalOrderReceiverVisible(true)}>Thay Đổi</Link>
                        </div>
                    </div>

                    <div className="table-responsive mb-5 mt-5">
                        <table className="table bg-cart__content">
                            <thead>
                                <tr>
                                    <th scope="col" className="h20 header-table__title">
                                        <span>Sản phẩm</span>
                                    </th>
                                    <th scope="col" className="h4 header-table">Đơn giá</th>
                                    <th scope="col" className="h4 header-table">Số lượng</th>
                                    <th scope="col" className="h4 header-table">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productByCartList?.length > 0 &&
                                    productByCartList?.map((product, index) => (
                                        <tr key={index}>
                                            <td scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={process.env.REACT_APP_API_URL + product?.product.img} className="img-fluid rounded-3 cart-product-card" alt="product" />
                                                    <div className="flex-column ms-4">
                                                        <p className="mb-2">{product?.product.name}</p>
                                                        <p className="mb-0">{product?.product.desc}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <p className="mb-0 h4">{product?.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex flex-row">
                                                    <Input type="text" value={product.amount} className="qty" />
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <p className="mb-0 h4">{(product?.product.price * product.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="container payment-shipper">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="payment-shipper__title__text">Lời nhắn :</div>
                                <Input id="id_message" type="text" className="payment-shipper__input"/>
                            </div>
                            <div className="d-block">
                                <div className="d-flex">
                                    <div className="payment-shipper__title__icon mr-4"><CarOutlined /></div>
                                    <div className="payment-shipper__title__text h4">Đơn vị vận chuyển</div>
                                </div>
                                <div className="payment-shipper__info__phone">{SUSelected[0]?.user_name} - {SUSelected[0]?.phone_number}</div>
                            </div>
                            <div>
                                <div className="payment-shipper__title__name">{SUSelected[0]?.name}</div>
                                <div className="payment-shipper__info__local">Nhận hàng vào 27 Th05 - 29 Th05</div>
                            </div>
                            <Link className="payment-shipper__title__link" onClick={()=> setModalSUVisible(true)}>Thay Đổi</Link>
                            <div className="payment-shipper__title__amount">{SUSelected[0]?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                    </div>

                    <div className="container payment-voucher">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <GiftOutlined className="payment-voucher__title__icon"/>
                                <div className="payment-shipper__title__text">Bonsai Voucher :</div>
                            </div>
                            <Link className="payment-shipper__title__link" onClick={()=> setIsShowModalVoucher(true)}>Voucher</Link>
                        </div>
                    </div>

                    <div className="card shadow-2-strong mb-lg-0 payment-layout mt-5">
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                                    <form>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                {/* <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                                                    value="" aria-label="..." checked /> */}
                                                <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                                                    value="" aria-label="..." defaultChecked />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Credit
                                                    Card
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v"
                                                    value="" aria-label="..." />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="d-flex align-items-center pe-2">
                                                <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                                                    value="" aria-label="..." />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>PayPal
                                                </p>
                                            </div>

                                        </div>
                                        <div className="d-flex flex-row mt-4">
                                            <img className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                                    alt="Visa" />
                                                <img className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                                    alt="American Express" />
                                                <img className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                                    alt="Mastercard" />
                                        </div>
                                    </form>
                                </div>

                                <div className="col-md-6 col-lg-4 col-xl-6">
                                    <div className="row">
                                        <div className="col-12 col-xl-6">
                                            <div className="form-outline mb-4 mb-xl-5">
                                                <Input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                                                    placeholder="Huy Le" />
                                                <label className="form-label" for="typeName">Name on card</label>
                                            </div>

                                            <div className="form-outline mb-4 mb-xl-5">
                                                <Input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YY"/>
                                                <label className="form-label" for="typeExp">Expiration</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-6">
                                            <div className="form-outline mb-4 mb-xl-5">
                                                <Input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                                                    placeholder="1111 2222 3333 4444" />
                                                <label className="form-label" for="typeText">Card Number</label>
                                            </div>

                                            <div className="form-outline mb-4 mb-xl-5">
                                                <Input type="password" id="typeText" className="form-control form-control-lg"
                                                    placeholder="&#9679;&#9679;&#9679;" size="1" />
                                                <label className="form-label" for="typeText">Cvv</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-xl-3">
                                    <div className="d-flex justify-content-between" style={{fontWeight: 500}}>
                                        <p className="mb-0 h4">Voucher</p>
                                        <p className="mb-0 h4">- { voucherBill()?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>

                                    <div className="d-flex justify-content-between" style={{fontWeight: 500}}>
                                        <p className="mb-0 h4">Shipping</p>
                                        <p className="mb-0 h4">{SUSelected[0]?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>

                                    <div className="d-flex justify-content-between" style={{fontWeight: 500}}>
                                        <p className="mb-0 h4">Đơn giá</p>
                                        <p className="mb-0 h4">{handleCalBillTotal()?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>

                                    <hr className="my-4"/>

                                        <div className="d-flex justify-content-between mb-4" style={{fontWeight: 500}}>
                                            <p className="mb-0 h4">Tổng thanh toán</p>
                                            <p className="mb-0 h1 cart-product__price__total">{priceTotal()?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        </div>

                                    <Button className="btn btn-purchase__order" onClick={handleCreateOrder}>
                                            Mua Ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Payment;

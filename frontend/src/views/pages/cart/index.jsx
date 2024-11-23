import React, { useState, useEffect } from "react";
// import Header from "components/header"
import productCartApi from 'api/productCartApi'
import { Button, Input, Form, Modal } from "antd/lib";
import { BeatLoader } from 'react-spinners';
// import noCart from 'assets/images/no_cart.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { getCartPayment} from '../../../redux/actions/cart'
import "./cart.scss";
import { useNavigate } from "react-router-dom";

function Cart() {
    const dispatch = useDispatch()
    const productCarts = useSelector(state => state.carts.carts.data)
    const [productByCartList, setProductByCartList] = useState([])
    const [isLoadingBegin, setIsLoadingBegin] = useState(false);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isShowModalReduce, setIsShowModalReduce] = useState(false);
    const [isShowModalIncrease, setIsShowModalIncrease] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [idProductRemove, setIdProductRemove] = useState({});
    // const [listCartPayment,setListCartPayment] = useState([]);

    const handleCheckAll = () => {
        setIsCheckedAll(!isCheckedAll);
        if (!isCheckedAll) {
            const allItemIds = productByCartList.map((product) => product.product.id);
            setCheckedItems(allItemIds);
        } else {
            setCheckedItems([]);
        }
    };

    const handleCheckItem = (itemId) => {
        if (checkedItems.includes(itemId)) {
            setCheckedItems(checkedItems.filter((item) => item !== itemId));
        } else {
            setCheckedItems([...checkedItems, itemId]);
        }
    };

    useEffect(() => {
        setIsLoadingBegin(true)
        setProductByCartList(productCarts);
        setIsLoadingBegin(false)
    }, [productCarts, productByCartList])


    const calTotalPayment = () => {
        let totalPayment = 0;
        productByCartList.forEach((product) => {
            if (checkedItems.includes(product?.product.id)) {
                totalPayment += product?.product.price * product.amount;
            }
        });
        return totalPayment;
    }

    const aListPayment = () => {
        let paymentList = [];
        productByCartList.forEach((product) => {
            if (checkedItems.includes(product?.product.id)) {
                paymentList.push(product)
            }
        });
        return paymentList;
    }

    const handleReduceAmountToCart = async (index, values) => {
        if (values.amount > 1) {
            try {
                let amountNew = -1;
                document.getElementById(`productAmount-${index}`).value = values.amount - 1;
                const product = {
                    product_id: parseInt(values.product.id),
                    amount: parseInt(amountNew)
                }
                const response = await productCartApi.addProductToCart(product)
            } catch (error) {
                setMessageError(error.response.data.message);
                setIsShowModalReduce(true);
            }

        } else {
            setIdProductRemove(values.product.id);
            setIsShowModalReduce(true);
            setMessageError('Bạn chắc chắn muốn bỏ sản phẩm này?')
        }

    }

    const handleIncreaseAmountToCart = async (index, values) => {
        if (values.product.amount > values.amount) {
            try {
                let amountNew = 1;
                document.getElementById(`productAmount-${index}`).value = values.amount + 1;
                const product = {
                    product_id: parseInt(values.product.id),
                    amount: parseInt(amountNew)
                }
                const response = await productCartApi.addProductToCart(product)
            } catch (error) {
                setMessageError(error.response.data.message);
                setIsShowModalIncrease(true);
            }
        } else {
            setIsShowModalIncrease(true);
            setMessageError('Shop không có đủ sản phẩm đáp ứng yêu cầu của bạn!');
        }
    }

    const navigate = useNavigate();

    /**
     * Handle btn payment
     */
    const handleOnClick = () => {
        let paymentList = [];
        productByCartList.forEach((product) => {
            if (checkedItems.includes(product?.product.id)) {
                paymentList.push(product)
            }
        });
        dispatch(getCartPayment(paymentList))
        navigate('/payment')
    }

    const handleBtnOkReduce = async () => {
        try {
            const response = await productCartApi.deleteProductByCart(idProductRemove)
            if (productByCartList.length === 1) {
                setProductByCartList([])
            } else {
                setProductByCartList(productByCartList.filter((row) => row.product.id === idProductRemove))
            }
            setIsShowModalReduce(false);
        } catch (error) {
            setMessageError(error.response.data.message);
        }
    }


    return (
        <div>
            {
                isLoadingBegin ? (
                    <div className="loading-spinner">
                        <BeatLoader color={'#00483d'} loading={isLoadingBegin} />
                    </div>
                ) : (
                    <div>
                        <section className="h-100 h-custom mb-5 bg-cart">
                            <div className="container h-100 py-5">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col">
                                        <div className="table-responsive mb-5">
                                            <table className="table bg-cart__content">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="h20 header-table__title">
                                                            <input
                                                                className="cart-input__checkbox"
                                                                type="checkbox"
                                                                checked={isCheckedAll}
                                                                onChange={handleCheckAll}
                                                            />
                                                            <span>Giỏ hàng của tôi</span>
                                                        </th>
                                                        <th scope="col" className="h4 header-table">Đơn giá</th>
                                                        <th scope="col" className="h4 header-table">Số lượng</th>
                                                        <th scope="col" className="h4 header-table">Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productByCartList?.length > 0 &&
                                                        productByCartList.map((product, index) => (
                                                            <tr key={index}>
                                                                <td scope="row">
                                                                    <div className="d-flex align-items-center">
                                                                        <input
                                                                            className="cart-input__checkbox"
                                                                            type="checkbox"
                                                                            checked={checkedItems.includes(product.product.id)}
                                                                            onChange={() => handleCheckItem(product.product.id)}
                                                                        />
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

                                                                        <Button className="qtyminus" onClick={() => handleReduceAmountToCart(index, product)}>-</Button>
                                                                        <Input id={`productAmount-${index}`} type="text" value={product.amount} className="qty" />
                                                                        <Button className="productNumber" onClick={() => handleIncreaseAmountToCart(index, product)}>+</Button>
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

                                        <div className="card shadow-2-strong mb-lg-0 payment-layout">
                                            <div className="card-body p-4">
                                                <div className="row">
                                                    <div className="col-lg-9 col-xl-9" />
                                                    <div className="col-lg-3 col-xl-3">
                                                        <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                                            <p className="mb-0 h3">Thành tiền:</p>
                                                            <p className="mb-0 h1 cart-product__price__total">{calTotalPayment()?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                        </div>
                                                        <Button className="btn btn-purchase__order" onClick={() => handleOnClick()}>
                                                            Mua Ngay
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Modal
                            className="cart-reduce__modal"
                            title={messageError}
                            centered
                            open={isShowModalReduce}
                        >
                            <div className="cart-modal__btn">
                                <Button className="btn-modal__OK" onClick={(() => handleBtnOkReduce())}>OK</Button>
                                <Button className="btn-modal__Cancel" onClick={(() => setIsShowModalReduce(false))}>Cancel</Button>
                            </div>
                        </Modal>

                        <Modal
                            className="cart-increase__modal"
                            title={messageError}
                            centered
                            open={isShowModalIncrease}
                        >
                            <Button className="btn-modal__OK" onClick={(() => setIsShowModalIncrease(false))}>OK</Button>
                        </Modal>

                    </div>
                )
            }
        </div>
    );
}

export default Cart;

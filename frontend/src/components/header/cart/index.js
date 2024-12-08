import React, {useEffect,useState} from 'react'
import {ShoppingCartOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import productCartApi from 'api/productCartApi'
import noCart from 'assets/images/no_cart.png'
import useAuth from 'hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsCartByUser } from 'redux/actions/cart'
import "./cart.scss"

function Cart() {
    const dispatch = useDispatch()
    const productCarts = useSelector(state=> {
        return state.carts.carts.data
    })
    const isSuccesNewOrder = useSelector(state => state.newOrder.newOrder.isSucces);
    const isSuccesAddProductToCart = useSelector(state => state.addProductToCart.carts.isSuccess)
    const { user } = useAuth()
    const [productByCartList, setProductByCartList] = useState([])
    useEffect(() =>{
        if(user!=null){
            dispatch(getProductsCartByUser({}))
        }
    },[isSuccesAddProductToCart,isSuccesNewOrder])

    useEffect(()=>{
        setProductByCartList(productCarts);
    },[productCarts])


    const deleteProductByCart = async (id) => {
        try{
            const response = await productCartApi.deleteProductByCart(id)
        }catch(err){
            alert(err)
        }
    }
    
    const lenCart = productByCartList?.length;

    return (
        <div className="header__cart">
            <div className="header_cart-wrap">
                <i className="header__cart-icon">
                    <ShoppingCartOutlined />
                </i>
                {
                    user !== null ? (
                        <span className="header__cart-notice">{lenCart}</span>
                    ):(
                        <div></div>
                    )
                }
               
                <div className="header__cart-list ">
                    {
                        lenCart <= 0 ? (
                                <div className='header__cart-list--no-cart'>
                                    <img src={noCart} alt="" className="header__cart-no-cart-img" />
                                    <p className="header__cart-list--no-cart-msg">
                                        Chưa có sản phẩm
                                    </p>
                                </div>
                        ) : (
                            <div>
                                <h4 className="header__cart_heading">Sản phẩm đã thêm</h4>
                                <ul className="header__cart-list-item">
                                    {productByCartList?.length > 0 && productByCartList?.map((product, index)=>
                                        <li key={index} className="header__cart-item">
                                            <img src={process.env.REACT_APP_API_URL + product?.product.img} alt="" className="header__cart-img" />
                                            <div className="header__cart-item-info">
                                                <div className="header__cart-item-head">
                                                    <h5 className="header__cart-item-name">{product?.product.name}</h5>
                                                    <div className="header__cart-item-price-wrap">
                                                        <span className="header__cart-item-price">{product?.product.price} đ </span>
                                                        <span className="header__cart-item-multy">x</span>
                                                        <span className="header__cart-item-qtn">{product.amount}</span>
                                                    </div>
                                                </div>
                                                <div className="header__cart-item-body">
                                                    <span className="header__cart-item-description">
                                                        Phân loại : Vip
                                                    </span>
                                                    <span className="header__cart-item-remove" onClick={(e) => deleteProductByCart(product?.product.id)}>Xóa</span>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )
                    }
                    {
                        user !==null ? (
                            <Link className="btn__cart-view" to="/cart">Xem giỏ hàng</Link>
                        ):(
                            <div className='btn__cart-view__no-user'></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart

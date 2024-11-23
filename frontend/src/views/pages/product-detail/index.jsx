import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Input } from "antd/lib"
import { Modal } from 'antd'
import Header from "components/header"
import productCartApi from 'api/productCartApi'
import numeral from 'numeral';
import { ShoppingCartOutlined, MessageOutlined, HomeOutlined, StarOutlined, LikeOutlined } from '@ant-design/icons'
import iconFace from 'assets/images/icon-face-removebg-preview.png'
import iconMessage from 'assets/images/icon-message.png'
import iconTwitter from 'assets/images/icon-twitter.png'
import iconPinterest from 'assets/images/icon-pinterest.png'
import { HeartOutlined } from '@ant-design/icons'
import { BeatLoader } from 'react-spinners';
import Comment from 'components/product-detail/comment'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './product-detail.scss'
import { batch, useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from 'redux/actions/product'
import { getFeedbacksByProductId } from 'redux/actions/feedback'
import { getStoreInfoById } from 'redux/actions/store'
import ModalDetail from 'components/modal-detail'
import Notification from 'components/notification'
import Cart from '../../../components/header/cart'
import { addProductToCart } from 'redux/actions/cart'

function ProductDetail() {
    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.products.productDetail.data);
    const feedbacksByProductId = useSelector(state => state.feedbacksByProductId.feedbacksByProductId.data.feedbacks);
    const storeInfoById = useSelector(state => state.storeInfoById.storeInfoById.data); 
    const starMiddle = useSelector(state => state.feedbacksByProductId.feedbacksByProductId.data.starMiddle);
    const loading = useSelector(state => state.products.productDetail.isLoading);
    const isSuccess = useSelector(state => state.addProductToCart.carts.isSuccess);
    const isFailed = useSelector(state => state.addProductToCart.carts.isFailed);
    const isError = useSelector(state => state.addProductToCart.carts.err)
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [feedbackList, setFeedbackList] = useState([]);
    const [store,setStore] = useState({});
    const [imgList,setImgList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [productNumber, setProductNumber] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [imgMain,setImgMain] = useState(product.img ? product.img : '');
    const [addCartSuccess, setAddCartSuccess] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [messageError, setMessageError] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(loading);
        batch(() => {
            dispatch(getProductDetail(id))
            dispatch(getFeedbacksByProductId(id))
        })
    }, [id])
    
    useEffect(()=>{
        setIsLoading(loading);
        setProduct(productDetail);
        setFeedbackList(feedbacksByProductId);
    },[id,loading,productDetail,feedbacksByProductId])

    useEffect(()=>{
        dispatch(getStoreInfoById(productDetail.store_id))
    },[productDetail])

    useEffect(()=>{
        if(productDetail){
            setStore(storeInfoById)
        }

        if(isSuccess){
            setAddCartSuccess(true)
        }

        if(isFailed){
            setMessageError(isError);
            setIsModalVisible(true);
        }else {
            setIsModalVisible(false)
        }

    },[isSuccess,isFailed])

    const [feedbackListFilter, setFeedbackListFilter] = useState(feedbacksByProductId)

    const formattedAmount = (price) => numeral(price).format('0,0');

    const onClickReduce = ((amount) => {
        if (amount > 1) {
            setProductNumber(amount - 1);
        }
    })

    const onClickIncrease = ((amount) => {
        if(amount < product.amount){
            setProductNumber(amount + 1);
        }
    })

    const handleAddToCart = async () => {
        try {
            setAddCartSuccess(false)
            const product = {
                product_id: parseInt(id),
                amount: parseInt(productNumber),
            }
            dispatch(addProductToCart(product))
            // setAddCartSuccess(true) 
        } catch (error) {
            setMessageError(error.response.data.message);
            setIsModalVisible(true)
        }
    }

    const filterFeedbacks = ((option) => {
        switch(option){
            case option = 'All' :
                return setFeedbackListFilter(feedbackList)
            case option = '5' :
                return setFeedbackListFilter(feedbackList?.filter((row) => row.star === '5'))
            case option = '4' :
                return setFeedbackListFilter(feedbackList?.filter((row) => row.star === '4'))
            case option = '3' : 
                return setFeedbackListFilter(feedbackList?.filter((row)=> row.star === '3'))
            case option = '2' : 
                return setFeedbackListFilter(feedbackList?.filter((row) => row.star === '2'))
            case option = '1' :
                return setFeedbackListFilter(feedbackList?.filter((row) => row.star === '1'))
            case option  = 'Img':
                return setFeedbackListFilter(feedbackList)
            default :
                return setFeedbackListFilter(feedbackList)
        }
    })

    const navStoreById = (storeId) => navigate(`/stores/${storeId}`)

    return (
        
        <div>
           
            {
                addCartSuccess ? (
                    <Notification type="success" message="Sản phẩm đã được thêm vào giỏ hàng"/>)
                :(
                    <div></div>
                )
              
            } 
            <Header />
            {
                isLoading ? (
                    <div className="loading-spinner">
                        <BeatLoader color={'#00483d'} loading={isLoading} />
                    </div>
                ) : (
                   <div>
                        <div className="bg-product">
                            <div className="container p-5">
                                <div className="row bg-product__content">
                                    <div className="col-md-6">
                                        <div className="product-main">
                                            <div className="item"  onClick={() => {
                                                setModalShow(true)
                                                setImgList([product.img,product.img_1,product.img_2,product.img_3,product.img_4])
                                            }}>
                                                {
                                                    imgMain ? (
                                                        <img
                                                            className="product-main__img"
                                                            src={process.env.REACT_APP_API_URL + imgMain} />
                                                    ) : (
                                                        <img
                                                            className="product-main__img"
                                                            src={process.env.REACT_APP_API_URL + product.img} />
                                                    )
                                                }
                                                
                                            </div>
                                        </div>
                                        <ModalDetail
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            imgList={imgList}
                                            productName={product.product_name}
                                        />
                                        <div className="product-thumb">
                                            <div className="item" onClick={() => {
                                                setModalShow(true)
                                                setImgList([product.img_1,product.img,product.img_2,product.img_3,product.img_4])
                                            }}
                                            onMouseOver={() => {
                                                setImgMain(product.img_1)
                                            }}
                                            
                                            >
                                                <img src={process.env.REACT_APP_API_URL + product.img_1} />
                                            </div>
                                            <div className="item" onClick={() => {
                                                setModalShow(true)
                                                setImgList([product.img_2,product.img,product.img_1,product.img_3,product.img_4])
                                            }}
                                            onMouseOver={() => setImgMain(product.img_2)}
                                            >
                                                <img src={process.env.REACT_APP_API_URL + product.img_2} />
                                            </div>
                                            <div className="item" onClick={() => {
                                                setModalShow(true)
                                                setImgList([product.img_2,product.img,product.img_1,product.img_3,product.img_4])
                                            }}
                                            onMouseOver={()=>{
                                                setImgMain(product.img_3)
                                            }}
                                            >
                                                <img src={process.env.REACT_APP_API_URL + product.img_3} />
                                            </div>
                                            <div className="item" onClick={() => {
                                                setModalShow(true)
                                                setImgList([product.img_4,product.img,product.img_1,product.img_3,product.img_2])
                                            }}
                                            onMouseOver={()=>{
                                                setImgMain(product.img_4)
                                            }}
                                            >
                                                <img src={process.env.REACT_APP_API_URL + product.img_4} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="product-dtl">
                                            <div className="product-info">
                                                <div className="product-name mt-4">{product.product_name}</div>
                                                <div className="reviews-counter mt-4">
                                                    <div className="rate">
                                                        <span>4.4k </span>
                                                        {/* <input type="radio" id="star5" name="rate" value="5" checked />
                                                        <label for="star5" title="text">5 stars</label>
                                                        <input type="radio" id="star4" name="rate" value="4" checked />
                                                        <label for="star4" title="text">4 stars</label>
                                                        <input type="radio" id="star3" name="rate" value="3" checked />
                                                        <label for="star3" title="text">3 stars</label> */}
                                                        <input type="radio" id="star5" name="rate" value="5" defaultChecked />
                                                        <label for="star5" title="text">5 stars</label>
                                                        <input type="radio" id="star4" name="rate" value="4" defaultChecked />
                                                        <label for="star4" title="text">4 stars</label>
                                                        <input type="radio" id="star3" name="rate" value="3" defaultChecked />
                                                        <label for="star3" title="text">3 stars</label>
                                                        <input type="radio" id="star2" name="rate" value="2" />
                                                        <label for="star2" title="text">2 stars</label>
                                                        <input type="radio" id="star1" name="rate" value="1" />
                                                        <label for="star1" title="text">1 star</label>
                                                    </div>
                                                    <span>|  3k Đánh giá </span>
                                                    <span>|  2k Đã bán</span>
                                                </div>
                                                <div className="product-price-discount mt-3">
                                                    <span>{formattedAmount(product.price * productNumber)} VND</span>
                                                    <span className="line-through">${formattedAmount(product.price * productNumber + product.price * productNumber * 10 / 100)}</span>
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-md-3 label">
                                                    Deal Sốc
                                                </div>
                                                <div className='col-md-6 content-deal'>Mua kèm Deal Sốc</div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-md-3 label'>
                                                    Vận chuyển
                                                </div>
                                                <div className='col-md-6 content-address'>
                                                    {product.store_address}
                                                </div>
                                            </div>
                                            <div className='row mt-6 d-flex'>
                                                <div className='col-md-3 label'>Số lượng</div>
                                                <form action="#" className="form-quality col-md-3">
                                                    <Button className="qtyminus" onClick={() => onClickReduce(productNumber)}>-</Button>
                                                    <Input type="text" value={productNumber} className="product-detail__qty"/>
                                                    <Button className="qtyminus" onClick={() => onClickIncrease(productNumber)}>+</Button>
                                                </form>
                                                <div className='col-md-3 label'>{product.amount} sản phẩm có sẵn</div>
                                            </div>
                                            <div className="row mt-5">
                                                <Button className="col-md-6 btn-cart" onClick={() => handleAddToCart()} >
                                                    <ShoppingCartOutlined />
                                                    Thêm Vào Giỏ Hàng
                                                </Button>
                                                <Button className="col-md-6 w-50 btn-purchase" onClick={() => navigate("/cart")}>Mua Ngay</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row p-4'>
                                        <div className="col-md-2 icon-social">
                                            Chia sẻ :
                                            <img
                                                src={iconFace}
                                                className="icon-social__item"
                                            />
                                            <img
                                                src={iconMessage}
                                                className="icon-social__item"
                                            />
                                            <img
                                                src={iconTwitter}
                                                className="icon-social__item"
                                            />
                                            <img
                                                src={iconPinterest}
                                                className="icon-social__item"
                                            />
                                        </div>
                                        <div className="heart col-md-3">
                                            <HeartOutlined className='heart__icon' />
                                            <div className='heart__content'>Đã thích (1,3k)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-5 product-detail__shop'>
                                    <div className='col-md-4 d-flex'>
                                        <img className='product-detail__shop__logo' src={process.env.REACT_APP_API_URL + store.avatar} />
                                        <div className='product-detail__shop__active'>
                                            <div className='product-detail__shop__active__title'>{store.name}</div>
                                            <div className='d-flex mb-4'>
                                                <span className="product-detail__shop__active__icon" />
                                                <span className="product-detail__shop__active__status">online</span>
                                            </div>
                                            <div className='product-detail__shop__active__btn'>
                                                <Button className='product-detail__shop__active__btn__play'>
                                                    <MessageOutlined />
                                                    Chat Ngay
                                                </Button>
                                                <Button className='product-detail__shop__active__btn__shop' onClick={() => navStoreById(product.store_id)}>
                                                    <HomeOutlined />
                                                    Xem Shop
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-8 d-flex justify-content-around align-items-center'>
                                        <div className='col-md-2'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='label'>Đánh giá</div>
                                                <div className='content-shop'>{store.feedback_count}</div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='label'>Sản phẩm</div>
                                                <div className='content-shop'>{store.product_count}</div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='label'>Tham Gia</div>
                                                <div className='content-shop'>{store.participation_time}</div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='label'>Người Theo Dõi</div>
                                                <div className='content-shop'>{store.follow_count}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-12 row product-detail__detail mt-5">
                                        <div className="product-dtl">
                                            <div className='row mt-5'>
                                                <h1>Chi tiết sản phẩm</h1>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-md-3 label">
                                                    Danh mục
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                {product.category_name}   
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-md-3 label'>
                                                    Xuất xứ
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    Việt Nam
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-md-3 label">
                                                    Loại phân bón
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    Hữu cơ
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-md-3 label'>
                                                    Tên tổ chức chịu trách nhiệm
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    Nông Nghiệp Thành Phố
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-md-3 label">
                                                    Địa chỉ tổ chức chịu trách nhiệm sản xuất
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    Thủ Đức, Hồ Chí Minh City
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-md-3 label'>
                                                    Loại thực vật
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    Hoa Giấy
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-md-3 label">
                                                    Kho hàng
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    433</div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-md-3 label'>
                                                    Gửi từ
                                                </div>
                                                <div className='col-md-8 content-address'>
                                                    TP. Hồ Chí Minh
                                                </div>
                                            </div>
                                            <div className='row mt-5'>
                                                <h1>MÔ TẢ SẢN PHẨM</h1>
                                            </div>
                                            <p className='content-description'>
                                                Tên sản phẩm : {product.product_name}
                                            </p>
                                            <p className='content-description'>
                                                Mô tả sản phẩm : {product.desc}
                                            </p>
                                            <p className='content-description'>
                                                Mô tả style bonsai : {product.category_detail}
                                            </p>
                                             {/* <p className='content-description'>
                                                Cách trồng hoa giấy ngũ sắc khi mới mua về: Khi mới mua về tùy thuộc vào tình trạng của cây mà có những cách chăm sóc cụ thể khác nhau. Tuy nhiên phần lớn khi vận chuyển cây do trong hộp nhiều ngày sẽ thiếu nắng, nước nên có hiện tượng nhăn lá. Bạn chỉ cần để cây ra chỗ thoáng mát 4-5 tiếng để cây hồi lại tránh đem ra trời nắng luôn kẻo bị sốc nhiệt, sau đó mới tiến hành trồng cây, chế độ tưới chăm sóc bình thường.
                                            </p>
                                            <p className='content-description'>
                                                Lưu ý: Nếu bạn muốn nhanh có một chậu hoa giấy đẹp thì có thể chọn số lượng 5 cây và trồng chung lại. Bộ gốc sẽ phát triển đáng kinh ngạc và bạn có thể thoải mái uốn ra những thế đẹp mắt mà bạn mong muốn!
                                            </p>  */}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-2 row mt-5 product-detail__detail__card">
                                        <Card product={product}/>
                                    </div> */}
                                    <div className="col-md-12 row product-detail__detail mt-5">
                                        <div className="product-dtl">
                                            <div className='row mt-5'>
                                                <h1>Đánh GIÁ SẢN PHẨM</h1>
                                            </div>
                                            <div className="row mt-5">
                                                <div className='col-md-2'>
                                                    <div className='d-flex justify-content-center'>
                                                        <div className='product-detail__detail__rating-number'>{starMiddle}</div>
                                                        <span className='product-detail__detail__rating-number__child'>trên 5</span>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <StarOutlined className='product-detail__detail__rating-icon' />
                                                        <StarOutlined className='product-detail__detail__rating-icon' />
                                                        <StarOutlined className='product-detail__detail__rating-icon' />
                                                        <StarOutlined className='product-detail__detail__rating-icon' />
                                                        <StarOutlined className='product-detail__detail__rating-icon' />
                                                    </div>
                                                </div>
                                                <div className='col-md-10'>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('All')}>Tất cả</Button>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('5')}>5 Sao</Button>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('4')}>4 Sao</Button>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('3')}>3 Sao</Button>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('2')}>2 Sao</Button>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('1')}>1 Sao</Button>
                                                    <Button className='m-1' onClick={() => filterFeedbacks('Img')}>Có Hình Ảnh/Video</Button>
                                                </div>
                                            </div>
                                            <Comment feedbacks={feedbackListFilter ? feedbackListFilter : []}/>
                                        </div>
                                    </div>
                                    {/* <Cart isSuccess={addCartSuccess}/> */}
                                    <Modal
                                        className="product-detail__modal"
                                        title={messageError}
                                        centered
                                        open={isModalVisible}
                                        onOk={() => setIsModalVisible(false)}
                                        onCancel={null}
                                    >
                                        <Button className="btn-modal__OK" onClick={ ( () => setIsModalVisible(false))}>OK</Button>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetail
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import uploadImgApi from 'api/uploadApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './add-product.scss'
import '../../../../../index.scss'
import storeApi from 'api/storeApi'
import productCategoryApi from 'api/productCategoryApi'
import productApi from 'api/productApi'

const { Option } = Select

function AddProduct() {
    const navigate = useNavigate()
    const [uploadImg, setUploadImg] = useState()
    const productImgRef = useRef(null);
    const [storeList, setStoreList] = useState([])
    const [productCategoryList, setProductCategoryList] = useState([])

    const handleUploadImage = (e) => {
        productImgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadImg(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            const response = await productApi.createNew(values)
            console.log(response);
            if (uploadImg) {
                const postData = new FormData()
                postData.append('img', uploadImg)
                uploadImgApi.uploadProductImg(response.data.product.id, postData)
            }
            alert(response.data.message)
            navigate('/admin/products')
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        storeApi.getStores().then((response) => {
            setStoreList(response.data[0])
        })
    }, [])

    useEffect(()=>{
        productCategoryApi.getProductCategories().then((response) => {
            setProductCategoryList(response.data[0])
        })
    }, [])

    return (
        <div className="add-account-content">
            <div className="title-add-acounts">Thêm sản phẩm</div>
            <Form
                name="addprofile"
                className="add-account-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-account-content__sub__avatar">
                    <img
                        id="user-avatar"
                        ref={productImgRef}
                        src={process.env.REACT_APP_API_URL + defaultImageUrl.PRODUCT_IMG}
                        alt="avatar"
                        // onError={handleGetImageError}
                    />
                    <div className="add-account-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="add-account-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/*"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="add-account-content__sub__info">
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Tên sản phẩm</span>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" className="text" />
                        </Form.Item>
                    </div>
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Giá thành</span>
                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: messages['price_required'],
                                },
                                {
                                    pattern: '^([-]?[0-9][0-9]*|0)$',
                                    min: 1,
                                    max: 100,
                                    message: messages['invalid_number'],
                                },
                            ]}
                        >
                            <Input className="text" />
                        </Form.Item>
                    </div>
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Cửa hàng</span>
                        <Form.Item
                            name="store_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="select">
                                {storeList?.map((store, id) => {
                                    return (
                                        <Option key={id} value={store.id}>
                                            {store.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Kiểu dáng</span>
                        <Form.Item
                            name="category_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="select">
                                {productCategoryList?.map((item, id) => {
                                    return (
                                        <Option key={id} value={item.id}>
                                            {item.name_vn}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>


                    <div className="add-account-content__sub__info__item">
                        <span className="span">Mô tả nội dung</span>
                        <Form.Item
                            name="desc"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="input-content" maxLength={100}/>
                        </Form.Item>
                    </div>

                </div>
                
                <div className="add-account-content__sub__button">
                    <Link to="/admin/products">
                        <Button className="button-gray">Thoát</Button>
                    </Link>
                    <Button
                        className="button-green"
                        type="primary"
                        htmlType="submit"
                    >
                        Lưu
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddProduct

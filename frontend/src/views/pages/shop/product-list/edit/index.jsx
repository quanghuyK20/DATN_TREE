import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import moment from 'moment'
import uploadImgApi from 'api/uploadApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './edit-product.scss'
import '../../../../../index.scss'
import storeApi from 'api/storeApi'
import productCategoryApi from 'api/productCategoryApi'
import productApi from 'api/productApi'
import useAuth from 'hooks/useAuth'

const { Option } = Select

function EditProduct() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [productCategoryList, setProductCategoryList] = useState([])
    const [uploadImg, setUploadImg] = useState()
    const productImgRef = useRef(null);

    const handleUploadImage = (e) => {
        productImgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadImg(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            values.store_id = user.store_id;
            const response = await productApi.updateById(id,values)
            if (uploadImg) {
                const postData = new FormData()
                postData.append('img', uploadImg)
                uploadImgApi.uploadProductImg(id, postData)
            }
            alert(response.data.message)
            navigate('/seller/products')
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        productCategoryApi.getProductCategories().then((response) => {
            setProductCategoryList(response.data[0])
        })
    }, [])

    useEffect(() => {
        if (id) {
            productApi.getProductById(id).then((response) => {
                console.log('====================================');
                console.log("Edit product", response);
                console.log('====================================');
                const product = {
                    id: response.data[0].id,
                    name: response.data[0].product_name,
                    price: Number(response.data[0].price),
                    store_id: response.data[0].store_id,
                    category_id: response.data[0].category_id,          
                    desc: response.data[0].desc,
                    img: response.data[0].img ? response.data[0].img : defaultImageUrl.PRODUCT_IMG 
                }
                setProduct(product);
            })
        }
    }, [id])

    return (
        <div className="edit-account-content">
            <div className="title-edit-acounts">Chỉnh sửa sản phẩm</div>
            <Form
                name="addprofile"
                className="edit-account-content__sub"
                onFinish={handleSubmit}
                fields={[
                    {
                        name: ['name'],
                        value: product.name,
                    },
                    {
                        name: ['price'],
                        value: product.price,
                    },
                    {
                        name: ['category_id'],
                        value: product.category_id,
                    },
                    {
                        name: ['desc'],
                        value: product.desc,
                    }
                ]}
            >
                <div className="edit-account-content__sub__avatar">
                    <img
                        id="user-avatar"
                        ref={productImgRef}
                        src={process.env.REACT_APP_API_URL + product.img}
                        alt="avatar"
                    // onError={handleGetImageError}
                    />
                    <div className="edit-account-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="edit-account-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/*"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="edit-account-content__sub__info">
                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Tên sản phẩm</span>
                        <Form.Item
                            name="name"
                            initialValue={product.name}
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
                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Giá thành</span>
                        <Form.Item
                            name="price"
                            initialValue={product.price}
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

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Loại sản phẩm</span>
                        <Form.Item
                            name="category_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="select" defaultValue={product.category_id}>
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

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Mô tả</span>
                        <Form.Item
                            name="desc"
                            initialValue={product.desc}
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
                <div className="edit-account-content__sub__button">
                    <Link to="/admin/accounts">
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

export default EditProduct

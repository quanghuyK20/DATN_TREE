import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import uploadImgApi from 'api/uploadApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './add-feedback.scss'
import '../../../../../index.scss'
import feedbackApi from 'api/feedbackApi'
import productApi from 'api/productApi'
import useAuth from 'hooks/useAuth'

const { Option } = Select

function AddFeedback() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const [productList, setProductList] = useState({})
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
                product_id : values.product_id,
                star: values.star,
                content: values.content
            }
            const response = await feedbackApi.createNew(feedback)
            if (uploadImg) {
                const postData = new FormData()
                postData.append('img', uploadImg)
                uploadImgApi.uploadFeedbackImg(response.data.id, postData)
            }
            alert(response.data.message)
            navigate('/admin/feedbacks')
        } catch (error) {
            alert(error)
        }
    }


    useEffect(() => {
        productApi.getProductsSold().then((response) => {
            setProductList(response.data)
        })
    }, [])

    return (
        <div className="add-account-content">
        <div className="title-add-acounts">Thêm feedback</div>
        <Form
            name="addprofile"
            className="add-account-content__sub"
            onFinish={handleSubmit}
        >
            <div className="add-account-content__sub__avatar">
                <img
                    id="user-avatar"
                    ref={feedbackImgRef}
                    src={process.env.REACT_APP_API_URL + defaultImageUrl.FEEDBACK_IMG}
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
            <div className="edit-account-content__sub__info">

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Sản phẩm</span>
                        <Form.Item
                            name="product_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="select">
                                {productList?.map((item, id) => {
                                    return (
                                        <Option key={id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Đánh giá</span>
                        <Form.Item
                            name="star"
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
                        <span className="span">Nội dung</span>
                        <Form.Item
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="input-content" maxLength="1000" />
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

export default AddFeedback

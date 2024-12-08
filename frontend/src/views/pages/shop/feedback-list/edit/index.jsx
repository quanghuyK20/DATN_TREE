import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import roleApi from 'api/roleApi'
import moment from 'moment'
import uploadImgApi from 'api/uploadApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './edit-feedback.scss'
import '../../../../../index.scss'  
import feedbackApi from 'api/feedbackApi'

const { Option } = Select

function EditFeedback() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [feedback, setFeedback] = useState({})
    const [uploadImg, setUploadImg] = useState()
    const feedbackImgRef = useRef(null);

    const handleUploadImage = (e) => {
        feedbackImgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadImg(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            const feedback = {
                star: values.star,
                content: values.content
            }
            const response = await feedbackApi.updateById(id,feedback)
            if (uploadImg) {
                const postData = new FormData()
                postData.append('img', uploadImg)
                uploadImgApi.uploadFeedbackImg(id, postData)
            }
            alert(response.data.message)
            navigate('/admin/feedbacks')
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (id) {
            feedbackApi.getFeedbackById(id).then((response) => {
                console.log(response);
                const feedback = {
                    id: response.data.id,
                    user_name: response.data[0].user_name,
                    user_email: response.data[0].user_email,
                    product_name: response.data[0].product_name,
                    content: response.data[0].content,
                    star: response.data[0].star,
                    feedback_img: response.data[0].feedback_img ? response.data[0].feedback_img : defaultImageUrl.FEEDBACK_IMG
                }
                setFeedback(feedback);
            })
        }
    }, [id])

    return (
        <div className="edit-account-content">
            <div className="title-edit-acounts">Chỉnh sửa feedback</div>
            <Form
                name="addprofile"
                className="edit-account-content__sub"
                onFinish={handleSubmit}
                fields={[
                    {
                        name: ['user_name'],
                        value: feedback.user_name,
                    },
                    {
                        name: ['user_email'],
                        value: feedback.user_email,
                    },
                    {
                        name: ['product_name'],
                        value: feedback.product_name,
                    },
                    {
                        name: ['content'],
                        value: feedback.content,
                    },
                    {
                        name: ['star'],
                        value: feedback.star,
                    },
                ]}
            >
                <div className="edit-account-content__sub__avatar">
                    <img
                        id="user-avatar"
                        ref={feedbackImgRef}
                        src={process.env.REACT_APP_API_URL + feedback.feedback_img}
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
                        <span className="span">Họ và tên</span>
                        <Form.Item
                            name="user_name"
                            initialValue={feedback.user_name}
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" className="text" disabled/>
                        </Form.Item>
                    </div>
                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Email</span>
                        <Form.Item
                            name="user_email"
                            initialValue={feedback.user_email}
                            rules={[
                                {
                                    type: 'email',
                                    message: messages['invalid_email'],
                                },
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="text" disabled/>
                        </Form.Item>
                    </div>

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Sản phẩm</span>
                        <Form.Item
                            name="product_name"
                            initialValue={feedback.product_name}
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" className="text" disabled/>
                        </Form.Item>
                    </div>

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Đánh giá</span>
                        <Form.Item
                            name="star"
                            initialValue={feedback.star}
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
                            initialValue={feedback.content}
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
                <div className="edit-account-content__sub__button">
                    <Link to="/admin/feedbacks">
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

export default EditFeedback

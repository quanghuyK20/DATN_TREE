import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Select,DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import uploadImgApi from 'api/uploadApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import voucherApi from 'api/voucherApi'
import useAuth from 'hooks/useAuth'
import './add-voucher.scss'
import '../../../../../index.scss'  

const { Option } = Select

function AddVoucher() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const [uploadImg, setUploadImg] = useState()
    const feedbackImgRef = useRef(null);

    const handleUploadImage = (e) => {
        feedbackImgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadImg(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            const start_date = values.start_date.format("YYYY-MM-DD");
            const end_date = values.end_date.format("YYYY-MM-DD");
            const voucher = {
                name: values.name,
                percent_reduction: values.percent_reduction,
                store_id: user.store_id,
                quantity : values.quantity,
                start_date: start_date,
                end_date: end_date
            }
            const response = await voucherApi.createNew(voucher)
            if (uploadImg) {
                const postData = new FormData()
                postData.append('img', uploadImg)
                uploadImgApi.uploadVoucherImg(response.data.voucher.id, postData)
            }
            alert(response.data.message)
            navigate('/seller/vouchers')
        } catch (error) {
            alert(error)
        }
    }



    return (
        <div className="add-account-content">
        <div className="title-add-acounts">Thêm voucher</div>
        <Form
            name="addprofile"
            className="add-account-content__sub"
            onFinish={handleSubmit}
        >
            <div className="add-account-content__sub__avatar">
                <img
                    id="user-avatar"
                    ref={feedbackImgRef}
                    src={process.env.REACT_APP_API_URL + defaultImageUrl.VOUCHER_IMG}
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
                        <span className="span">Tên ưu đãi</span>
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

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Phần trăm  giảm</span>
                        <Form.Item
                            name="percent_reduction"
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
                        <span className="span">Số lượng</span>
                        <Form.Item
                            name="quantity"
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
                        <span className="span">Ngày bắt đầu</span>
                        <Form.Item
                            name="start_date"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                             <DatePicker
                            size="medium"
                            className="input-datePicker"
                           />
                        </Form.Item>
                    </div>

                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Ngày kết thúc</span>
                        <Form.Item
                            name="end_date"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                             <DatePicker
                            size="medium"
                            className="input-datePicker"
                        />
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

export default AddVoucher

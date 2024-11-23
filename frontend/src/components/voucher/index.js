import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'
import * as defaultUrl from 'shared/constants/defaultImageUrl' 
import '../header/baseHeader.scss'
import './voucher.scss'
import { Button } from 'antd/lib'
import userVoucherApi from 'api/userVoucherApi'
import Notification from 'components/notification'
import useAuth from 'hooks/useAuth'
import { useDispatch } from 'react-redux'
import { saveVoucherByUser } from 'redux/actions/voucher'

function Voucher(props) {
    const dispatch = useDispatch()
    const { user } = useAuth();
    const handleSaveVoucher = () => {
        try{
            const userVoucer = {
                user_id: user.id,
                voucher_id: props.id
            }
            dispatch(saveVoucherByUser(userVoucer))
        }catch(error){

        }
    }

    return (
        <div className="card voucher-border">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <span className="text-danger voucher-text">Giảm {props.percent_reduction}%</span>
                    <Button className="btn-voucher" onClick={() => handleSaveVoucher()}>Lưu</Button>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="text-danger voucher-text">{props.name}</span>
                    <span className="text-muted">HSD: {props.end_date}</span>
                </div>
            </div>
        </div>
    )
}

export default Voucher

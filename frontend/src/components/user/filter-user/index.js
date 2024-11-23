import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import "./filter-user.scss"

const { Option } = Select
function FilterUser() {
    const [tabAll, setTabAll] = useState(true);
    const [tabWattingPayment, setTabWattingPayment] = useState(false);
    const [tabTransport, setTabTransport] = useState(false);
    const [tabDelivering, setTabDelivering] = useState(false);
    const [tabDone, setTabDone] = useState(false);
    const [tabRefund, setTabRefund] = useState(false);

    return (
        <div className="home-filter">
            <button className={
                tabAll === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabAll(true)
                    setTabWattingPayment(false)
                    setTabTransport(false)
                    setTabDelivering(false)
                    setTabDone(false)
                    setTabRefund(false)
                }}
            >Tất cả</button>
            <button className={
                tabWattingPayment === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabWattingPayment(true)
                    setTabTransport(false)
                    setTabAll(false)
                    setTabDelivering(false)
                    setTabDone(false)
                    setTabRefund(false)
                }}
            >Chờ thanh toán</button>
            <button className={
                tabTransport === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabTransport(true)
                    setTabAll(false)
                    setTabWattingPayment(false)
                    setTabDelivering(false)
                    setTabDone(false)
                    setTabRefund(false)
                }}
            >Vận chuyển</button>

            <button className={
                tabDelivering === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabDelivering(true)
                    setTabTransport(false)
                    setTabAll(false)
                    setTabWattingPayment(false)
                    setTabDone(false)
                    setTabRefund(false)
                }}
            >Đang giao</button>

            <button className={
                tabDone === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabDone(true)
                    setTabDelivering(false)
                    setTabTransport(false)
                    setTabAll(false)
                    setTabWattingPayment(false)
                    setTabRefund(false)
                }}
            >Hoàn thành</button>

            <button className={
                tabRefund === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabRefund(true)
                    setTabTransport(false)
                    setTabAll(false)
                    setTabWattingPayment(false)
                    setTabDelivering(false)
                    setTabDone(false)
                }}
            >Trả hàng/Hoàn tiền</button>
        </div>
    )
}

export default FilterUser

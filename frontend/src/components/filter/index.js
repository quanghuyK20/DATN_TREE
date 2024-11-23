import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import "./filter.scss"

const { Option } = Select
function Filter() {
    const [tabPoPopularActive, setTabPoPopularActive] = useState(true);
    const [tabNewActive, setNewActive] = useState(false);
    const [tabSellActive, setTabSellActive] = useState(false);
    return (
        <div className="home-filter">
            <span className="home-filter__label">Sắp xếp theo</span>
            <button className={
                tabPoPopularActive === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabPoPopularActive(true)
                    setNewActive(false)
                    setTabSellActive(false)
                }}
            >Phổ biến</button>
            <button className={
                tabNewActive === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setNewActive(true)
                    setTabSellActive(false)
                    setTabPoPopularActive(false)
                }}
            >Mới nhất</button>
            <button className={
                tabSellActive === true ? "home-filter__btn btn btn--primary" : "home-filter__btn btn"
            }
                onClick={(e) => {
                    setTabSellActive(true)
                    setTabPoPopularActive(false)
                    setNewActive(false)
                }}
            >Bán chạy</button>
            

            <Select defaultValue="Giá" className="select-input">
                <Option value="2">Giá :Thấp đến cao</Option>
                <Option value="3">Giá :Cao đến thấp</Option>
            </Select>
             
            <div className="home-filter__page">
                <span className="home-filter__page-num">
                    <span className="home-filter__page-current">1</span>/14
                </span>
                <div className="home-filter__page-control">
                    <a href="" className="home-filter__page-btn home-filter__page-btn--disabled">
                        <i className="home-filter__page-icon fas fa-angle-left"></i>
                    </a>
                    <a href="" className="home-filter__page-btn">
                        <i className="home-filter__page-icon fas fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Filter

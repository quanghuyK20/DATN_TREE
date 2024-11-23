import React, { useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined, BulbOutlined} from '@ant-design/icons'
import "./search.scss"
import { Link, useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate()
    const [paramsSearch, setParamsSearch] = useState("");
    const handleSearch = () => {
        console.log('====================================');
        console.log("paramsSearch: ", paramsSearch);
        console.log('====================================');

        if(paramsSearch)
        navigate(`/search/${paramsSearch}`)
    }
    
    return (
        <div className="header__search">
        <div className="header__search-input-wrap">
            <Input
                name="forgot-password-email"
                type="email"
                placeholder="Nhập vào ô tìm kiếm"
                size="large"
                className="header__search-input"
                onChange={(e)=>setParamsSearch(e.target.value)}
            />
            {/* 2024/11/11 Remove history search */}
            {/* <div className="header__search-history">
                <h3 className="header__search-history-heading">Lịch sử  tìm kiếm</h3>
                <ul className="header__search-history-list">
                    <li className="header__search-history-item">
                        <a href="">Cây bon sai giá rẻ</a>
                    </li>
                    <li className="header__search-history-item">
                        <a href="">Cây bon sai mini</a>
                    </li>
                </ul>
            </div> */}
        </div>
        <Link className="header__search-btn" 
            onClick={(e) => {
                e.preventDefault();
                handleSearch();
                }}
            >
            <SearchOutlined className="header__search-btn-icon" />
        </Link>
        <Link className="header__search-btn" to="/detect-img">
            <BulbOutlined className="header__search-btn-icon"/>
        </Link>
    </div>
    )
}

export default Search

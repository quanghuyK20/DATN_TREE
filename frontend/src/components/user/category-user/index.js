import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import * as defaultURL from '../../../shared/constants/defaultImageUrl'
import useAuth from 'hooks/useAuth'
import "./category-user.scss"

function CategoryUser() {
    const { user } = useAuth()
    const [tabBonsaiActive, setTabBonsaiActive] = useState(true);
    const [tabFertilizerActive, setFertilizerActive] = useState(false);
    const [tabToolActive, setTabToolActive] = useState(false);
    const [tabAdviseActive, setTabAdviseActive] = useState(false);
    
    return (
        <nav className="category">
            <h3 className="category__heading d-flex">
                <img src={ user.avatar ? (user.avatar.includes("https") ? user.avatar : process.env.REACT_APP_API_URL + user.avatar) : process.env.REACT_APP_API_URL + defaultURL.USER_AVATAR} alt="Admin" className="rounded-circle p-1 bg-primary" width="50"/>
                <h5 className='mt-3 p-2'>{user.name}</h5>
            </h3>
            <ul className="category-list">
                <li className={
                    tabBonsaiActive === true ? "category-item category-item-active" : "category-item"
                    
                }
                onClick={(e) => {
                    setTabBonsaiActive(true)
                    setFertilizerActive(false)
                    setTabToolActive(false)
                    setTabAdviseActive(false)
                }}
                >
                    <Link to="/user/account" className="category-item__link">Tài khoản của tôi </Link>
                </li>
                <li className={
                    tabFertilizerActive === true ? "category-item category-item-active" : "category-item"
                } 
                 onClick={(e) => {
                    setFertilizerActive(true)
                    setTabBonsaiActive(false)
                    setTabToolActive(false)
                    setTabAdviseActive(false)
                }}
                >
                    <Link to="/user/purchase" className="category-item__link">Đơn mua</Link>
                </li>
                <li className={
                    tabToolActive === true ? "category-item category-item-active" : "category-item"
                } 
                 onClick={(e) => {
                    setTabToolActive(true)
                    setFertilizerActive(false)
                    setTabBonsaiActive(false)
                    setTabAdviseActive(false)
                }}
                >
                    <Link href="#" className="category-item__link">Thông báo</Link>
                </li>
                <li className={
                    tabAdviseActive === true ? "category-item category-item-active" : "category-item"
                }  
                 onClick={(e) => {
                    setTabAdviseActive(true)
                    setTabToolActive(false)
                    setFertilizerActive(false)
                    setTabBonsaiActive(false)
                }}
                >
                    <Link href="#" className="category-item__link">Kho voucher</Link>
                </li>
            </ul>
        </nav>
    )
}

export default CategoryUser

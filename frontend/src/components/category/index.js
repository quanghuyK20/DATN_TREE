import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./category.scss"

function Category() {
    const [tabBonsaiActive, setTabBonsaiActive] = useState(true);
    const [tabFertilizerActive, setFertilizerActive] = useState(false);
    const [tabToolActive, setTabToolActive] = useState(false);
    const [tabAdviseActive, setTabAdviseActive] = useState(false);
    
    return (
        <nav className="category">
            <h3 className="category__heading">
                <i className="category__heading-icon fas fa-list"></i>
                Danh Mục
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
                    <Link href="#" className="category-item__link">Bonsai </Link>
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
                    <Link href="#" className="category-item__link">Phân bón</Link>
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
                    <Link href="#" className="category-item__link">Dụng cụ</Link>
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
                    <Link href="#" className="category-item__link">Tư vấn</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Category

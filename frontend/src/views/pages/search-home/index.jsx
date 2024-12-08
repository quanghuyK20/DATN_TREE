import React, { useState, useEffect } from 'react'
import Product from "components/product"
import { BeatLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, batch } from 'react-redux'
import { getProducts, getProductsByParams } from 'redux/actions/product'
import './search-home.scss'
import Category from 'components/category';
import Filter from 'components/filter';
import { useParams } from 'react-router-dom';


function SearchHome() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsByParams.productsByParams.data)
    const loading = useSelector(state => state.productsByParams.productsByParams.isLoading);
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { params } = useParams();

    useEffect(() => {
        setIsLoading(loading);
        batch(() => {
            dispatch(getProductsByParams(params))
        })
    }, [])

    useEffect(() => {
            setIsLoading(false);
            setProductList(products)
    }, [products])

    return (
            <div className="grid margin-top__layout">
                <div className="grid__row mt-4">
                    <div className="grid__column-2">
                        <Category />
                    </div>
                    <div className="grid__column-10">
                        <Filter />
                        <div className="home-product">
                            {
                                isLoading ? (
                                    <div className="loading-spinner">
                                        <BeatLoader color={'#00483d'} loading={isLoading} />
                                    </div>
                                ) : (
                                    <div className="grid__row">
                                        {
                                            productList?.map((product, index) => (
                                                <Product
                                                    key={index}
                                                    id={product.id}
                                                    img={product.img}
                                                    name={product.name}
                                                    price={product.price}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SearchHome

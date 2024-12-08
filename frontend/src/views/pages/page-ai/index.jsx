import React, { useState, useRef } from 'react'
import { BeatLoader } from 'react-spinners';
import Header from 'components/header'
import logo from '../../../assets/images/logo.png'
import detect from 'api/detectApi'
import productApi from 'api/productApi'
import Product from 'components/product'
import 'bootstrap/dist/css/bootstrap.min.css';
import './page-ai.scss'
import { Button } from 'antd/lib';

function PageAi() {
    const photoRef = useRef(null)
    const [image, setImage] = useState(null);
    const [imageDetect, setImageDetect] = useState(logo);
    const [result, setResult] = useState('');
    const [category, setCategory] = useState({
        name_jp: '',
        name_vn: '',
        detail: '',
        products: [{}],
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        setCategory({ name_jp: '', name_vn: '', detail: '', products: [{}] })
        setResult('')
        const selectedImage = event.target.files[0];
        const fileName = selectedImage.name
        if (parseFloat((selectedImage.size / 10485760).toFixed(2)) > 0.5) {
            alert(
                'Sorry, ' +
                fileName +
                "has size bigger than 5 MB. Please choose another smaller size image!"
            )
            setResult('')
            setImageDetect(logo)
        } else {
            setResult('')
            setImage(selectedImage);
            const reader = new FileReader();
            reader.readAsDataURL(selectedImage);
            reader.onload = () => {
                setImageDetect(reader.result);
            };
        }
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault()
        if (imageDetect === logo) {
            setIsLoading(false);
            alert('Please choose image you want to identify!')
            return 0;
        }
        const file = new File([image], {
            type: 'image',
            lastModified: new Date(),
        })

        const body = new FormData()
        body.append('file', file)
        try {
            detect.detect(body)
                .then(async (res) => {
                    console.log(res.status);
                    const text = await res.data;
                    setResult(text)
                    let dt = JSON.stringify({
                        name: text,
                    })
                    productApi.getProductByCategory(dt).then((res) => {
                        setCategory({
                            name_jp: res.data.name_jp,
                            name_vn: res.data.name_vn,
                            detail: res.data.detail,
                            products: res.data.products,
                        })
                        setIsLoading(false);
                    })
                }).catch((err) => {
                    setIsLoading(false);
                    alert(
                        "We cannot regconize this file! Maybe it's not in our collections :(("
                    )
                    setImageDetect(logo)
                    setResult('')
                    const inputElement = document.getElementById('image-input');
                    inputElement.value = '';
                    inputElement.type = 'text';
                    inputElement.type = 'file';
                })
        } catch (error) {
            setIsLoading(false);
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error)
        }

    }

    return (
        <div className='container-page-detect'>
            <form onSubmit={handleSubmit} className='container-page-ai'>
                <div className="wrapper">
                    <div className="image">
                        <img src={imageDetect} alt="" />
                        <input
                            type="file"
                            id="image-input"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="content">
                        <div className="icon">
                            <i className="fas fa-cloud-upload-alt"></i>
                        </div>
                    </div>
                    <div id="cancel-btn">
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="file-name">
                        File name here
                    </div>
                </div>
                <div className="btn-page-ai">
                    <Button htmlType="submit" id="custom-btn">Detect style bonsai</Button>
                </div>
            </form>
            {
                isLoading ? (
                    <div className="loading-spinner">
                        <BeatLoader color={'#00483d'} loading={isLoading} />
                    </div>
                ) : (
                    <div>
                        {
                            result !== '' ? (
                                <div className='container mt-5'>
                                    <div className='product-category'>
                                        <h1>{category.name_jp} - </h1>
                                        <h1>{category.name_vn}</h1>
                                    </div>
                                    <div className='product-content'>
                                        <span className='product-content__detail'>{category.detail}</span>
                                    </div>
                                    <div className="grid__row">
                                        {
                                            category.products?.map((product, index) => (
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
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                    
                )
            }
        </div>

    )
}

export default PageAi

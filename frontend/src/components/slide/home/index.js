import React from 'react';
import { Carousel } from 'react-bootstrap';
import './slide.scss'

function Slide(props) {
    const items = [
        { title: '', image: process.env.REACT_APP_API_URL + 'images/slide-home/bonsai002.png' },
        { title: '', image: process.env.REACT_APP_API_URL + 'images/slide-home/2.png'  },
        // { title: '', image:  process.env.REACT_APP_API_URL + 'images/slide-home/3.png' },
    ];
    return (
        <div>
            <Carousel interval={3000} >
                {
                    items.map((item, index) => (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100" src={item.image} alt={item.title} />
                        <Carousel.Caption>
                            <h3>{item.title}</h3>
                        </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </div>
    );
}

export default Slide;
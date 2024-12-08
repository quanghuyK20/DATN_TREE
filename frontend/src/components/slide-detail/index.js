import React from 'react';
import Slider from 'react-slick';
import './slide-detail.scss'

const ProductDetailSlider = ({ images }) => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'product-detail-slider',
  };

  const items = [
    { title: 'First item', image: 'https://cf.shopee.vn/file/97b6cdf5f12532ad47859760ef81afe0' },
    { title: 'Second item', image: 'https://static.wehaacdn.com/local-tribtown-com/imgs/media-images/2884/images/2885.jpg' },
    { title: 'Third item', image: 'https://chothuecaycanh.info/wp-content/uploads/2018/11/banner-blog.png' },
];

  return (
    <Slider {...settings}>
      <div>
        <img src={'https://cf.shopee.vn/file/97b6cdf5f12532ad47859760ef81afe0'} alt="Product" />
      </div>
      <div>
        <img src={'https://cf.shopee.vn/file/97b6cdf5f12532ad47859760ef81afe0'} alt="Product" />
      </div>
      <div>
        <img src={'https://cf.shopee.vn/file/97b6cdf5f12532ad47859760ef81afe0'} alt="Product" />
      </div>
      <div>
        <img src={'https://cf.shopee.vn/file/97b6cdf5f12532ad47859760ef81afe0'} alt="Product" />
      </div>
      <div>
        <img src={'https://cf.shopee.vn/file/97b6cdf5f12532ad47859760ef81afe0'} alt="Product" />
      </div>
    </Slider>
  );
};

export default ProductDetailSlider;

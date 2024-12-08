import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-bootstrap';
import './modal-detail.scss'

function ModalDetail(props) {
  return (
    <Modal {...props} size="xl" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-md-6'>
            <div className='text-center fs-1'>{props.productName}</div>
            <Carousel interval={3000}>
              {props.imgList?.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="product-detail__slide"
                    src={process.env.REACT_APP_API_URL + item}
                    alt="product-detail"
                  />
                  <Carousel.Caption>
                    <h3>{index}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className='col-md-6'>
            {props.imgList?.map((item, index) => (
              <img
                key={index}
                className='product-detail__modal__img'
                src={process.env.REACT_APP_API_URL + item}
                alt='product-detail'
              />
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDetail;


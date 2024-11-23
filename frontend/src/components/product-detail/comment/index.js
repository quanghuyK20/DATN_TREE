import React from 'react';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import './comment.scss';



function Comment(props) {
  return (
    <div>
      {props.feedbacks?.map((feedback, index) => (
        <div key={index} className="row mt-3 d-flex">
          <img
            className="product-detail__cmt__logo col-md-2"
            src={process.env.REACT_APP_API_URL + feedback.avatar}
          />
          <div className="product-detail__cmt__info  col-md-8">
            <div className="product-detail__cmt__info__title">{feedback.username}</div>
            <div className="product-detail__cmt__info__btn">
              {[...Array(feedback.star)].map((_, index) => (
                <StarOutlined key={index} className="product-detail__cmt__rating-icon" />
              ))}
            </div>
            <div className="mt-1">{feedback.time_created}</div>
            <div className="mt-1 lead">{feedback.content}</div>
            <div className="d-flex mt-1">
              <img
                className="product-detail__cmt__img"
                src={process.env.REACT_APP_API_URL + feedback.img}
              />
            </div>
            <div className="d-flex mt-1">
              <LikeOutlined className="product-detail__cmt__like" />
              <div>7</div>
            </div>
          </div>
          <div className="wrapper mt-5">
            <div className="bootstrap-line"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;

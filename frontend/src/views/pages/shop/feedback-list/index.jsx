import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Input, Menu, Dropdown, Space, Modal } from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import productApi from "api/productApi";
import useAuth from "hooks/useAuth";
import "./feedback-list.scss";
import "../../../../index.scss";
import feedbackApi from "api/feedbackApi";

const { Search } = Input;
const numOfItem = [10, 15, 25];

function FeedbackList() {
  const { user } = useAuth();
  const [feedbackList, setFeedbackList] = useState([]);
  const [total, setTotal] = useState(0);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState();

  const defaultParams = {
    limit: 10,
    page: 1,
    txt_search: null,
    star: null,
    store_id: user.store_id,
  };
  const [params, setParams] = useState(defaultParams);

  const handleSubmit = async () => {
    try {
      const response = await feedbackApi.deleteById(deleteProduct.id);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setShowDeleteProductModal(false);
  };

  const state = {
    pagination: {
      pageSize: params.limit,
      total: total,
      onChange: (page, pageSize) => {
        setParams({
          ...params,
          limit: pageSize,
          page: page,
        });
      },
    },
  };

  useEffect(() => {
    if (!!user) {
      feedbackApi.getAllByShop(params).then((response) => {
        setTotal(response.data.total);
        setFeedbackList(
          response.data.data.map((feedback) => ({
            id: feedback.id,
            user_name: feedback.user_name,
            user_email: feedback.user_email,
            product_name: feedback.product_name,
            feedback_img: feedback.feedback_img,
            star: feedback.star,
            content: feedback.content,
          }))
        );
      });
    }
  }, [params]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "feedback_img",
      width: "8%",
      render: (text, record) => {
        let imgSource = process.env.REACT_APP_API_URL + record.feedback_img;
        return <img src={imgSource} className="avatar-user" alt="image" />;
      },
    },
    {
      title: "Người đánh giá",
      dataIndex: "user_name",
      width: "10%",
    },
    {
      title: "Email đánh giá",
      dataIndex: "user_email",
      width: "20%",
    },
    {
      title: "Sản phẩm đánh giá",
      dataIndex: "product_name",
      width: "15%",
    },
    {
      title: "Star",
      dataIndex: "star",
      width: "5%",
    },
    {
      title: "Mô tả",
      dataIndex: "content",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/feedbacks/edit/${record.id}`}>
            <EditOutlined className="icon-edit" />
          </Link>
          <DeleteOutlined
            onClick={() => {
              setShowDeleteProductModal(true);
              setDeleteProduct(record);
            }}
            className="icon-delete"
          />
        </Space>
      ),
    },
  ];

  const menu = () => {
    return (
      <Menu className="product-list-menu">
        <div className="product-list-menu__item">
          <div className="product-list-menu__item__row">
            <span className="product-list-menu__item__row__span">Đánh giá</span>
            <select
              className="product-list-menu__item__row__select"
              onChange={(e) => {
                e.target.value === "All"
                  ? setParams({ ...params, star: null })
                  : setParams({
                      ...params,
                      star: e.target.value,
                    });
              }}
            >
              <option key={0} value={"All"}>
                All
              </option>
              <option key={1} value={0}>
                0
              </option>
              <option key={1} value={1}>
                1
              </option>
              <option key={2} value={2}>
                2
              </option>
              <option key={3} value={3}>
                3
              </option>
              <option key={4} value={4}>
                4
              </option>
              <option key={5} value={5}>
                5
              </option>
            </select>
          </div>
        </div>
      </Menu>
    );
  };

  return (
    <div>
      <div className="title">Danh sách đánh giá</div>
      <div className="product-list-content__action">
        <div className="product-list-content__action__select">
          <span className="product-list-content__action__span">Hiển thị </span>
          <select
            defaultValue={{ value: params.pageSize }}
            onChange={(e) => setParams({ ...params, limit: e.target.value })}
          >
            {numOfItem.map((numOfItem, index) => {
              return (
                <option key={index} value={numOfItem}>
                  {numOfItem}
                </option>
              );
            })}
          </select>
        </div>
        <Dropdown overlay={menu} trigger="click" placement="bottom">
          <div
            className={
              params.star !== null
                ? "product-list-content__action__filter-active"
                : "product-list-content__action__filter-unactive"
            }
          >
            <FilterOutlined />
          </div>
        </Dropdown>

        <div className="product-list-content__action__search">
          <Search
            className="search-box"
            placeholder="tên, email, sản phẩm người đánh giá"
            onChange={(e) =>
              setParams({
                ...params,
                txt_search: e.target.value,
              })
            }
            allowClear
            suffix
          />
          <SearchOutlined className="product-list-content__action__search__icon" />
        </div>
        <Link
          className="product-list-content__action__add"
          to="/admin/feedbacks/add"
        >
          <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
          <span>Thêm feedback</span>
        </Link>
      </div>

      <div className="product-list-content__sub">
        <Table
          className="product-list-content__sub__table"
          columns={columns}
          dataSource={feedbackList}
          pagination={state.pagination}
          scroll={{
            y: "50vh",
          }}
        ></Table>
      </div>
      <Modal
        className="delete-account-modal"
        title="Xóa đánh giá"
        visible={showDeleteProductModal}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <p>Bạn có chắn chắn muốn xóa đánh giá hay không ?</p>
      </Modal>
    </div>
  );
}

export default FeedbackList;

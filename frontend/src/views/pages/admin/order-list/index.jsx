import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Input, Menu, Dropdown, Space, Modal, DatePicker } from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import productApi from "api/productApi";
import useAuth from "hooks/useAuth";
import "./order-list.scss";
import "../../../../index.scss";
import storeApi from "api/storeApi";
import productCategoryApi from "api/productCategoryApi";
import orderApi from "api/orderApi";

const { Search } = Input;
const numOfItem = [10, 15, 25];

function OrderList() {
  const { user } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState();
  const [storeList, setStoreList] = useState([]);
  const [productCategoryList, setProductCategoryList] = useState([]);

  const defaultParams = {
    limit: 10,
    page: 1,
    txt_search: null,
    is_deleted: null,
    store_id: null,
    category_id: null,
  };
  const [params, setParams] = useState(defaultParams);

  const handleSubmit = async () => {
    try {
      const response = await productApi.softDeleteById(deleteProduct.id);
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
      orderApi.getAllByAdmin(params).then((response) => {
        console.log(response.data.total);
        setTotal(response.data.total);
        setOrderList(
          response.data.data.map((order) => ({
            id: order.id,
            avatar: order.avatar,
            user_name: order.user_name,
            product_name: order.product_name,
            transport_name: order.transport_name,
            receiver_name: order.receiver_name,
            order_date: order.order_date,
            price: order.price,
            status: order.status,
          }))
        );
      });
    }
  }, [params]);

  useEffect(() => {
    storeApi.getStores().then((response) => {
      setStoreList(response.data[0]);
    });
  }, [params]);

  useEffect(() => {
    productCategoryApi.getProductCategories().then((response) => {
      setProductCategoryList(response.data[0]);
    });
  }, [params]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: "8%",
      render: (text, record) => {
        let imgSource = process.env.REACT_APP_API_URL + record.avatar;
        return <img src={imgSource} className="avatar-user" alt="image" />;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "user_name",
      width: "10%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      width: "10%",
    },
    {
      title: "Đơn vị giao hàng",
      dataIndex: "transport_name",
      width: "10%",
    },
    {
      title: "Người nhận hàng",
      dataIndex: "receiver_name",
      width: "10%",
    },
    {
      title: "Thời gian order",
      dataIndex: "order_date",
      width: "10%",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      render: (text, record) => (
        <span
          className={record.status === "Đã bán" ? "span-red" : "span-green"}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/products/edit/${record.id}`}>
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
            <span className="product-list-menu__item__row__span">
              Đơn vị vận chuyển
            </span>
            <select
              className="product-list-menu__item__row__select"
              onChange={(e) => {
                e.target.value === "All"
                  ? setParams({ ...params, is_deleted: null })
                  : setParams({
                      ...params,
                      is_deleted: e.target.value,
                    });
              }}
            >
              <option key={0} value={"All"}>
                All
              </option>
              <option key={1} value={0}>
                Chưa bán
              </option>
              <option key={2} value={1}>
                Đã bán
              </option>
            </select>
          </div>

          <div className="product-list-menu__item__row">
            <span className="product-list-menu__item__row__span">
              Trạng thái
            </span>
            <select
              className="product-list-menu__item__row__select"
              onChange={(e) => {
                e.target.value === "All"
                  ? setParams({ ...params, store_id: null })
                  : setParams({
                      ...params,
                      store_id: e.target.value,
                    });
              }}
            >
              <option value="All">All</option>
              {storeList?.map((store, index) => (
                <option key={index} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border-bottom">Thời gian order</div>
          <div className="product-list-menu__item__row">
            <span className="product-list-menu__item__row__span">Từ ngày</span>
            <DatePicker
              size="medium"
              className="input-datePicker"
              onChange={(date, dateString) =>
                setParams({
                  ...params,
                  from_date: dateString,
                })
              }
            />
          </div>
          <div className="product-list-menu__item__row">
            <span className="product-list-menu__item__row__span">Đến ngày</span>
            <DatePicker
              size="medium"
              className="input-datePicker"
              onChange={(date, dateString) =>
                setParams({
                  ...params,
                  to_date: dateString,
                })
              }
            />
          </div>
        </div>
      </Menu>
    );
  };

  return (
    <div>
      <div className="title">Danh sách order</div>
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
              params.is_deleted !== null ||
              params.store_id !== null ||
              params.category_id !== null
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
            placeholder="Tên cây, giá thành, mô tả"
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
          to="/admin/products/add"
        >
          <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
          <span>Thêm sản phẩm</span>
        </Link>
      </div>

      <div className="product-list-content__sub">
        <Table
          className="product-list-content__sub__table"
          columns={columns}
          dataSource={orderList}
          pagination={state.pagination}
          scroll={{
            y: "50vh",
          }}
        ></Table>
      </div>
      <Modal
        className="delete-account-modal"
        title="Xóa sản phẩm"
        visible={showDeleteProductModal}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <p>Bạn có chắn chắn muốn xóa sản phẩm hay không ?</p>
      </Modal>
    </div>
  );
}

export default OrderList;

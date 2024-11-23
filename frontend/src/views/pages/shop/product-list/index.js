import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'
import productApi from 'api/productApi'
import useAuth from 'hooks/useAuth'
import './product-list.scss'
import '../../../../index.scss'
import productCategoryApi from 'api/productCategoryApi'

const { Search } = Input
const numOfItem = [10, 15, 25]

function ProductList() {
    const { user } = useAuth()
    const [productList, setProductList] = useState([])
    const [total, setTotal] = useState(0)
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState()
    const [productCategoryList, setProductCategoryList] = useState([])


    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        is_deleted: null,
        store_id: user.store_id,
        category_id: null
    }
    const [params, setParams] = useState(defaultParams)

    const handleSubmit = async () => {
        try {
            const response = await productApi.deleteProductByOwner(deleteProduct.id)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error)
        }
    }

    const handleCancel = () => {
        setShowDeleteProductModal(false)
    }

    const state = {
        pagination: {
            pageSize: params.limit,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    ...params,
                    limit: pageSize,
                    page: page,
                })
            },
        },
    }
    useEffect(() => {
        if (!!user) {
            productApi.getAllByAdmin(params).then((response) => {
                setTotal(response.data.total)
                setProductList(response.data.data.map((product) => ({
                    id: product.id,
                    avatar: product.img,
                    name: product.product_name,
                    price: product.price,
                    category_id: product.name_vn,
                    store_id: product.store_name,
                    desc: product.desc,
                    deleted_at: product.deleted_at ? 'Đã bán' : 'Chưa bán',
                })))
            })
        }
    }, [params,user])

    useEffect(()=>{
        productCategoryApi.getProductCategories().then((response) => {
            setProductCategoryList(response.data[0])
        })
    }, [params,user])


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '8%',
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar
                return (
                    <img
                        src={imgSource}
                        className="avatar-user"
                        alt="image"
                    />
                )
            },
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            width: '10%',
        },
        {
            title: 'Giá thành',
            dataIndex: 'price',
            width: '10%',
        },
        {
            title: 'Dáng cây',
            dataIndex: 'category_id',
            width: '15%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'desc',
            width: '20%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'deleted_at',
            width: '10%',
            render: (text, record) => (
                <span
                    className={
                        record.deleted_at === 'Đã bán'
                            ? 'span-red'
                            : 'span-green'
                    }
                >
                    {record.deleted_at}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/seller/products/edit/${record.id}`}>
                        <EditOutlined className="icon-edit" />
                    </Link>
                    <DeleteOutlined
                        onClick={() => {
                            setShowDeleteProductModal(true)
                            setDeleteProduct(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        }
    ]

    const menu = () => {
        return (
            <Menu className="product-list-menu">
                <div className="product-list-menu__item">

                    <div className="product-list-menu__item__row">
                        <span className="product-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="product-list-menu__item__row__select"
                            onChange={(e) => {
                                e.target.value === 'All'
                                    ? setParams({ ...params, is_deleted: null })
                                    : setParams({
                                        ...params,
                                        is_deleted: e.target.value,
                                    })
                            }}
                        >
                            <option key={0} value={'All'}>
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
                            Dáng cây
                        </span>
                        <select
                            className="product-list-menu__item__row__select"
                            onChange={(e) => {
                                e.target.value === 'All'
                                    ? setParams({ ...params, category_id: null })
                                    : setParams({
                                        ...params,
                                        category_id: e.target.value,
                                    });
                            }}
                        >
                            <option value="All">All</option>
                            {productCategoryList?.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name_vn}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </Menu>
        )
    }


    return (
        <div>
            <div className="title">Danh sách sản phẩm</div>
            <div className="product-list-content__action">
                <div className="product-list-content__action__select">
                    <span className='product-list-content__action__span'>Hiển thị </span>
                    <select
                        defaultValue={{ value: params.pageSize }}
                        onChange={(e) =>
                            setParams({ ...params, limit: e.target.value })
                        }
                    >
                        {numOfItem.map((numOfItem, index) => {
                            return (
                                <option key={index} value={numOfItem}>
                                    {numOfItem}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <Dropdown overlay={menu} trigger="click" placement="bottom">
                    <div
                        className={
                            params.is_deleted !== null || params.category_id !== null
                                ? 'product-list-content__action__filter-active'
                                : 'product-list-content__action__filter-unactive'
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
                    to="/seller/products/add"
                >
                    <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                    <span>Products</span>
                </Link>
            </div>

            <div className="product-list-content__sub">
                <Table
                    className="product-list-content__sub__table"
                    columns={columns}
                    dataSource={productList}
                    pagination={state.pagination}
                    scroll={{
                        y: '50vh',
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
    )
}

export default ProductList

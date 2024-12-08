import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthenticatedRoute from './authenticated-route';
import Login from 'views/pages/login';
import Register from 'views/pages/register';
import NotFound from 'views/pages/404-not-found';
import Home from 'views/pages/home';
import Cart from 'views/pages/cart';
import ProductDetail from 'views/pages/product-detail';
import Profile from 'views/pages/profile';
import PageAi from 'views/pages/page-ai';
import LayoutCustomer from 'components/layouts/customer/layout-customer';
import LayoutAdmin from 'components/layouts/admin/layout-admin';
import Store from 'views/pages/store';
import UserList from 'views/pages/admin/user-list';
import FeedbackList from 'views/pages/admin/feedback-list';
import AddAcountAdmin from 'views/pages/admin/user-list/add';
import EditAcountAdmin from 'views/pages/admin/user-list/edit'
import ProductListAdmin from 'views/pages/admin/product-list';
import AddProductAdmin from 'views/pages/admin/product-list/add';
import EditProductAdmin from 'views/pages/admin/product-list/edit';
import GuestRoute from './guest-route';
import EditFeedback from 'views/pages/admin/feedback-list/edit';
import AddFeedback from 'views/pages/admin/feedback-list/add';
import OrderList from 'views/pages/admin/order-list';
import Messenger from 'views/pages/messenger/Messenger';

import ProductListShop from 'views/pages/shop/product-list';
import AddProductShop from 'views/pages/shop/product-list/add';
import EditProductShop from 'views/pages/shop/product-list/edit'

import OrderListShop from 'views/pages/shop/order-list';
import FeedbackListShop from 'views/pages/shop/feedback-list';

import VoucherListShop from 'views/pages/shop/voucher-list';
import AddVoucherShop from 'views/pages/shop/voucher-list/add';
import EditVoucherShop from 'views/pages/shop/voucher-list/edit';
import Payment from 'views/pages/payment';
import SearchHome from 'views/pages/search-home'
import Purchase from 'views/pages/user/purchase';
import LayoutUser from 'components/layouts/user/layout-user';
import Account from 'views/pages/user/account';
import Onboarding from 'views/pages/onboarding';
import OnboardForm from 'views/pages/onboarding/form';
import LayoutOnboard from 'components/layouts/onboarding/layout-onboard';
import OnboardVerify from 'views/pages/onboarding/verify';
import VerifyList from 'views/pages/admin/verify-list';
import StoreList from 'views/pages/admin/store-list';
import ShippingUnitList from 'views/pages/admin/shippingunit-list';
import VerifyShipperList from 'views/pages/shipping-unit/verify-list';
import ShipperSUList from 'views/pages/shipping-unit/shipper-list';
import ShipperList from 'views/pages/admin/shipper-list';
import OrderListShippingUnit from 'views/pages/shipping-unit/order-list';
import OrderListShipper from 'views/pages/shipper/order-list';
const availableRoles = [1, 2, 3, 4, 5];
function AllRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<LayoutCustomer component={Home}/>} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/product-detail/:id" element={<LayoutCustomer component={ProductDetail}/>} />
            <Route path="/home" element={<LayoutCustomer component={Home}/>} />
            <Route path="/stores/:id" element={<LayoutCustomer component={Store}/>} />
            <Route path="/search/:params" element={<LayoutCustomer component={SearchHome}/>}/>
            <Route path="/onboarding" element={<LayoutOnboard component={Onboarding}/>} />
            <Route path="/onboarding/form" element={<LayoutOnboard component={OnboardForm}/>} />
            <Route path="/onboarding/verify" element={<LayoutOnboard component={OnboardVerify}/>} />

            <Route path="/" element={<LayoutCustomer component={Home}/>} />
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<LayoutCustomer component={Home}/>} />
            </Route>

            <Route
                element={<AuthenticatedRoute acceptedRoles={availableRoles} />}
            >
                {/* Customer */}
                <Route path="/search/:params" element={<LayoutCustomer component={SearchHome}/>}/>
                <Route path="/cart" element={<LayoutCustomer component={Cart}/>} />
                <Route path="/payment" element={<LayoutCustomer component={Payment}/>} />
                <Route path="/detect-img" element={<LayoutCustomer component={PageAi}/>} />
                <Route path="/profile" element={<LayoutCustomer component={Profile}/>} />

                <Route path="/user/purchase" element={<LayoutUser component={Purchase}/>} />
                <Route path="/user/account" element={<LayoutUser component={Account}/>} />
                
                {/* Admin */}
                <Route path="/admin/accounts" element={<LayoutAdmin component={UserList}/>} />
                <Route path="/admin/accounts/add" element={<LayoutAdmin component={AddAcountAdmin}/>} />
                <Route path="/admin/accounts/edit/:id" element={<LayoutAdmin component={EditAcountAdmin}/>} />

                <Route path="/admin/products" element={<LayoutAdmin component={ProductListAdmin}/>} />
                <Route path="/admin/products/add" element={<LayoutAdmin component={AddProductAdmin}/>} />
                <Route path="/admin/products/edit/:id" element={<LayoutAdmin component={EditProductAdmin}/>} />

                <Route path="/admin/feedbacks" element={<LayoutAdmin component={FeedbackList}/>} />
                <Route path="/admin/feedbacks/add" element={<LayoutAdmin component={AddFeedback}/>} />
                <Route path="/admin/feedbacks/edit/:id" element={<LayoutAdmin component={EditFeedback}/>} />

                <Route path="/admin/verify-request" element={<LayoutAdmin component={VerifyList}/>} />

                <Route path="/admin/stores" element={<LayoutAdmin component={StoreList}/>} />
                <Route path="/admin/shipping-units" element={<LayoutAdmin component={ShippingUnitList}/>} />
                <Route path="/admin/shippers" element={<LayoutAdmin component={ShipperList}/>} />
                
                <Route path="/admin/orders" element={<LayoutAdmin component={OrderList}/>} />

                {/* Seller */}
                <Route path="/seller/products" element={<LayoutAdmin component={ProductListShop}/>} />
                <Route path="/seller/products/add" element={<LayoutAdmin component={AddProductShop}/>} />
                <Route path="/seller/products/edit/:id" element={<LayoutAdmin component={EditProductShop}/>} />
                <Route path="/seller/orders" element={<LayoutAdmin component={OrderListShop}/>} />
                <Route path="/seller/feedbacks" element={<LayoutAdmin component={FeedbackListShop}/>} />
                <Route path="/seller/vouchers" element={<LayoutAdmin component={VoucherListShop}/>} />
                <Route path="/seller/vouchers/add" element={<LayoutAdmin component={AddVoucherShop}/>} />
                <Route path="/seller/vouchers/edit/:id" element={<LayoutAdmin component={EditVoucherShop}/>} />
                <Route path="/seller/messengers" element={<Messenger/>} />

                {/* Shipping Unit */}
                <Route path="/shipping-unit/shipper" element={<LayoutAdmin component={ShipperSUList}/>} />
                <Route path="/shipping-unit/verify" element={<LayoutAdmin component={VerifyShipperList}/>} />
                <Route path="/shipping-unit/orders" element={<LayoutAdmin component={OrderListShippingUnit}/>} />
                
                {/* Shipper */}
                <Route path="/shipper/orders" element={<LayoutAdmin component={OrderListShipper}/>} />

            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
export default AllRoutes

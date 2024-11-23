import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as type from '../types.js';
import productApi from 'api/productApi.js';
import productCartApi from 'api/productCartApi.js';
import storeApi from 'api/storeApi.js';
import voucherApi from 'api/voucherApi.js';
import feedbackApi from 'api/feedbackApi.js';
import userVoucherApi from 'api/userVoucherApi.js';
import orderApi from 'api/orderApi.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getProductDetailSaga(action) {
    try {
        const response = yield call(productApi.getProductById, action.payload)
        yield put({ type: type.GET_PRODUCT_DETAIL_SUCCESS, product: response })
    } catch (e) {
        yield put({ type: type.GET_PRODUCT_DETAIL_FAILED, message: e.message })
    }
}

function* getProductsSaga(action) {
    try {
        const response = yield call(productApi.getProducts)
        yield put({ type: type.GET_PRODUCTS_SUCCESS, products: response })
    } catch (e) {
        yield put({ type: type.GET_PRODUCTS_FAILED, message: e.message })
    }
}

function* getProductsCartByUserSaga(action){
    try {
        const response = yield call(productCartApi.getProductsCartByUser)
        yield put({ type: type.GET_PRODUCTS_CART_BY_USER_SUCCESS, products: response.data[0] })
    } catch (e) {
        yield put({ type: type.GET_PRODUCTS_CART_BY_USER_FAILED, message: e.message })
    }
}

function* getStoresSaga(action){
    try{
        const response = yield call(storeApi.getStores)
        yield put({ type: type.GET_STORES_SUCCESS, stores: response.data[0]})
    }catch(e){
        yield put({ type: type.GET_STORES_FAILED, message: e.message})
    }
}

function* getProductsByStoreIdSaga(action){
    try{
        const response = yield call(productApi.getProductByStoreId, action.payload)
        yield put({ type: type.GET_PRODUCTS_BY_STORE_ID_SUCCESS, stores: response.data})
    }catch(e){
        yield put({ type: type.GET_PRODUCTS_BY_STORE_ID_FAILED, message: e.message})
    }
}

function* getStoreInfoByIdSaga(action){
    try{
        const response = yield call(storeApi.getStoreInfoById, action.payload)
        yield put({ type: type.GET_STOREINFO_BY_ID_SUCCESS, stores: response.data})
    }catch(e){
        yield put({ type: type.GET_STOREINFO_BY_ID_FAILED, message: e.message})
    }
}

function* getVourcherByStoreIdSaga(action){
    try{
        const response = yield call(voucherApi.getVoucherByStoreId, action.payload)
        yield put({ type: type.GET_VOUCHER_BY_STORE_ID_SUCCESS, voucher: response.data})
    }catch(e){
        yield put({ type: type.GET_VOUCHER_BY_STORE_ID_FAILED, message: e.message})
    }
}

function* getFeedbacksByProductIdSaga(action){
    try{
        const response = yield call(feedbackApi.getFeedbacksByProductId, action.payload)
        yield put({ type: type.GET_FEEDBACK_BY_PRODUCT_ID_SUCCESS, feedbacks: response.data})
    }catch(e){
        yield put({ type: type.GET_FEEDBACK_BY_PRODUCT_ID_FAILED, message: e.message})
    }
}

function* getProductsCartBySelectedSaga(action){
    yield put({ type: type.GET_PRODUCTS_CART_SELECTED_SEND, products: action.payload})
}

function* getProductsByParamsSaga(action){
    try{
        const response = yield call(productApi.getProductsByParams, action.payload)
        yield put({ type: type.GET_PRODUCTS_BY_PARAMS_SUCCESS, products: response.data})
    }catch(e){
        yield put({ type: type.GET_PRODUCTS_BY_PARAMS_FAILED, message: e.message})
    }
}

function* saveVoucherByUser(action){
    try{
        // yield put({ type: type.SAVE_VOUCHER_BY_USER_REQUEST})
        const response = yield call(userVoucherApi.createNew, action.payload)
        yield put({ type: type.SAVE_VOUCHER_BY_USER_SUCCESS, voucher: response.data})
    }catch(e){
        console.log(e);
        yield put({ type: type.SAVE_VOUCHER_BY_USER_FAILED, message: e.response.data.message})
    }
}

function* postOrderSaga(action){
    try{
        const response = yield call(orderApi.createOrder, action.payload);
        yield put({type: type.POST_ORDER_SUCCESS, order: response.data})
    }catch(e){
        yield put({type: type.POST_ORDER_FAILED, message: e.response.data.message})
    }
}

function* addProductToCartSaga(action){
    try{
        const response = yield call(productCartApi.addProductToCart, action.payload);
        console.log("addProductToCartSaga",response);
        yield put({type: type.ADD_PRODUCTS_TO_CART_SUCCESS, cart: response.data})
    }catch(e){
        yield put({type: type.ADD_PRODUCTS_TO_CART_FAILED, message: e.response.data.message})
    }
}


function* mySaga() {
    //Product
    yield takeEvery(type.GET_PRODUCTS_REQUEST, getProductsSaga)
    yield takeEvery(type.GET_PRODUCT_DETAIL_REQUEST, getProductDetailSaga)
    yield takeEvery(type.GET_PRODUCTS_BY_STORE_ID_REQUEST,getProductsByStoreIdSaga)
    yield takeEvery(type.GET_PRODUCTS_BY_PARAMS_REQUEST,getProductsByParamsSaga)

    //Cart
    yield takeEvery(type.GET_PRODUCTS_CART_BY_USER_REQUEST, getProductsCartByUserSaga)
    yield takeEvery(type.GET_PRODUCTS_CART_SELECTED_SEND, getProductsCartBySelectedSaga)
    yield takeEvery(type.ADD_PRODUCTS_TO_CART_REQUEST, addProductToCartSaga)

    //Store
    yield takeEvery(type.GET_STORES_REQUEST, getStoresSaga)
    yield takeEvery(type.GET_STOREINFO_BY_ID_REQUEST, getStoreInfoByIdSaga)

    //Vourcher
    yield takeEvery(type.GET_VOUCHER_BY_STORE_ID_REQUEST, getVourcherByStoreIdSaga)

    yield takeEvery(type.SAVE_VOUCHER_BY_USER_REQUEST, saveVoucherByUser)

    //feedback
    yield takeEvery(type.GET_FEEDBACK_BY_PRODUCT_ID_REQUEST, getFeedbacksByProductIdSaga)

    //payment
    yield takeEvery(type.POST_ORDER_REQUEST, postOrderSaga);
    
}

export default mySaga
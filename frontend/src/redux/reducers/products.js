import * as type from '../types.js';
import updateObject from 'redux/updateObject.js';

const initialState = {
  products: {
    isLoading: true,
    data: [],
    err: null,
  },
  productDetail: {
    isLoading: true,
    data: {},
    err: null,
  },

}

const initStateProductsByStoreId = {
  productsByStoreId:{
    isLoading: true,
    data:[],
    err:null
  }
}

const initStateProductsByParams = {
  productsByParams:{
    isLoading: true,
    data:[],
    err:null
  }
}

function products(state = initialState, action) {
  switch (action.type) {
    case type.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: {
          data: action.product.data[0],
          isLoading: false,
        }
      }
    case type.GET_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        productDetail: {
          data: {},
          isLoading: true,
        }
      }
    case type.GET_PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        productDetail: {
          data: {},
          isLoading: false,
          err: action.message
        }
      }
    
    case type.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          isLoading: false,
          data: action.products.data[0]
        }
      }
    case type.GET_PRODUCTS_REQUEST:
        return {
          ...state,
          products: {
            isLoading: true,
            data: []
          }
        }
    case type.GET_PRODUCTS_FAILED:
      return {
        ...state,
        products: {
          isLoading: false,
          data: [],
          err: action.message
        }
      }
    default:
      return state
  }
}

function productsByStoreId(state = initStateProductsByStoreId, action) {
  switch (action.type) {
    case type.GET_PRODUCTS_BY_STORE_ID_SUCCESS:
      return {
        ...state,
        productsByStoreId:{
          isLoading: false,
          data:action.stores,
        }
      }
    case type.GET_PRODUCTS_BY_STORE_ID_REQUEST:
      return {
        ...state,
        productsByStoreId:{
          isLoading: true,
          data:[],
        }
      }
    case type.GET_PRODUCTS_BY_STORE_ID_FAILED:
      return {
        ...state,
        productsByStoreId:{
          isLoading: false,
          data: [],
          err: action.message
        }
      }
    default:
      return state
  } 
}

function productsByParams(state = initStateProductsByParams, action) {
  switch (action.type) {
    case type.GET_PRODUCTS_BY_PARAMS_SUCCESS:
      return {
        ...state,
        productsByParams:{
          isLoading: false,
          data:action.products,
        }
      }
    case type.GET_PRODUCTS_BY_PARAMS_REQUEST:
      return {
        ...state,
        productsByParams:{
          isLoading: true,
          data:[],
        }
      }
    case type.GET_PRODUCTS_BY_PARAMS_FAILED:
      return {
        ...state,
        productsByParams:{
          isLoading: false,
          data: [],
          err: action.message
        }
      }
    default:
      return state
  } 
}

export {
  products,
  productsByStoreId,
  productsByParams
}
import * as type from '../types';

export function getProductDetail(productId) {
  return { 
    type: type.GET_PRODUCT_DETAIL_REQUEST,
    payload: productId,
  }
}

export function getProducts(){
  return {
    type: type.GET_PRODUCTS_REQUEST,
    payload: null
  }
}

export function getProductByStoreId(storeId) {
  return {
    type: type.GET_PRODUCTS_BY_STORE_ID_REQUEST,
    payload: storeId
  }
}

export function getProductsByParams(params){
  return {
    type: type.GET_PRODUCTS_BY_PARAMS_REQUEST,
    payload: params
  }
}

// export function getProducts(products){
//   return {
//     type: type.GET_PRODUCTS,
//     payload: products
//   }
// }

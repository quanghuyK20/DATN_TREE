import * as type from '../types';

export function getStores() {
  return { 
    type: type.GET_STORES_REQUEST,
    payload: null,
  }
}

export function getStoreInfoById(storeId) {
  return {
    type: type.GET_STOREINFO_BY_ID_REQUEST,
    payload: storeId
  }
}
import * as type from '../types.js';

const initStateStore = {
    stores: {
      isLoading: true,
      data: [],
      err: null,
    },
}

const initialStateStoreInfo = {
  storeInfoById: {
    isLoading: true,
    data: {},
    err: null
  }
}

function stores(state = initStateStore, action) {
    switch (action.type) {
        case type.GET_STORES_SUCCESS:
        return {
          ...state,
          stores: {
            data: action.stores,
            isLoading: false,
          }
        }
      case type.GET_STORES_REQUEST:
        return {
          ...state,
          stores: {
            data: [],
            isLoading: true,
          }
        }
      case type.GET_STORES_FAILED:
        return {
          ...state,
          stores: {
            data: [],
            isLoading: false,
            err: action.message
          }
        }
      default:
        return state
    }
}

function storeInfoById(state = initialStateStoreInfo, action) {
  switch (action.type) {
      case type.GET_STOREINFO_BY_ID_SUCCESS:
      return {
        ...state,
        storeInfoById: {
          data: action.stores,
          isLoading: false,
        }
      }
    case type.GET_STOREINFO_BY_ID_REQUEST:
      return {
        ...state,
        storeInfoById: {
          data: {},
          isLoading: true,
        }
      }
    case type.GET_STOREINFO_BY_ID_FAILED:
      return {
        ...state,
        storeInfoById: {
          data: {},
          isLoading: false,
          err: action.message
        }
      }
    default:
      return state
  }
}

export {
  stores,
  storeInfoById
} ;
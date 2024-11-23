import * as type from '../types';

export function getFeedbacksByProductId(product_id) {
  return { 
    type: type.GET_FEEDBACK_BY_PRODUCT_ID_REQUEST,
    payload: product_id,
  }
}


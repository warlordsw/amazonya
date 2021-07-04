import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

export const initialState = {
  products: [],
  product: {},
  loading: true,
  error: null,
}
export const productListReducer = (initialState, action) => {
  //console.log(initialState, action)
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...initialState, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { ...initialState, loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { ...initialState, loading: false, error: action.payload }
    case PRODUCT_DETAILS_REQUEST:
      return { ...initialState, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { ...initialState, loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { ...initialState, loading: false, error: action.payload }
    default:
      return { ...initialState }
  }
}

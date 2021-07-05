import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
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
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
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
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = initialState.cartItems.find(
        (x) => x.product === item.product
      )
      if (existItem) {
        return {
          ...initialState,
          cartItems: initialState.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return { ...initialState, cartItems: [...initialState.cartItems, item] }
      }
    case CART_REMOVE_ITEM:
      return {
        ...initialState,
        cartItems: initialState.cartItems.filter(
          (x) => x.product !== action.payload
        ),
      }

    default:
      return { ...initialState }
  }
}

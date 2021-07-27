import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constants/userConstants'

export const initialState = {
  products: [],
  product: {},
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  loading: false,
  error: null,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
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
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...initialState,
        shippingAddress: action.payload,
      }
    case USER_SIGNIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      }
    case USER_SIGNIN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        userInfo: action.payload,
        error: null,
      }
    case USER_SIGNIN_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      }
    case USER_SIGNOUT:
      return {
        ...initialState,
        userInfo: null,
        error: null,
      }

    case USER_REGISTER_REQUEST:
      return {
        ...initialState,
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        userInfo: action.payload,
        error: null,
      }
    case USER_REGISTER_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      }

    default:
      return { ...initialState }
  }
}

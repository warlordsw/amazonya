import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants'
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
    : { fullName: '', address: '', city: '', postalCode: '', country: '' },
  loading: false,
  error: null,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  paymentMethod: 'Paypal',
  order: localStorage.getItem('orderItems')
    ? JSON.parse(localStorage.getItem('orderItems'))
    : {},
  success: false,
}
export const productListReducer = (initialState, action) => {
  //console.log(initialState, action)
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...initialState, loading: true, error: null }
    case PRODUCT_LIST_SUCCESS:
      return {
        ...initialState,
        loading: false,
        products: action.payload,
        error: null,
      }
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
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...initialState,
        paymentMethod: action.payload,
      }
    case CART_EMPTY:
      return {
        ...initialState,
        cartItems: [],
      }
    case ORDER_CREATE_REQUEST:
      return {
        ...initialState,
        loading: true,
        error: null,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        order: action.payload,
        error: null,
      }
    case ORDER_CREATE_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {
        ...initialState,
        error: null,
        loading: false,
      }
    case ORDER_DETAILS_REQUEST:
      return {
        ...initialState,
        loading: true,
        error: null,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        order: action.payload,
        error: null,
      }
    case ORDER_DETAILS_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_REQUEST:
      return {
        ...initialState,
        loading: true,
        error: null,
      }
    case ORDER_PAY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        error: null,
      }
    case ORDER_PAY_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {
        ...initialState,
        loading: false,
        error: null,
        success: false,
      }

    default:
      return initialState
  }
}

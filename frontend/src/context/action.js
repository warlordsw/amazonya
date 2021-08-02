import Axios from 'axios'
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
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
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

export const listProducts = async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  })
  try {
    const { data } = await Axios.get('/api/products')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

export const detailsProduct = async (dispatch, productId) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
  try {
    const { data } = await Axios.get(`/api/products/${productId}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addToCart = async (dispatch, productId, qty) => {
  const { data } = await Axios.get(`/api/products/${productId}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  })
}

export const removeFromCart = async (dispatch, productId) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId })
}

export const saveShippingAddress = (dispatch, data) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (dispatch, data) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
}

export const signin = async (dispatch, email, password) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = async (dispatch, name, email, password) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    })
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createOrder = async (dispatch, order, token) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
  try {
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: CART_EMPTY })
    localStorage.removeItem('cartItems')
    localStorage.setItem('orderItems', JSON.stringify(data.order))
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsOrder = async (dispatch, orderId, token) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
  }
}

export const payOrder = async (dispatch, order, token) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: order })
  try {
    const { data } = await Axios.put(`/api/orders/${order._id}/pay`, order, {
      headers: { Authorization: `Bearer ${token}` },
    })
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    localStorage.setItem('orderItems', JSON.stringify(data.order))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_PAY_FAIL, payload: message })
  }
}

export const signout = (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  dispatch({ type: USER_SIGNOUT })
}

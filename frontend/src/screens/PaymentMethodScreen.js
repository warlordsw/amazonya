import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../context/action'
import { useDispatch, useProductState } from '../context/context'

const PaymentMethodScreen = (props) => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal')
  const { shippingAddress } = useProductState()
  if (!shippingAddress.address) {
    props.history.push('/shipping')
  }

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    savePaymentMethod(dispatch, paymentMethod)
    props.history.push('/placeorder')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='paypal'
              value='Paypal'
              name='paymentMethod'
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='paypal'>Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='stripe'
              value='Stripe'
              name='paymentMethod'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='stripe'>Stripe</label>
          </div>
        </div>
        <div>
          <button className='primary' type='submit'>
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaymentMethodScreen

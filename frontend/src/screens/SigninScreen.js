import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { signin } from '../context/action'
import { useDispatch, useProductState } from '../context/context'

const SigninScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'
  const dispatch = useDispatch()
  const { userInfo, loading, error } = useProductState()

  const submitHandler = (e) => {
    e.preventDefault()
    signin(dispatch, email, password)
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [userInfo, redirect, props.history])

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SigninScreen

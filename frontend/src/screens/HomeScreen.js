import React, { useEffect } from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useProductState } from '../context/context'
import { listProducts } from '../context/action'

function HomeScreen() {
  const dispatch = useDispatch()
  const { products, loading, error } = useProductState()

  useEffect(() => {
    const listProductsFunc = async () => {
      await listProducts(dispatch)
    }
    listProductsFunc()
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='row center'>
          {products.map((product) => {
            return <Product key={product._id} product={product} />
          })}
        </div>
      )}
    </div>
  )
}

export default HomeScreen

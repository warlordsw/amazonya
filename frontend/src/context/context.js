import { createContext, useContext, useReducer } from 'react'
import { productListReducer, initialState } from './reducer'

const ProductStateContext = createContext()
const DispatchContext = createContext()

export const useProductState = () => {
  const context = useContext(ProductStateContext)
  if (context === undefined) {
    throw new Error('useProductState must be used within a StoreProvider')
  }
  return context
}

export function useDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a StoreProvider')
  }

  return context
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productListReducer, initialState)
  return (
    <ProductStateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ProductStateContext.Provider>
  )
}

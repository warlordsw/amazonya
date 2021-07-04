import { createContext, useContext, useReducer } from 'react'
import { productListReducer, initialState } from './reducer'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export const useProductState = () => {
  const context = useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useProductState must be used within a AuthProvider')
  }
  return context
}

export function useDispatch() {
  const context = useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a AuthProvider')
  }

  return context
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productListReducer, initialState)
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

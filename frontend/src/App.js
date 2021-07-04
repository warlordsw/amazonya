import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { StoreProvider } from './context/context'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className='grid-container'>
          <header className='row'>
            <div>
              <a className='brand' href='/'>
                amazdokuz
              </a>
            </div>
            <div>
              <a href='/cart'>Cart</a>
              <a href='/signin'>Sign in</a>
            </div>
          </header>
          <main>
            <Route path='/product/:id' component={ProductScreen}></Route>
            <Route path='/' component={HomeScreen} exact></Route>
          </main>
          <footer className='row center'>All right reserved</footer>
        </div>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App

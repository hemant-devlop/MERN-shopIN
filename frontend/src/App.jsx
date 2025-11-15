import './App.css'
import Home from './components/Home'
import NavComponent from './components/NavComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './components/Products'
import Cart from './components/Cart'
import About from './components/About'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Login from './components/Login'
import ProtectedRoute from './router/protectedRoute'
import EditProfile from './components/EditProfile'
import CreateProduct from './components/CreateProduct'

const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/edit-profile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path='/create-products' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h4>Page Not Found</h4>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

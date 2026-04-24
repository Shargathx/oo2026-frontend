import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import EditProduct from './pages/admin/EditProduct'
import ManageCategories from './pages/admin/ManageCategories'
import ManageProducts from './pages/admin/ManageProducts'
import Cart from './pages/Cart'
import AddProduct from './pages/admin/AddProduct'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <Link to="/">
        <button>Avaleht</button>
      </Link>
      <Link to="/cart">
        <button>Ostukorv</button>
      </Link>
      <Link to="/add-product">
        <button>Lisa toode</button>
      </Link>
      <Link to="/manage-products">
        <button>Muuda tooteid</button>
      </Link>
      <Link to="/manage-categories">
        <button>Muuda kategooriaid</button>
      </Link>
      <Link to="/login">
        <button>Log In</button>
      </Link>

      <Link to="/signup">
        <button>Sign Up</button>
      </Link>

      <Link to="/profile">
        <button>Profile</button>
      </Link>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/edit-product' element={<EditProduct />} />
        <Route path='/manage-products' element={<ManageProducts />} />
        <Route path='/manage-categories' element={<ManageCategories />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product' element={<ProductDetails />} />
        <Route path='/*' element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App

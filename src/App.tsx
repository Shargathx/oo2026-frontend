import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import EditProduct from './pages/admin/EditProduct'
import ManageCategories from './pages/admin/ManageCategories'
import ManageProducts from './pages/admin/ManageProducts'
import Cart from './pages/Cart'
import AddProduct from './pages/admin/AddProduct'

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

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/edit-product' element={<EditProduct />} />
        <Route path='/manage-products' element={<ManageProducts />} />
        <Route path='/manage-categories' element={<ManageCategories />} />

      </Routes>
    </>
  )
}

export default App

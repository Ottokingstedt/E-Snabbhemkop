import './App.css';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from "./components/layout";
import Home from "./page/home";
import NotFound from './components/404';
import Cart from './components/Cart';
import Register from './components/auth/register';
import Login from './components/auth/login';
import CheckoutSuccess from './components/checkoutSuccess';
import CookiesBanner from './components/cookies';
import Dashboard from './components/admin/dashboard';
import Product from './components/admin/products';
import Summary from './components/admin/summary';
import CreateProduct from './components/admin/createProduct';
import ProductsList from './components/admin/list/ProductsList';
import Orders from './components/admin/orders';
import Users from './components/admin/users'
import UserProfile from './components/Details/UserProfile';
import ProductId from './components/Details/Product';
import Order from './components/Details/Order';
import Search from './components/Search';
import SearchResults from './components/Details/SearchDetail';


function App(){

  
  return (
<>
<BrowserRouter basename="/">
<ToastContainer/>
<CookiesBanner/>
<Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<Home />} />
    <Route path="/search" element={<Search />}/>
    <Route path="/searchdetails" element={<SearchResults />} />
    <Route path="/cart" element={<Cart/> } />
    <Route path="/checkout-success" element={<CheckoutSuccess/> } />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/product/:id" element={<ProductId />} />
    <Route path="/order/:id" element={<Order />} />
    <Route path="/user/:id" element={<UserProfile />} />
    <Route path="/admin" element={<Dashboard />}>
      <Route path="products" element={<Product />} >
          <Route index element={<ProductsList/>}/>
          <Route path='create-product' element={<CreateProduct/>}/>
      </Route>
      <Route path="summary" element={<Summary />} /> 
      <Route path="orders" element={<Orders />} />
      <Route path="users" element={<Users />} />
    </Route>
    <Route path="*" element={<NotFound />}/>
  </Route>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;

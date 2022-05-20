import './App.css';
import React from 'react'

import Login from './pages/Login';
import Main from './pages/Main';
import MyCart from './pages/MyCart';
import WishList from './pages/WishList';
import SearchPage from './pages/SearchPage';
import { Routes,Route } from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Account from './pages/Account';
import OrderHistory from './pages/OrderHistory';
import StoreLogin from './pages/StoreLogin';
import Checkout from './pages/Checkout';
import SingleProduct from './pages/SingleProduct';
import Invoice from './pages/Invoice';
import ProductManagement from './pages/ProductManagement';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/MyCart' element={<MyCart/>}/>
        <Route path='/Checkout' element={<Checkout/>}/>
        <Route path='/WishList' element={<WishList/>}/>
        <Route path='/Account' element={<Account/>}/>
        <Route path='/OrderHistory' element={<OrderHistory/>}/>
        <Route path='/StoreLogin' element={<StoreLogin/>}/>
        <Route path='/ProductManagement' element={<ProductManagement/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/SingleProduct=:pid' element={<SingleProduct/>}/>
        <Route path="/Search/category=:category" element={<SearchPage/>}/>
        <Route path="/Search/title=:title/&author=:author/&publisher=:publisher/&pr_lower=:pr_lower/&pr_upper=:pr_upper/&raiting=:raiting" element={<SearchPage/>}/>
        <Route path="/Search/description=:description/&author=:author/&publisher=:publisher/&pr_lower=:pr_lower/&pr_upper=:pr_upper/&raiting=:raiting" element={<SearchPage/>}/>
        <Route path="/Search/category=:category/&author=:author/&publisher=:publisher/&pr_lower=:pr_lower/&pr_upper=:pr_upper/&raiting=:raiting" element={<SearchPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

//singleton fetchproduct class???
//singleton fetchbasket class??

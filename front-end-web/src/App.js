import './App.css';
import React from 'react'

import Login from './pages/Login';
import Main from './pages/Main';
import MyCart from './pages/MyCart';
import WishList from './pages/WishList';
import SearchPage from './pages/SearchPage';
import { Routes,Route } from "react-router-dom";
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/MyCart' element={<MyCart/>}/>
        <Route path='/WishList' element={<WishList/>}/>
        <Route path="/Search/category=:category" element={<SearchPage/>}/>
        <Route path="/Search/category=:category/&author=:author/&publisher=:publisher/&language=:language/&pr_lower=:pr_lower/&pr_upper=:pr_upper/&raiting=:raiting" element={<SearchPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

//singleton fetchproduct class???
//singleton fetchbasket class??

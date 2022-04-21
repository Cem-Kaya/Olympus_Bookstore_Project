import './App.css';
import React from 'react'

import Login from './pages/Login';
import Main from './pages/Main';
import MyCart from './pages/MyCart';
import WishList from './pages/WishList';
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/MyCart' element={<MyCart/>}/>
        <Route path='/WishList' element={<WishList/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

//singleton fetchproduct class???
//singleton fetchbasket class??

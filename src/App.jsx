import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Liked from './pages/Liked';
import ProductDetail from './pages/Details';
import NotFound from './pages/NotFound';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MainLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/liked' element={<Liked />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage'
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('base-root') as HTMLElement
);
root.render(
//   <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </BrowserRouter>
//   </React.StrictMode>
);

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import OrderProcessingPage from './pages/OrderProcessingPage'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/order-processing" element={<OrderProcessingPage />} />
        </Routes>
      </Router>
    </CartProvider>
  </StrictMode>,
)

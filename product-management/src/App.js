import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProductTable from './pages/ProductTable';

function App() {
  const isAuthenticated = !!localStorage.getItem('username'); // Check if user is logged in

  return (
    <Router>
      <div className='mb-5'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={isAuthenticated ? <ProductTable /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

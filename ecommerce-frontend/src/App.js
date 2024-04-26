// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import CustomerDashboard from './components/customer/CustomerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import EditProduct from './components/admin/EditProduct';

import Register from './components/auth/Register';
import AddProduct from "./components/admin/AddProduct"; // Import the Register component

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* Add this line for registration route */}
                    <Route path="/customer" element={<CustomerDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/edit-product" element={<EditProduct />} />
                    <Route path="/admin/add-product" element={<AddProduct />}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;

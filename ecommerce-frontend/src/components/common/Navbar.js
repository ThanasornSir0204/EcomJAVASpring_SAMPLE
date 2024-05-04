// components/common/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Mock authentication state (replace with your actual authentication logic)
    const isAuthenticated = true;

    const handleLogout = () => {
        // Perform actual logout logic here (e.g., clear authentication state, redirect, etc.)
        // For example, you may want to clear a user token from local storage
        localStorage.removeItem('userToken'); // Replace with your actual storage key
        alert('Logout SUCCESSFUL');

        // Redirect to the login page after logout
        navigate('/'); // Navigate to the login page
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1>
                    SpaceShop
                </h1>
                {isAuthenticated && (location.pathname === '/customer' || location.pathname === '/admin' || location.pathname.startsWith('/admin/edit-product') || location.pathname.startsWith('/admin/add-product')) && (
                    <div className="navbar-links">
                        {location.pathname === '/admin' && (
                            <>
                                <Link to="/admin/add-product" className="navbar-link">
                                    Add Product
                                </Link>
                            </>
                        )}
                        {(location.pathname.startsWith('/admin/edit-product') || location.pathname.startsWith('/admin/add-product')) && (
                            <Link to="/admin" className="navbar-link">
                                All Products
                            </Link>
                        )}
                        <button onClick={handleLogout} className="navbar-button">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

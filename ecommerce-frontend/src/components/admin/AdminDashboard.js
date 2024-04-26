// components/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from your MongoDB database
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;

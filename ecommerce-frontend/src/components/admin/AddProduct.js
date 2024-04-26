// components/admin/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/api/products', productData); // Replace with your actual API endpoint
            console.log(response.data); // Log the response (you can handle it as needed)

            // Clear the form after successful submission
            setProductData({
                name: '',
                price: '',
                imageUrl: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Product Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="imageUrl">Product Image URL:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={productData.imageUrl}
                    onChange={handleChange}
                />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;

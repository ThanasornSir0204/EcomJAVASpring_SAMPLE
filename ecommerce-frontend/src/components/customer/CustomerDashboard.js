// components/customer/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterDirection, setFilterDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        // Fetch products from your MongoDB database
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products'); // Replace with your actual API endpoint
                setProducts(response.data);
                setFilteredProducts(response.data);
                return response; // Return the response to handle the Promise correctly
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search term
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort by price based on filter direction
        const sortedProducts = filtered.sort((a, b) => {
            if (filterDirection === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        setFilteredProducts(sortedProducts);
    }, [searchTerm, filterDirection, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterDirectionChange = () => {
        setFilterDirection((prevDirection) =>
            prevDirection === 'asc' ? 'desc' : 'asc'
        );
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (productId) => {
        // Add your logic for adding the product to the cart
        console.log(`Product with ID ${productId} added to cart`);
    };

    return (
        <div className="dashboard-container">
            <h2>Product List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={handleFilterDirectionChange}>
                    {filterDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                </button>
            </div>
            <div className="product-list">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
                        )}
                        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                        {/* Add more product details as needed */}
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomerDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Import CSS file for custom styling

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [editedProduct, setEditedProduct] = useState({ name: '', price: '', imageUrl: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8081/api/products/${productId}`)
                .then(() => {
                    // Filter out the deleted product from state
                    setProducts(products.filter(product => product.id !== productId));
                    alert('Product deleted successfully.');
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                    alert('Failed to delete product. Please try again.');
                });
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditedProduct({ ...product });
        setShowEditModal(true);
    };

    const handleEditClose = () => {
        setShowEditModal(false);
    };

    const handleSaveChanges = async () => {
        const confirmUpdate = window.confirm('Are you sure you want to update this product?');
        if (confirmUpdate) {
            try {
                const response = await axios.put(`http://localhost:8081/api/products/${selectedProduct.id}`, editedProduct);
                console.log('Product updated:', response.data);
                fetchProducts(); // Reload products after update
                setShowEditModal(false); // Close modal
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

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
                        <div className="button-container">
                            <button onClick={() => handleEditClick(product)} className="edit-button">Edit</button>
                            <button onClick={() => handleDelete(product.id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Product Modal */}
            <Modal show={showEditModal} onHide={handleEditClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="productImageUrl">
                            <Form.Label>Product Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={editedProduct.imageUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminDashboard;

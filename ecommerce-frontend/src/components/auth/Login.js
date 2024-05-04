// components/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Import CSS for authentication forms

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.status === 'success') {
                alert(result.message);
                navigate(result.userType === 'admin' ? '/admin' : '/customer');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p className="auth-form-link">
                New user? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

export default Login;

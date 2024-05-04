// components/auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Import CSS for authentication forms

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful!');
                navigate('/');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
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

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>

            <p className="auth-form-link">
                Already have an account? <Link to="/">Login here</Link>.
            </p>
        </div>
    );
};

export default Register;

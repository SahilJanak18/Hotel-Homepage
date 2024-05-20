import React, { useState } from 'react';
import './newForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/postusers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            alert("Registered Successfully");
            window.location.href="./form/NEWFORM/webpage.html";
        } catch (error) {
            console.error('Error sending data to server:', error);
            alert('There was an error with your registration');
        }
    };

    return (
        <div className="container">
            <form id="form" onSubmit={handleSubmit}>
                <h1>Registration</h1>
                <div className="input-control">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <div className="error"></div>
                </div>
                <div className="input-control">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="error"></div>
                </div>
                <div className="input-control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="error"></div>
                </div>
                <div className="input-control">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        id="password2"
                        name="password2"
                        type="password"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                    />
                    <div className="error"></div>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default RegistrationForm;

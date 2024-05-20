import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newForm.css';
import axios from 'axios';
const RegistrationForm = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:8000/postusers',{username,email,password,password2})
            .then(res=>{
                console.log(res);
                console.log("posted to backend succesfully");
            }).catch(err=>console.log(err));
            alert("Registered Successfully");
            navigate('/home');
        } catch (error) {
            console.error('Error sending data to server:', error);
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
                        onChange={e=>setUsername(e.target.value)}
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
                        onChange={e=>setEmail(e.target.value)}
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
                        onChange={e=>setPassword(e.target.value)}
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
                        onChange={e=>setPassword2(e.target.value)}
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting login form...', { email, password });

        try {
            const res = await axios.post(
                'http://localhost:8080/api/auth/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // optional if not using cookies
                }
            );

            console.log('Login successful, token:', res.data.token);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error details:', {
                message: err.message,
                response: err.response,
                data: err.response?.data,
                status: err.response?.status,
            });
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <div className="register-link">
                    <span>Don't have an account?</span>
                    <button type="button" onClick={() => navigate('/register')}>
                        Register Now!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;

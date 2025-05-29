import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', { email, password });
            alert('Registration successful');
            navigate('/login');
        } catch {
            alert('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                <button type="submit">Register</button>
                <div className="login-link">
                    <span>Already have an account?</span>
                    <button type="button" onClick={() => navigate('/login')}>
                        Login Now!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
